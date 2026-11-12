import { useEffect, useMemo, useState } from "react";
import "./HelpPanel.css";

import { useTranslation } from "react-i18next";
import { baseDtd, baseXsd } from "../especificacion/especificacion";
import { etiquetasXML } from "../especificacion/etiquetasXML";

function HelpSection({ title, text, code }) {
  return (
    <section className="help-section">
      <h4>{title}</h4>

      {text && <p>{text}</p>}

      {code && (
        <pre>
          <code>{code}</code>
        </pre>
      )}
    </section>
  );
}

// Clasificación de las etiquetas según su función.
const categoriasEtiquetas = {
  documento: "Estructura",
  cuerpo: "Estructura",

  metadatos: "Metadatos",
  tituloHTML: "Metadatos",
  autor: "Metadatos",
  fecha: "Metadatos",
  resumen: "Metadatos",

  articulo: "Secciones",
  seccion: "Secciones",
  navegacion: "Secciones",
  aparte: "Secciones",
  encabezado: "Secciones",
  pie: "Secciones",
  principal: "Secciones",
  contenedor: "Secciones",

  titulo: "Texto",
  parrafo: "Texto",
  codigo: "Texto",
  preformateado: "Texto",
  cita: "Texto",
  saltoLinea: "Texto",
  enlace: "Texto",

  lista: "Listas",
  elementoLista: "Listas",
  listaDefiniciones: "Listas",
  termino: "Listas",
  definicion: "Listas",

  tabla: "Tablas",
  leyenda: "Tablas",
  cabecera: "Tablas",
  cuerpoTabla: "Tablas",
  pieTabla: "Tablas",
  fila: "Tablas",
  celda: "Tablas",
  celdaCabecera: "Tablas",

  formulario: "Formularios",
  grupoFormulario: "Formularios",
  etiqueta: "Formularios",
  entrada: "Formularios",
  boton: "Formularios",
  areaTexto: "Formularios",
  seleccion: "Formularios",
  opcion: "Formularios",
  salida: "Formularios",

  multimedia: "Multimedia",
  figura: "Multimedia",

  detalles: "Interactivos",
  resumenDetalles: "Interactivos",
  dialogo: "Interactivos"
};

const ejemplosEtiquetas = {
  documento: `<documento>
  <metadatos>
    <tituloHTML>Mi documento</tituloHTML>
    <autor>Autor</autor>
    <fecha>2026-11-12</fecha>
  </metadatos>
  <cuerpo>
    <parrafo>Contenido del documento.</parrafo>
  </cuerpo>
</documento>`,

  titulo: `<titulo nivel="1">Título principal</titulo>`,
  parrafo: `<parrafo>Este es un párrafo de ejemplo.</parrafo>`,
  lista: `<lista tipo="ordenada">
  <elementoLista>Primer elemento</elementoLista>
  <elementoLista>Segundo elemento</elementoLista>
</lista>`,
  listaDefiniciones: `<listaDefiniciones>
  <termino>XML</termino>
  <definicion>Lenguaje de marcado extensible.</definicion>
</listaDefiniciones>`,
  tabla: `<tabla>
  <leyenda>Ejemplo de tabla</leyenda>
  <cuerpoTabla>
    <fila>
      <celdaCabecera>Nombre</celdaCabecera>
      <celdaCabecera>Edad</celdaCabecera>
    </fila>
    <fila>
      <celda>Ana</celda>
      <celda>25</celda>
    </fila>
  </cuerpoTabla>
</tabla>`,
  multimedia: `<multimedia tipo="imagen" src="imagen.jpg" alt="Descripción" />`,
  enlace: `<enlace href="https://ejemplo.com">Visitar página</enlace>`,
  entrada: `<entrada tipo="text" nombre="usuario" requerido="true" />`,
  formulario: `<formulario action="/enviar" method="post">
  <etiqueta para="usuario">Nombre:</etiqueta>
  <entrada tipo="text" nombre="usuario" />
  <boton tipo="submit">Enviar</boton>
</formulario>`,
  figura: `<figura>
  <multimedia tipo="imagen" src="imagen.jpg" alt="Paisaje" />
  <leyenda>Un paisaje</leyenda>
</figura>`,
  detalles: `<detalles>
  <resumenDetalles>Más información</resumenDetalles>
  <parrafo>Contenido adicional.</parrafo>
</detalles>`,
  dialogo: `<dialogo>
  <parrafo>Este es un cuadro de diálogo.</parrafo>
</dialogo>`,
  saltoLinea: `<parrafo>Primera línea<saltoLinea />Segunda línea</parrafo>`
};

