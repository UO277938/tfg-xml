import { useState } from "react";
import "./App.css";
import XmlEditor from "./componentes/XmlEditor";
import XmlToolbar from "./componentes/XmlToolbar";
import vkbeautify from "vkbeautify";
import { validateDtd, validateXsd, validateW3C, generateHtml } from "./Api";

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

export default function App() {
  const [xml, setXml] = useState(baseXml);
  const [errors, setErrors] = useState([]);
  const [valid, setValid] = useState(null);
  const [html, setHtml] = useState("");

  const handleValidateDtd = async () => {
    try {
      const res = await validateDtd(xml);
      setErrors(res.errors);
      setValid(res.valid);
    } catch (e) {
      console.error(e);
    }
  };

  const handleFormat = () => {
    setXml(vkbeautify.xml(xml));
  };
  const handleClean = () => {
    setXml(``);
  };
  const handleReset = () => {
    setXml(baseXml)
  };

  return (
    <div>
      <h2>Editor XML</h2>
      <XmlToolbar onFormat={handleFormat} onClean={handleClean} onReset={handleReset} />
      <XmlEditor value={xml} onChange={setXml} />
      <button onClick={handleValidateDtd}>Validar DTD</button>
      {valid !== null && (
          <div>
            {valid ? (
              <p style={{ color: "green" }}>XML válido</p>
            ) : (
              <p style={{ color: "red" }}>XML no válido</p>
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
    </div>
  );
}