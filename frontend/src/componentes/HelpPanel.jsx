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

// Identificadores internos de categorías.
// No dependen del idioma seleccionado.
const categoriasEtiquetas = {
  documento: "structure",
  cuerpo: "structure",

  metadatos: "metadata",
  tituloHTML: "metadata",
  autor: "metadata",
  fecha: "metadata",
  resumen: "metadata",

  articulo: "sections",
  seccion: "sections",
  navegacion: "sections",
  aparte: "sections",
  encabezado: "sections",
  pie: "sections",
  principal: "sections",
  contenedor: "sections",

  titulo: "text",
  parrafo: "text",
  codigo: "text",
  preformateado: "text",
  cita: "text",
  saltoLinea: "text",
  enlace: "text",

  lista: "lists",
  elementoLista: "lists",
  listaDefiniciones: "lists",
  termino: "lists",
  definicion: "lists",

  tabla: "tables",
  leyenda: "tables",
  cabecera: "tables",
  cuerpoTabla: "tables",
  pieTabla: "tables",
  fila: "tables",
  celda: "tables",
  celdaCabecera: "tables",

  formulario: "forms",
  grupoFormulario: "forms",
  etiqueta: "forms",
  entrada: "forms",
  boton: "forms",
  areaTexto: "forms",
  seleccion: "forms",
  opcion: "forms",
  salida: "forms",

  multimedia: "multimedia",
  figura: "multimedia",

  detalles: "interactive",
  resumenDetalles: "interactive",
  dialogo: "interactive"
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
  const { t, i18n } = useTranslation();

  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("all");
  const [etiquetaActiva, setEtiquetaActiva] = useState("documento");

  const categorias = [
    { id: "all", label: t("help.tags.all") },
    { id: "structure", label: t("help.tags.categories.structure") },
    { id: "metadata", label: t("help.tags.categories.metadata") },
    { id: "sections", label: t("help.tags.categories.sections") },
    { id: "text", label: t("help.tags.categories.text") },
    { id: "lists", label: t("help.tags.categories.lists") },
    { id: "tables", label: t("help.tags.categories.tables") },
    { id: "forms", label: t("help.tags.categories.forms") },
    { id: "multimedia", label: t("help.tags.categories.multimedia") },
    { id: "interactive", label: t("help.tags.categories.interactive") }
  ];

  const etiquetasFiltradas = useMemo(() => {
    return Object.entries(etiquetasXML)
      .filter(([nombre, definicion]) => {
        const descripcion = t(
          `help.tags.elements.${nombre}.description`,
          { defaultValue: definicion.descripcion }
        );

        const coincideBusqueda =
          nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          descripcion.toLowerCase().includes(busqueda.toLowerCase());

        const coincideCategoria =
          categoriaActiva === "all" ||
          categoriasEtiquetas[nombre] === categoriaActiva;

        return coincideBusqueda && coincideCategoria;
      })
      .sort(([a], [b]) => a.localeCompare(b, i18n.language));
  }, [busqueda, categoriaActiva, t, i18n.language]);

  const etiquetaSeleccionada = etiquetasFiltradas.find(
    ([nombre]) => nombre === etiquetaActiva
  ) || etiquetasFiltradas[0];

  const [nombre, definicion] = etiquetaSeleccionada || [null, null];

  const descripcionEtiqueta = nombre
    ? t(`help.tags.elements.${nombre}.description`, {
        defaultValue: definicion.descripcion
      })
    : "";

  const usoEtiqueta = definicion
    ? definicion.vacio
      ? "empty"
      : definicion.texto && definicion.hijos
        ? "textAndChildren"
        : definicion.texto
          ? "text"
          : "children"
    : null;

  return (
    <div className="xml-tags-help">

      <div className="tags-intro">
        <p>{t("help.tags.description")}</p>
      </div>

      <div className="tags-search">
        <input
          type="search"
          value={busqueda}
          onChange={(event) => setBusqueda(event.target.value)}
          placeholder={t("help.tags.searchPlaceholder")}
          aria-label={t("help.tags.searchPlaceholder")}
        />
      </div>

      <div className="tags-categories">
        {categorias.map((categoria) => (
          <button
            key={categoria.id}
            type="button"
            className={
              categoriaActiva === categoria.id
                ? "tags-category active"
                : "tags-category"
            }
            onClick={() => setCategoriaActiva(categoria.id)}
          >
            {categoria.label}
          </button>
        ))}
      </div>

      <div className="tags-layout">

        <div className="tags-list">

          <span className="tags-list-title">
            {t("help.tags.count")} ({etiquetasFiltradas.length})
          </span>

          {etiquetasFiltradas.length === 0 ? (
            <p className="tags-empty">
              {t("help.tags.empty")}
            </p>
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

                <small>
                  {t(
                    `help.tags.categories.${categoriasEtiquetas[tag]}`
                  )}
                </small>
              </button>
            ))
          )}

        </div>

        {definicion && (
          <div className="tag-detail">

            <div className="tag-detail-header">

              <span className="tag-category-label">
                {t(
                  `help.tags.categories.${categoriasEtiquetas[nombre]}`
                )}
              </span>

              {/* El nombre XML nunca se traduce */}
              <h3>{`<${nombre}>`}</h3>

              <p>{descripcionEtiqueta}</p>

            </div>

            <section className="tag-detail-section">

              <h4>{t("help.tags.usage")}</h4>

              <p>
                {t(`help.tags.usageTypes.${usoEtiqueta}`)}
              </p>

            </section>

            {definicion.hijos && (
              <section className="tag-detail-section">

                <h4>{t("help.tags.allowedChildren")}</h4>

                <div className="tag-chips">

                  {definicion.hijos.map((hijo) => (
                    <button
                      key={hijo}
                      type="button"
                      onClick={() => {
                        setBusqueda("");
                        setCategoriaActiva("all");
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

                <h4>{t("help.tags.attributes")}</h4>

                <div className="tag-attributes">

                  {Object.entries(definicion.atributos).map(
                    ([atributo, datos]) => {

                      const descripcionAtributo = t(
                        `help.tags.elements.${nombre}.attributes.${atributo}.description`,
                        { defaultValue: datos.descripcion }
                      );

                      return (
                        <article
                          className="tag-attribute"
                          key={atributo}
                        >

                          <div className="tag-attribute-heading">

                            <code>{atributo}</code>

                            <span
                              className={
                                datos.requerido
                                  ? "attribute-status required"
                                  : "attribute-status optional"
                              }
                            >
                              {datos.requerido
                                ? t("help.tags.required")
                                : t("help.tags.optional")}
                            </span>

                          </div>

                          <p>{descripcionAtributo}</p>

                          {datos.valores && (
                            <div className="attribute-values">

                              <span>
                                {t("help.tags.allowedValues")}:
                              </span>

                              {datos.valores.map((valor) => (
                                <code key={valor}>{valor}</code>
                              ))}

                            </div>
                          )}

                          {datos.tipo && (
                            <p className="attribute-type">
                              {t("help.tags.type")}: {datos.tipo}
                            </p>
                          )}

                          {datos.defecto && (
                            <p className="attribute-default">
                              {t("help.tags.defaultValue")}:{" "}
                              <code>{datos.defecto}</code>
                            </p>
                          )}

                        </article>
                      );
                    }
                  )}

                </div>

              </section>
            )}

            {ejemplosEtiquetas[nombre] && (
              <section className="tag-detail-section">

                <h4>{t("help.tags.example")}</h4>

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
    { id: "etiquetas", label: t("help.navigation.etiquetas") },
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
          ? t("help.navigation.etiquetas")
          : t(`help.navigation.${activeSection}`);

  return (
    <aside
      className="help-panel"
      aria-label={t("help.title")}
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

              <HelpSection
                title={`1. ${t("help.navigation.xml")}`}
                text={t("help.process.xml")}
              />

              <HelpSection
                title={`2. ${t("help.navigation.dtd")}`}
                text={t("help.process.dtd")}
              />

              <HelpSection
                title={`3. ${t("help.navigation.xsd")}`}
                text={t("help.process.xsd")}
              />

              <HelpSection
                title={`4. ${t("help.navigation.html")}`}
                text={t("help.process.html")}
              />

              <HelpSection
                title="5. W3C"
                text={t("help.process.w3c")}
              />
            </>
          )}

        </div>
      </div>
    </aside>
  );
}