function EtiquetasHelp() {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [etiquetaActiva, setEtiquetaActiva] = useState("documento");

  const categorias = [
    "Todas",
    "Estructura",
    "Metadatos",
    "Secciones",
    "Texto",
    "Listas",
    "Tablas",
    "Formularios",
    "Multimedia",
    "Interactivos"
  ];

  const etiquetasFiltradas = useMemo(() => {
    return Object.entries(etiquetasXML)
      .filter(([nombre, definicion]) => {
        const coincideBusqueda =
          nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          definicion.descripcion?.toLowerCase().includes(busqueda.toLowerCase());

        const coincideCategoria =
          categoriaActiva === "Todas" ||
          categoriasEtiquetas[nombre] === categoriaActiva;

        return coincideBusqueda && coincideCategoria;
      })
      .sort(([a], [b]) => a.localeCompare(b, "es"));
  }, [busqueda, categoriaActiva]);

  const etiquetaSeleccionada = etiquetasFiltradas.find(
    ([nombre]) => nombre === etiquetaActiva
  ) || etiquetasFiltradas[0];

  const [nombre, definicion] = etiquetaSeleccionada || [null, null];

  return (
    <div className="xml-tags-help">
      <div className="tags-intro">
        <p>
          Consulta las etiquetas disponibles en el lenguaje XML de este
          proyecto, sus atributos, los elementos que pueden contener y
          ejemplos de uso.
        </p>
      </div>

      <div className="tags-search">
        <input
          type="search"
          value={busqueda}
          onChange={(event) => setBusqueda(event.target.value)}
          placeholder="Buscar una etiqueta..."
          aria-label="Buscar etiqueta XML"
        />
      </div>

      <div className="tags-categories">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            type="button"
            className={
              categoriaActiva === categoria
                ? "tags-category active"
                : "tags-category"
            }
            onClick={() => setCategoriaActiva(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>

      <div className="tags-layout">
        <div className="tags-list">
          <span className="tags-list-title">
            Etiquetas ({etiquetasFiltradas.length})
          </span>

          {etiquetasFiltradas.length === 0 ? (
            <p className="tags-empty">No se encontraron etiquetas.</p>
          ) : (
            etiquetasFiltradas.map(([tag]) => (
              <button
                key={tag}
                type="button"
                className={
                  nombre === tag
                    ? "tags-list-item active"
                    : "tags-list-item"
                }
                onClick={() => setEtiquetaActiva(tag)}
              >
                <span>{tag}</span>
                <small>{categoriasEtiquetas[tag]}</small>
              </button>
            ))
          )}
        </div>

        {definicion && (
          <div className="tag-detail">
            <div className="tag-detail-header">
              <span className="tag-category-label">
                {categoriasEtiquetas[nombre]}
              </span>
              <h3>{`<${nombre}>`}</h3>
              <p>{definicion.descripcion}</p>
            </div>

            <section className="tag-detail-section">
              <h4>Uso de la etiqueta</h4>

              <p>
                {definicion.vacio
                  ? "Es un elemento vacío: no puede contener texto ni otras etiquetas."
                  : definicion.texto && definicion.hijos
                    ? "Puede contener texto y los elementos hijos indicados a continuación."
                    : definicion.texto
                      ? "Puede contener texto."
                      : "Se utiliza para agrupar o estructurar otros elementos."}
              </p>
            </section>

            {definicion.hijos && (
              <section className="tag-detail-section">
                <h4>Elementos hijos permitidos</h4>

                <div className="tag-chips">
                  {definicion.hijos.map((hijo) => (
                    <button
                      key={hijo}
                      type="button"
                      onClick={() => {
                        setBusqueda("");
                        setCategoriaActiva("Todas");
                        setEtiquetaActiva(hijo);
                      }}
                    >
                      {`<${hijo}>`}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {definicion.atributos && (
              <section className="tag-detail-section">
                <h4>Atributos</h4>

                <div className="tag-attributes">
                  {Object.entries(definicion.atributos).map(
                    ([atributo, datos]) => (
                      <article className="tag-attribute" key={atributo}>
                        <div className="tag-attribute-heading">
                          <code>{atributo}</code>

                          <span
                            className={
                              datos.requerido
                                ? "attribute-status required"
                                : "attribute-status optional"
                            }
                          >
                            {datos.requerido ? "Obligatorio" : "Opcional"}
                          </span>
                        </div>

                        <p>{datos.descripcion}</p>

                        {datos.valores && (
                          <div className="attribute-values">
                            <span>Valores permitidos:</span>
                            {datos.valores.map((valor) => (
                              <code key={valor}>{valor}</code>
                            ))}
                          </div>
                        )}

                        {datos.tipo && (
                          <p className="attribute-type">
                            Tipo: {datos.tipo}
                          </p>
                        )}

                        {datos.defecto && (
                          <p className="attribute-default">
                            Valor por defecto: <code>{datos.defecto}</code>
                          </p>
                        )}
                      </article>
                    )
                  )}
                </div>
              </section>
            )}

            {ejemplosEtiquetas[nombre] && (
              <section className="tag-detail-section">
                <h4>Ejemplo XML</h4>

                <pre className="tag-example">
                  <code>{ejemplosEtiquetas[nombre]}</code>
                </pre>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function HelpPanel({ onClose }) {
  const { t } = useTranslation();

  const [activeSection, setActiveSection] = useState("etiquetas");
  const [helpWidth, setHelpWidth] = useState(500);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (event) => {
      const newWidth = window.innerWidth - event.clientX;

      setHelpWidth(
        Math.min(
          Math.max(newWidth, 320),
          window.innerWidth * 0.7
        )
      );
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const secciones = [
    { id: "etiquetas", label: "Etiquetas XML" },
    { id: "xml", label: t("help.navigation.xml") },
    { id: "dtd", label: t("help.navigation.dtd") },
    { id: "xsd", label: t("help.navigation.xsd") },
    { id: "validacion", label: t("help.navigation.validation") },
    { id: "html", label: t("help.navigation.html") },
    { id: "proceso", label: t("help.navigation.process") }
  ];

  const tituloSeccion =
    activeSection === "validacion"
      ? t("help.navigation.validation")
      : activeSection === "proceso"
        ? t("help.navigation.process")
        : activeSection === "etiquetas"
          ? "Etiquetas XML"
          : t(`help.navigation.${activeSection}`);

  return (
    <aside
      className="help-panel"
      aria-label="Panel de ayuda"
      style={{ width: `${helpWidth}px` }}
    >
      <div
        className="help-resizer"
        onMouseDown={() => setIsResizing(true)}
        aria-hidden="true"
      />

      <header className="help-header">
        <div>
          <span className="help-label">{t("help.label")}</span>
          <h3>{t("help.title")}</h3>
        </div>

        <button
          type="button"
          className="help-close"
          onClick={onClose}
          aria-label={t("help.close")}
        >
          ×
        </button>
      </header>

      <div className="help-body">
        <nav className="help-navigation">
          {secciones.map((seccion) => (
            <button
              key={seccion.id}
              type="button"
              className={
                activeSection === seccion.id
                  ? "help-nav-item active"
                  : "help-nav-item"
              }
              onClick={() => setActiveSection(seccion.id)}
            >
              {seccion.label}
            </button>
          ))}
        </nav>

        <div className="help-content">
          <h2>{tituloSeccion}</h2>

          {activeSection === "xml" && (
            <>
              <HelpSection
                title={t("help.xml.what.title")}
                text={t("help.xml.what.text")}
              />

              <HelpSection
                title={t("help.xml.structure.title")}
                text={t("help.xml.structure.text")}
              />

              <HelpSection
                title={t("help.xml.example.title")}
                code={ejemplosEtiquetas.documento}
              />
            </>
          )}

          {activeSection === "etiquetas" && <EtiquetasHelp />}

          {activeSection === "dtd" && (
            <>
              <HelpSection
                title={t("help.dtd.what.title")}
                text={t("help.dtd.what.text")}
              />

              <HelpSection
                title={t("help.dtd.purpose.title")}
                text={t("help.dtd.purpose.text")}
              />

              <HelpSection
                title={t("help.dtd.specification.title")}
                text={t("help.dtd.specification.text")}
                code={baseDtd}
              />
            </>
          )}

          {activeSection === "xsd" && (
            <>
              <HelpSection
                title={t("help.xsd.what.title")}
                text={t("help.xsd.what.text")}
              />

              <HelpSection
                title={t("help.xsd.purpose.title")}
                text={t("help.xsd.purpose.text")}
              />

              <HelpSection
                title={t("help.xsd.specification.title")}
                text={t("help.xsd.specification.text")}
                code={baseXsd}
              />
            </>
          )}

          {activeSection === "validacion" && (
            <>
              <HelpSection
                title={t("help.validationHelp.dtd.title")}
                text={t("help.validationHelp.dtd.text")}
              />

              <HelpSection
                title={t("help.validationHelp.xsd.title")}
                text={t("help.validationHelp.xsd.text")}
              />

              <HelpSection
                title={t("help.validationHelp.errors.title")}
                text={t("help.validationHelp.errors.text")}
              />
            </>
          )}

          {activeSection === "html" && (
            <>
              <HelpSection
                title={t("help.htmlHelp.generate.title")}
                text={t("help.htmlHelp.generate.text")}
              />

              <HelpSection
                title={t("help.htmlHelp.w3c.title")}
                text={t("help.htmlHelp.w3c.text")}
              />

              <HelpSection
                title={t("help.htmlHelp.format.title")}
                text={t("help.htmlHelp.format.text")}
              />
            </>
          )}

          {activeSection === "proceso" && (
            <>
              <HelpSection
                title={t("help.process.what.title")}
                text={t("help.process.what.text")}
              />

              <HelpSection title="1. XML" text={t("help.process.xml")} />
              <HelpSection title="2. DTD" text={t("help.process.dtd")} />
              <HelpSection title="3. XSD" text={t("help.process.xsd")} />
              <HelpSection title="4. HTML" text={t("help.process.html")} />
              <HelpSection title="5. W3C" text={t("help.process.w3c")} />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}