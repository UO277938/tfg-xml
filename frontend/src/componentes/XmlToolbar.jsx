import "./XmlToolbar.css";

export default function XmlToolbar({ onFormat, onClean, onReset }) {
  
  return (
    <div className="xml-toolbar">
      <button type="button" onClick={onFormat}>Formatear</button>
      <button type="button" onClick={onClean}>Limpiar</button>
      <button type="button" onClick={onReset}>Reiniciar</button>
    </div>
  );
}

