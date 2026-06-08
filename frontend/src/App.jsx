import { useState } from "react";
import "./App.css";
import XmlEditor from "./componentes/XmlEditor";
import XmlToolbar from "./componentes/XmlToolbar";
import vkbeautify from "vkbeautify";
import prettier from "prettier/standalone";
import parserHtml from "prettier/plugins/html";
import { validateDtd, validateXsd, validateW3C, generateHtml } from "./Api";
import Tabs from "./componentes/Tab";

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

const baseDtd = `<!ELEMENT articulo (metadatos, contenido)>

<!ELEMENT metadatos (titulo, autor, fecha, resumen?)>
<!ELEMENT titulo (#PCDATA)>
<!ELEMENT autor (#PCDATA)>
<!ELEMENT fecha (#PCDATA)>
<!ELEMENT resumen (#PCDATA)>

<!ELEMENT contenido (seccion+)>

<!ELEMENT seccion (tituloSeccion, parrafo+, lista?, imagen*)>

<!ELEMENT tituloSeccion (#PCDATA)>
<!ELEMENT parrafo (#PCDATA)>

<!ELEMENT lista (elementoLista+)>
<!ELEMENT elementoLista (#PCDATA)>

<!ELEMENT imagen EMPTY>
<!ATTLIST imagen
        src CDATA #REQUIRED
        alt CDATA #IMPLIED>`;

const  baseXsd = `<?xml version="1.0" encoding="UTF-8"?>

<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
        <xs:element name="articulo">
                <xs:complexType>
                        <xs:sequence>
                                <xs:element name="metadatos">
                                        <xs:complexType>
                                                <xs:sequence>
                                                        <xs:element ref="titulo"/>
                                                        <xs:element ref="autor"/>
                                                        <xs:element ref="fecha"/>
                                                        <xs:element ref="resumen" minOccurs="0"/>
                                                </xs:sequence>
                                        </xs:complexType>
                                </xs:element>

                                <xs:element name="contenido" >
                                        <xs:complexType>
                                                <xs:sequence>
                                                        <xs:element minOccurs="1" maxOccurs="unbounded" ref="seccion" />
                                                </xs:sequence>
                                        </xs:complexType>
                                </xs:element>
                        </xs:sequence>
                </xs:complexType>
        </xs:element>

        <xs:element name="titulo">
                <xs:simpleType>
                        <xs:restriction base="xs:string">
                                <xs:maxLength value="120"/>
                        </xs:restriction>
                </xs:simpleType>
        </xs:element>
        <xs:element name="autor">
                <xs:simpleType>
                        <xs:restriction base="xs:string">
                                <xs:maxLength value="50"/>
                        </xs:restriction>
                </xs:simpleType>
        </xs:element>
        <xs:element name="fecha" type="xs:date"/>
        <xs:element name="resumen">
                <xs:simpleType>
                        <xs:restriction base="xs:string">
                                <xs:maxLength value="300"/>
                        </xs:restriction>
                </xs:simpleType>
        </xs:element>

        <xs:element name="seccion">
                <xs:complexType>
                        <xs:sequence>
                                <xs:element ref="tituloSeccion"/>
                                <xs:element ref="parrafo" maxOccurs="unbounded"/>
                                <xs:element ref="lista" minOccurs="0"/>
                                <xs:element ref="imagen" minOccurs="0" maxOccurs="unbounded"/>
                        </xs:sequence>
                </xs:complexType>
        </xs:element>

        <xs:element name="tituloSeccion" type="xs:string"/>
        <xs:element name="parrafo" type="xs:string"/>
        <xs:element name="lista">
                <xs:complexType>
                        <xs:sequence>
                                <xs:element ref="elementoLista" minOccurs="1" maxOccurs="unbounded"/>
                        </xs:sequence>
                </xs:complexType>
        </xs:element>
        <xs:element name="elementoLista" type="xs:string"/>
        <xs:element name="imagen">
                <xs:complexType>
                        <xs:attribute name="src" type="xs:string" use="required"/>
                        <xs:attribute name="alt" type="xs:string"/>
                </xs:complexType>
        </xs:element>
</xs:schema>`;

const baseHtml = `Aqui obtendrás un HTML a partir de tu XML válido.
Pulsa Generar HTML cuando el XML sea válido en DTD y XSD para obtener un buen HTML.`

export default function App() {
  const [activeTab, setActiveTab] = useState("xml");

  const [xml, setXml] = useState(baseXml);
  const [xsd, setXsd] = useState(baseXsd);
  const [dtd, setDtd] = useState(baseDtd);

  const [errors, setErrors] = useState([]);
  const [valid, setValid] = useState(null);

  const [validText, setValidText] = useState("");

  const [html, setHtml] = useState(baseHtml);

  const handleValidateDtd = async () => {
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

  const handleValidateXsd = async () => {
    if(activeTab == "xml"){
      try {
        const res = await validateXsd(xml);
        console.log(res);
        setErrors(res.errors);
        setValid(res.valid);
        setValidText("XML CON XSD")
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleGenerateHtml = async () => {
    if(activeTab == "xml"){
      try {
        setActiveTab("html"); 
        const res = await generateHtml(xml);
        console.log(res);
        setValid(null);
        setValidText("")
        if(res.valid){
          setHtml(res.html);
          setErrors([])
        }
        
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
    else if(activeTab=="xsd")
      setXsd(vkbeautify.xml(xsd));
    else if(activeTab=="dtd")
      setDtd(vkbeautify.xml(dtd));

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
    else if(activeTab=="xsd")
      setXsd(``);
    else if(activeTab=="dtd")
      setDtd(``);
    else if(activeTab=="html")
      setHtml(``);
  };

  const handleReset = () => {
    if(activeTab == "xml")
      setXml(baseXml);
    else if(activeTab=="xsd")
      setXsd(baseXsd);
    else if(activeTab=="dtd")
      setDtd(baseDtd);
    else if(activeTab=="html")
      setHtml(baseHtml);
  };

  return (
    <div>
      <h2>Editor XML</h2>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <XmlToolbar onFormat={handleFormat} onClean={handleClean} onReset={handleReset} />
       {activeTab === "xml" && (
        <XmlEditor value={xml} onChange={setXml} />
      )}

      {activeTab === "xsd" && (
        <XmlEditor value={xsd} onChange={xsd} />
      )}

      {activeTab === "dtd" && (
        <XmlEditor value={dtd} onChange={dtd} />
      )}

      {activeTab === "html" && (
        <XmlEditor value={html} onChange={html} />
      )}

      {activeTab === "xml" && (
        <div>
          <button onClick={handleValidateDtd}>Validar DTD</button>
          <button onClick={handleValidateXsd}>Validar XSD</button>
          <button onClick={handleGenerateHtml}>Generar HTML</button>
        </div>
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
    </div>
  );
}