import Editor from "@monaco-editor/react";
import vkbeautify from "vkbeautify";

export default function XmlEditor({ value, onChange }) {
  const formatXml = () => {
    const formatted = vkbeautify.xml(value);
    onChange(formatted);
  };

  const cleanXml = () => {
    onChange(value.trim());
  };

  return (
    <div>
      {/* Toolbar */}
      <div style={{ marginBottom: 10 }}>
        <button onClick={formatXml}>Formatear XML</button>
        <button onClick={cleanXml}>Limpiar</button>
      </div>

      {/* Editor */}
      <div style={{ border: "1px solid #ccc", borderRadius: "6px" }}>
        <Editor
          height="500px"
          language="xml"
          value={value}
          onChange={(v) => onChange(v || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: "on",
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            scrollBeyondLastLine: false
          }}
        />
      </div>
    </div>
  );
}