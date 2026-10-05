import "./Tab.css";

import { useTranslation } from "react-i18next";

export default function Tabs({ activeTab, setActiveTab }) {
  const { t } = useTranslation();

  return (
    <div className="tabs">
      <button
        type="button"
        className={activeTab === "xml" ? "tab active" : "tab"}
        onClick={() => setActiveTab("xml")}
      >
        {t("tabs.xml")}
      </button>

      <button
        type="button"
        className={activeTab === "html" ? "tab active" : "tab"}
        onClick={() => setActiveTab("html")}
      >
        {t("tabs.html")}
      </button>
    </div>
  );
}