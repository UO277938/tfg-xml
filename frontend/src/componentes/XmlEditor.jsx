import Editor from "@monaco-editor/react";
import "./XmlEditor.css";

export default function XmlEditor({ value, onChange }) {

  //comportamiento añadido para un editor más cercano a XML
  const handleEditorDidMount = (editor, monaco) => {

    //al pulsar enter
    editor.addCommand(monaco.KeyCode.Enter, () => {
      const position = editor.getPosition();
      const model = editor.getModel();

      const lineContent = model.getLineContent(position.lineNumber);
      const textBeforeCursor = lineContent.substring(0, position.column - 1);

      //detectar si estamos en una etiqueta de apertura pe: <articulo>
      const match = textBeforeCursor.match(/<([a-zA-Z0-9_:-]+)>$/);

      if (match) {
        const tag = match[1];
        const indent = lineContent.match(/^\s*/)[0];
        const insertText = `\n${indent}  \n${indent}</${tag}>`;
        
        //añadir la etiqueta de cierre pe: </articulo>
        editor.executeEdits("", [
          {
            range: {
              startLineNumber: position.lineNumber,
              startColumn: position.column,
              endLineNumber: position.lineNumber,
              endColumn: position.column
            },
            text: insertText
          }
        ]);
        //colocar cursor en medio
        editor.setPosition({
          lineNumber: position.lineNumber + 1,
          column: indent.length + 3
        });
      //comportamiento normal
      } else {
        editor.trigger("keyboard", "type", { text: "\n" });
      }
    });
  };

  return (
      <div className="xml-editor-wrapper">
        <Editor
          height="100%"
          language="xml"
          value={value}
          onChange={(v) => onChange(v || "")}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: "on",
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            scrollBeyondLastLine: false,
          }}
        />
      </div>
  );
}