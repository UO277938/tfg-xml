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
import { useTranslation } from "react-i18next";

export default function App() {
  const [activeTab, setActiveTab] = useState("xml");
  const { t, i18n } = useTranslation();
  const [showHelp, setShowHelp] = useState(false);

  const [loading, setLoading] = useState(false);

  const [xml, setXml] = useState(baseXml);

  const [errors, setErrors] = useState([]);
  const [valid, setValid] = useState(null);

  const [fase, setFase] = useState("");

  const [html, setHtml] = useState(baseHtml);

  const handleValidate = async () => {
    if (activeTab !== "xml" || loading) return;

    setLoading(true);

    try {
      const res = await validate(xml, i18n.language);

      //console.log("Resultado pipeline:", res);

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
          message: t("validation.pipelineError")
        }
      ]);

      setValid(false);
      setFase("ERROR");

    } finally {
      setLoading(false);
    }
  };

  const changeLanguage = async () => {
    const newLanguage = i18n.language === "es" ? "en" : "es";
    await i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
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
          <span className="app-kicker">{t("app.kicker")}</span>
          <h1>{t("app.title")}</h1>
        </div>

        {activeTab === "xml" && (
              <div className="validation-bar">

                <button
                  type="button"
                  className={`primary-action ${loading ? "loading" : ""}`}
                  onClick={handleValidate}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading" />
                      {t("validation.loading")}
                    </>
                  ) : (
                    <>
                      ✓ {t("validation.validate")}
                    </>
                  )}
                </button>

              </div>
        )}
        <div className="header-actions">
          <button
            type="button"
            className="language-button"
            onClick={changeLanguage}
            aria-label="Cambiar idioma"
          >
            {i18n.language === "es" ? "ES" : "EN"}
          </button>

          <button
            type="button"
            className="help-button"
            onClick={() => setShowHelp((visible) => !visible)}
            aria-label={t("app.help")}
          >
            {t("app.help")}
          </button>
        </div>
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
                      {t("validation.result")}
                    </span>

                    <h2>
                      {valid
                        ? `✓ ${t("validation.valid")}`
                        : `✕ ${t("validation.invalid")}`}
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
                      {t("validation.errors")}
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

                            {t("validation.line")} {err.line ?? "?"}
                            {" · "}
                            {t("validation.column")} {err.column ?? "?"}
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
                    {t("validation.noDetails")}
                  </div>
                )}

                {valid && (
                  <div className="success-message">
                    {t("validation.success")}
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
}