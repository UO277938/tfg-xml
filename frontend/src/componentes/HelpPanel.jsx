import "./HelpPanel.css";

const helpContent = {
  xml: {
    title: "Ayuda del editor XML",
    sections: [
      {
        title: "¿Qué es este archivo?",
        text: "El archivo XML contiene la estructura del documento que quieres transformar posteriormente en HTML."
      },
      {
        title: "¿Cómo escribir XML?",
        text: "Utiliza etiquetas de apertura y cierre. Por ejemplo: <titulo>Mi título</titulo>."
      },
      {
        title: "Consejos",
        text: "Mantén una estructura ordenada, respeta la jerarquía de elementos y utiliza nombres de etiquetas coherentes."
      }
    ]
  },

  xsd: {
    title: "Ayuda del XML Schema",
    sections: [
      {
        title: "¿Qué es el XSD?",
        text: "El XML Schema define la estructura que debe cumplir el documento XML."
      },
      {
        title: "¿Para qué sirve?",
        text: "Permite comprobar los elementos, atributos, tipos de datos y relaciones permitidas en el XML."
      },
      {
        title: "Validación",
        text: "El XML debe cumplir las reglas definidas en el esquema XSD."
      }
    ]
  },

  dtd: {
    title: "Ayuda del DTD",
    sections: [
      {
        title: "¿Qué es un DTD?",
        text: "Un DTD define qué elementos y atributos pueden aparecer en un documento XML."
      },
      {
        title: "¿Para qué sirve?",
        text: "Se utiliza para comprobar que la estructura del XML cumple las reglas definidas."
      },
      {
        title: "Elementos habituales",
        text: "Puedes utilizar declaraciones como <!ELEMENT>, <!ATTLIST> y #PCDATA."
      }
    ]
  },

  html: {
    title: "Ayuda del HTML generado",
    sections: [
      {
        title: "¿Qué se muestra aquí?",
        text: "En esta pestaña puedes consultar el HTML generado a partir del XML mediante la transformación."
      },
      {
        title: "Formato",
        text: "Puedes utilizar el botón de formato para organizar automáticamente el código HTML."
      },
      {
        title: "Validación",
        text: "El HTML generado debe comprobarse posteriormente utilizando el validador del W3C."
      }
    ]
  }
};

function HelpSection({ title, text }) {
  return (
    <section className="help-section">
      <h4>{title}</h4>
      <p>{text}</p>
    </section>
  );
}

export default function HelpPanel({ activeTab, onClose }) {
  const content = helpContent[activeTab] ?? helpContent.xml;

  return (
    <aside className="help-panel" aria-label="Panel de ayuda">
      <header className="help-header">
        <div>
          <span className="help-label">DOCUMENTACIÓN</span>
          <h3>{content.title}</h3>
        </div>

        <button
          type="button"
          className="help-close"
          onClick={onClose}
          aria-label="Cerrar ayuda"
        >
          ×
        </button>
      </header>

      <div className="help-content">
        {content.sections.map((section, index) => (
          <HelpSection
            key={`${activeTab}-${index}`}
            title={section.title}
            text={section.text}
          />
        ))}
      </div>
    </aside>
  );
}