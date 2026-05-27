export default function XmlToolbar({ onFormat, onClean, onReset }) {
  
  return (
    <div style={{ marginBottom: 5 }}>
      <button onClick={onFormat}>Formatear</button>
      <button onClick={onClean}>Limpiar</button>
      <button onClick={onReset}>Reiniciar</button>
    </div>
  );
}

