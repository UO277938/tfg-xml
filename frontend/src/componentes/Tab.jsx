export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = ["xml", "xsd", "dtd", "html"];

  return (
    <div style={{ display: "flex", borderBottom: "1px solid #ccc" }}>
      {tabs.map((tab) => (
        <div
          key={tab}
          onClick={() => setActiveTab(tab)}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: activeTab === tab ? "#1e1e1e" : "#2d2d2d",
            color: "white",
            borderTop: activeTab === tab ? "2px solid #007acc" : "none"
          }}
        >
          {tab.toUpperCase()}
        </div>
      ))}
    </div>
  );
}