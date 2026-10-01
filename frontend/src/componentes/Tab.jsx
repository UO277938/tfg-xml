import "./Tab.css";

export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="tabs">
      <button
        type="button"
        className={activeTab === "xml" ? "tab active" : "tab"}
        onClick={() => setActiveTab("xml")}
      >
        XML
      </button>

      <button
        type="button"
        className={activeTab === "html" ? "tab active" : "tab"}
        onClick={() => setActiveTab("html")}
      >
        HTML
      </button>
    </div>
  );
}