import { useState } from "react";
import "./App.css";
import XmlEditor from "./componentes/XmlEditor";
import XmlToolbar from "./componentes/XmlToolbar";
import vkbeautify from "vkbeautify";

export default function App() {
  const [xml, setXml] = useState(`<?xml version="1.0"?>
<articulo>
  <metadatos>
    <titulo>Titulo</titulo>
    <autor>Autor</autor>
    <fecha>2026-03-16</fecha>
    <resumen>Resumen</resumen>
  </metadatos>
  <contenido>
  </contenido>
</articulo>`);

  const handleFormat = () => {
    setXml(vkbeautify.xml(xml));
  };
  const handleClean = () => {
    setXml(xml.trim());
  };

  return (
    <div>
      <h2>Editor XML</h2>
      <XmlToolbar onFormat={handleFormat} onClean={handleClean} />
      <XmlEditor value={xml} onChange={setXml} />
    </div>
  );
}