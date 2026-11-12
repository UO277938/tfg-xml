import { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { etiquetasXML, elementosRaiz } from "../especificacion/etiquetasXML";
import "./XmlEditor.css";

// bbtiene los elementos que siguen abiertos antes
function obtenerPila(texto) {
  const limpio = texto
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, "");

  const pila = [];
  const regex = /<\/?([a-zA-Z_][\w:.-]*)\b[^>]*>/g;

  let coincidencia;

  while ((coincidencia = regex.exec(limpio)) !== null) {
    const etiquetaCompleta = coincidencia[0];
    const nombre = coincidencia[1];

    if (etiquetaCompleta.startsWith("</")) {
      const indice = pila.lastIndexOf(nombre);
      if (indice !== -1) pila.splice(indice);
    } else if (!etiquetaCompleta.endsWith("/>")) {
      pila.push(nombre);
    }
  }

  return pila;
}

function registrarAutocompletado(monaco) {
  return monaco.languages.registerCompletionItemProvider("xml", {
    triggerCharacters: ["<", " ", "=", '"'],

    provideCompletionItems(model, position) {
      const texto = model.getValueInRange({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column
      });

      const linea = model.getLineContent(position.lineNumber);
      const antesCursor = linea.substring(0, position.column - 1);

      const rangoPalabra = model.getWordUntilPosition(position);
      const rango = new monaco.Range(
        position.lineNumber,
        rangoPalabra.startColumn,
        position.lineNumber,
        rangoPalabra.endColumn
      );

      const pila = obtenerPila(texto);
      const padre = pila[pila.length - 1];
      const sugerencias = [];

      const crearSugerencia = (
        nombre,
        descripcion,
        insertText,
        tipo = monaco.languages.CompletionItemKind.Property
      ) => ({
        label: nombre,
        kind: tipo,
        detail: descripcion,
        insertText,
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: rango
      });

      // sugerencias de etiquetas
      if (/<\/[\w.-]*$/.test(antesCursor)) {
        const abiertas = [...pila].reverse();

        return {
          suggestions: abiertas.map(nombre =>
            crearSugerencia(
              nombre,
              "Cerrar etiqueta XML",
              nombre,
              monaco.languages.CompletionItemKind.Reference
            )
          )
        };
      }

      // sugerencias de atributos
      const inicioEtiqueta = antesCursor.match(/<([\w.-]+)\s+([^<>]*)$/);

      if (inicioEtiqueta) {
        const nombreEtiqueta = inicioEtiqueta[1];
        const atributosTexto = inicioEtiqueta[2];
        const definicion = etiquetasXML[nombreEtiqueta];

        if (!definicion?.atributos) return { suggestions: [] };

        const valorActual = atributosTexto.match(
          /([\w:-]+)\s*=\s*["']([^"']*)$/
        );

        if (valorActual) {
          const nombreAtributo = valorActual[1];
          const atributo = definicion.atributos[nombreAtributo];

          if (atributo?.valores) {
            const valor = valorActual[2];
            const columnaInicio =
              position.column - valor.length;

            const rangoValor = new monaco.Range(
              position.lineNumber,
              columnaInicio,
              position.lineNumber,
              position.column
            );

            return {
              suggestions: atributo.valores
                .filter(opcion => opcion.startsWith(valor))
                .map(opcion => ({
                  label: opcion,
                  kind: monaco.languages.CompletionItemKind.EnumMember,
                  detail: `Valor permitido para ${nombreAtributo}`,
                  insertText: opcion,
                  range: rangoValor
                }))
            };
          }

          return { suggestions: [] };
        }

        // atributos sugeridos
        const atributosExistentes = [
          ...atributosTexto.matchAll(/([\w:-]+)\s*=/g)
        ].map(match => match[1]);

        return {
          suggestions: Object.entries(definicion.atributos)
            .filter(([nombre]) => !atributosExistentes.includes(nombre))
            .map(([nombre, atributo]) =>
              crearSugerencia(
                nombre,
                `${atributo.descripcion}${atributo.requerido ? " (obligatorio)" : ""}`,
                atributo.valores
                  ? `${nombre}="\${1|${atributo.valores.join(",")}|}"`
                  : `${nombre}="$1"`,
                monaco.languages.CompletionItemKind.Field
              )
            )
        };
      }

      // sugerencias de etiquetas hijo
      if (/<[\w.-]*$/.test(antesCursor)) {
        const permitidas = padre
          ? etiquetasXML[padre]?.hijos || []
          : elementosRaiz;

        return {
          suggestions: permitidas.map(nombre => {
            const definicion = etiquetasXML[nombre];
            const esVacia = definicion?.vacio;

            let insertText = esVacia
              ? `${nombre} />`
              : `${nombre}>$0</${nombre}`;

            // Plantilla para el atributo obligatorio de titulo.
            if (nombre === "titulo") {
              insertText = `titulo nivel="1">$0</titulo`;
            }

            // Plantilla para multimedia.
            if (nombre === "multimedia") {
              insertText =
                'multimedia tipo="imagen" src="$1" alt="$2" />';
            }

            // Plantilla para enlace.
            if (nombre === "enlace") {
              insertText = 'enlace href="$1">$0</enlace';
            }

            return crearSugerencia(
              nombre,
              definicion?.descripcion || "Elemento XML",
              insertText,
              monaco.languages.CompletionItemKind.Property
            );
          })
        };
      }

      return { suggestions: sugerencias };
    }
  });
}

export default function XmlEditor({ value, onChange }) {
  const providerRef = useRef(null);

  useEffect(() => {
    return () => {
      providerRef.current?.dispose();
    };
  }, []);

  const handleEditorMount = (editor, monaco) => {
    providerRef.current?.dispose();
    providerRef.current = registrarAutocompletado(monaco);
  };

  return (
    <div className="xml-editor-wrapper">
      <Editor
        height="100%"
        width="100%"
        language="xml"
        value={value}
        onChange={(value) => onChange(value || "")}
        onMount={handleEditorMount}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          scrollBeyondLastLine: false,
          quickSuggestions: true,
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: "on",
          scrollbar: {
            vertical: "auto",
            horizontal: "auto"
          }
        }}
      />
    </div>
  );
}