import { useEffect, useState } from "react";
import "./HelpPanel.css";

import { useTranslation } from "react-i18next";

import { baseDtd, baseXsd } from "../especificacion/especificacion";


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

export default function HelpPanel({ onClose }) {

  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState("xml");
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
  <button
    type="button"
    className={activeSection === "xml" ? "help-nav-item active" : "help-nav-item"}
    onClick={() => setActiveSection("xml")}
  >
    {t("help.navigation.xml")}
  </button>

  <button
    type="button"
    className={activeSection === "dtd" ? "help-nav-item active" : "help-nav-item"}
    onClick={() => setActiveSection("dtd")}
  >
    {t("help.navigation.dtd")}
  </button>

  <button
    type="button"
    className={activeSection === "xsd" ? "help-nav-item active" : "help-nav-item"}
    onClick={() => setActiveSection("xsd")}
  >
    {t("help.navigation.xsd")}
  </button>

  <button
    type="button"
    className={activeSection === "validacion" ? "help-nav-item active" : "help-nav-item"}
    onClick={() => setActiveSection("validacion")}
  >
    {t("help.navigation.validation")}
  </button>

  <button
    type="button"
    className={activeSection === "html" ? "help-nav-item active" : "help-nav-item"}
    onClick={() => setActiveSection("html")}
  >
    {t("help.navigation.html")}
  </button>

  <button
    type="button"
    className={activeSection === "proceso" ? "help-nav-item active" : "help-nav-item"}
    onClick={() => setActiveSection("proceso")}
  >
    {t("help.navigation.process")}
  </button>
</nav>

          <div className="help-content">
  <h2>{t(`help.navigation.${activeSection === "validacion" ? "validation" : activeSection === "proceso" ? "process" : activeSection}`)}</h2>

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
        code={[
          "<articulo>",
          "  <metadatos>",
          "    <tituloHTML>Título</tituloHTML>",
          "    <autor>Autor</autor>",
          "    <fecha>yyyy/mm/dd</fecha>",
          "  </metadatos>",
          "  <contenido>",
          "    ...",
          "  </contenido>",
          "</articulo>"
        ].join("\n")}
      />
    </>
  )}

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
        title="1. XML"
        text={t("help.process.xml")}
      />

      <HelpSection
        title="2. DTD"
        text={t("help.process.dtd")}
      />

      <HelpSection
        title="3. XSD"
        text={t("help.process.xsd")}
      />

      <HelpSection
        title="4. HTML"
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