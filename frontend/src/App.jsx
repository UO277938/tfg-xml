import { useState } from "react";
import "./App.css";
import XmlEditor from "./componentes/XmlEditor";
import XmlToolbar from "./componentes/XmlToolbar";
import vkbeautify from "vkbeautify";
import prettier from "prettier/standalone";
import parserHtml from "prettier/plugins/html";
import { validateDtd, validateXsd, validateW3C, generateHtml } from "./Api";
import Tabs from "./componentes/Tab";
import HelpPanel from "./componentes/HelpPanel";

const baseXml = `<?xml version="1.0"?>
<!DOCTYPE articulo SYSTEM "articulo.dtd">
<articulo>
  <metadatos>
    <titulo>Titulo</titulo>
    <autor>Autor</autor>
    <fecha>2026-03-16</fecha>
    <resumen>Resumen</resumen>
  </metadatos>
  <contenido>
  </contenido>
</articulo>`;

const baseHtml = `Aqui obtendrás un HTML a partir de tu XML válido.
Pulsa Generar HTML cuando el XML sea válido en DTD y XSD para obtener un buen HTML.`

export default function App() {
  const [activeTab, setActiveTab] = useState("xml");
  const [showHelp, setShowHelp] = useState(false);

  const [xml, setXml] = useState(baseXml);

  const [errors, setErrors] = useState([]);
  const [valid, setValid] = useState(null);

  const [validText, setValidText] = useState("");

  const [html, setHtml] = useState(baseHtml);

  const handleValidate = async () => {
    if(activeTab == "xml"){
      try {
        const res = await validateDtd(xml);
        console.log(res);
        setErrors(res.errors);
        setValid(res.valid);
        setValidText("XML CON DTD")
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleValidateW3C = async () => {
    if(activeTab == "html"){
      
      try {
        const res = await validateW3C(xml);
        console.log(res);
        setErrors(res.errors);
        setValid(res.valid);
        setValidText("HTML CON W3C")
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleFormat = async () => {
    if(activeTab == "xml")
      setXml(vkbeautify.xml(xml));

    else if (activeTab === "html") {

    const formatted = await prettier.format(html, {
      parser: "html",
      plugins: [parserHtml]
    });

    setHtml(formatted);
  }

  };
  const handleClean = () => {
    if(activeTab == "xml")
      setXml(``);
    else if(activeTab=="html")
      setHtml(``);
  };

  const handleReset = () => {
    if(activeTab == "xml")
      setXml(baseXml);
    else if(activeTab=="html")
      setHtml(baseHtml);
  };

  return (
  <div className="app">
    <header className="app-header">
      <div>
        <span className="app-kicker">XML WORKSPACE</span>
        <h1>Editor XML</h1>
      </div>

      <button
        type="button"
        className="help-button"
        onClick={() => setShowHelp((visible) => !visible)}
        aria-label="Mostrar u ocultar ayuda"
      >
        Ayuda
      </button>
    </header>

    <Tabs
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />

    <XmlToolbar
      onFormat={handleFormat}
      onClean={handleClean}
      onReset={handleReset}
    />
  <main className="workspace">
    <section className="editor-area">

        {activeTab === "xml" && (
          <XmlEditor value={xml} onChange={setXml} />
        )}

        {activeTab === "html" && (
          <XmlEditor value={html} onChange={html} />
        )}

        {activeTab === "xml" && (
          <button
            type="button"
            className="primary-action"
            onClick={handleValidate}
          >
            ✓ Validar documento
          </button>
        )}

        {activeTab === "html" && (
          <div>
            <button onClick={handleValidateW3C}>Validar W3C</button>
          </div>
        )}
      
         {valid !== null  &&(
            <div>
              {valid ? (
                <p style={{ color: "green" }}>CORRECTO: {validText}</p>
              ) : (
                <p style={{ color: "red" }}>FALLO: {validText}</p>
              )}
            </div>
        )}
    
          <ul>
            {errors.map((err, i) => (
              <li key={i}>
                Línea {err.line}, Columna {err.column}: {err.message}
              </li>
            ))}
          </ul>
        </section>

        {showHelp && (
          <HelpPanel
            onClose={() => setShowHelp(false)}
          />
        )}
      </main>
    </div>
  );
}