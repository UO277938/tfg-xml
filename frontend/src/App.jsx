import { useState } from "react";
import "./App.css";
import XmlEditor from "./componentes/XmlEditor";
import XmlToolbar from "./componentes/XmlToolbar";
import vkbeautify from "vkbeautify";
import prettier from "prettier/standalone";
import parserHtml from "prettier/plugins/html";
import { validate } from "./Api";
import Tabs from "./componentes/Tab";
import HelpPanel from "./componentes/HelpPanel";
import {baseXml, baseHtml} from "./especificacion/especificacion.jsx";

export default function App() {
  const [activeTab, setActiveTab] = useState("xml");
  const [showHelp, setShowHelp] = useState(false);

  const [xml, setXml] = useState(baseXml);

  const [errors, setErrors] = useState([]);
  const [valid, setValid] = useState(null);

  const [fase, setFase] = useState("");

  const [html, setHtml] = useState(baseHtml);

  const handleValidate = async () => {
  if (activeTab !== "xml") return;

  try {
    const res = await validate(xml);

    console.log("Resultado pipeline:", res);

    setErrors(Array.isArray(res.errores) ? res.errores : []);
    setValid(res.success);
    setFase(res.fase ?? "");

    if (res.html) {
      setHtml(res.html);
    }
  } catch (e) {
    console.error("Error ejecutando el pipeline:", e);

    setErrors([
      {
        line: null,
        column: null,
        message: "No se ha podido ejecutar el pipeline."
      }
    ]);

    setValid(false);
    setFase("ERROR");
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

        {activeTab === "xml" && (
              <div className="validation-bar">

                <button
                  type="button"
                  className="primary-action"
                  onClick={handleValidate}
                >✓ Validar documento
                </button>

              </div>
            )}

        <button
          type="button"
          className="help-button"
          onClick={() => setShowHelp((visible) => !visible)}
          aria-label="Mostrar u ocultar ayuda"
        >
          <span>?</span>
          Ayuda
        </button>
      </header>

      <main className="workspace">

        <section className="editor-area">

          <div className="editor-topbar">

            <Tabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <XmlToolbar
              onFormat={handleFormat}
              onClean={handleClean}
              onReset={handleReset}
            />

          </div>

          <div className="editor-wrapper">

            <div className="editor-container">

              {activeTab === "xml" && (
                <XmlEditor
                  value={xml}
                  onChange={setXml}
                />
              )}

              {activeTab === "html" && (
                <XmlEditor
                  value={html}
                  onChange={setHtml}
                />
              )}

            </div>

            

            {valid !== null && (
              <section
                className={
                  valid
                    ? "results-panel results-success"
                    : "results-panel results-error"
                }
              >

                <header className="results-header">

                  <div>
                    <span className="results-label">
                      RESULTADO DEL PIPELINE
                    </span>

                    <h2>
                      {valid
                        ? "✓ Documento válido"
                        : "✕ Documento no válido"}
                    </h2>
                  </div>

                  {fase && (
                    <span className="phase-badge">
                      {fase}
                    </span>
                  )}

                </header>

                {!valid && errors.length > 0 && (
                  <div className="errors-container">

                    <h3>
                      Errores encontrados
                      <span>{errors.length}</span>
                    </h3>

                    <ul className="error-list">

                      {errors.map((err, i) => (
                        <li
                          key={`${err.line}-${err.column}-${i}`}
                          className="error-item"
                        >

                          <div className="error-location">
                            <span>●</span>

                            Línea {err.line ?? "?"}
                            {" · "}
                            Columna {err.column ?? "?"}
                          </div>

                          <div className="error-message">
                            {err.message}
                          </div>

                        </li>
                      ))}

                    </ul>

                  </div>
                )} 

                {!valid && errors.length === 0 && (
                  <div className="no-errors-message">
                    El pipeline ha terminado indicando que el documento no es válido,
                    pero no se han recibido detalles de los errores.
                  </div>
                )}

                {valid && (
                  <div className="success-message">
                    El documento ha superado correctamente todas
                    las fases del pipeline.
                  </div>
                )}

              </section>
            )}

          </div>

        </section>

        {showHelp && (
          <HelpPanel
            onClose={() => setShowHelp(false)}
          />
        )}

      </main>

    </div>
  );
  /*<div className="app">
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
      
        {valid !== null && (
          <div className={valid ? "pipeline-result success" : "pipeline-result error"}>

          <div className="pipeline-status">
            {valid ? "✓ DOCUMENTO VÁLIDO" : "✕ DOCUMENTO NO VÁLIDO"}
          </div>

          {fase && (
            <div className="pipeline-phase">
              Fase: <strong>{fase}</strong>
            </div>
          )}

          {!valid && errors.length > 0 && (
            <div className="pipeline-errors">
            <h3>Errores encontrados</h3>

            <ul className="error-list">
              {errors.map((err, i) => (
                <li key={i}>
                  <div>
                    <strong>
                      Línea {err.line}, Columna {err.column}
                    </strong>
                  </div>

                  <div>{err.message}</div>
                </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
          )}
        </section>

        {showHelp && (
          <HelpPanel
            onClose={() => setShowHelp(false)}
          />
        )}
      </main>
    </div>
  );*/
}