export default function XmlToolbar({ onFormat, onClean }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <button onClick={onFormat}>Formatear XML</button>
      <button onClick={onClean}>Limpiar</button>
    </div>
  );
}

