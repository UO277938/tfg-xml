import "./XmlToolbar.css";

import { useTranslation } from "react-i18next";

export default function XmlToolbar({ onFormat, onClean, onReset }) {
  const { t } = useTranslation();

  return (
    <div className="xml-toolbar">
      <button type="button" onClick={onFormat}>{t("toolbar.format")}</button>
      <button type="button" onClick={onClean}>{t("toolbar.clear")}</button>
      <button type="button" onClick={onReset}>{t("toolbar.reset")}</button>
    </div>
  );
}

