import { useState } from "react";
import "./HelpPanel.css";

import { baseDtd, baseXsd } from "../especificacion/especificacion";

const helpSections = [
  {
    id: "xml",
    title: "XML",
    content: [
      {
        title: "¿Qué es XML?",
        text: "XML es un lenguaje de marcado utilizado para representar información de forma estructurada mediante elementos y atributos."
      },
      {
        title: "Estructura",
        text: "Un documento XML está formado por elementos organizados jerárquicamente. Cada elemento puede contener otros elementos o texto."
      },
      {
        title: "Ejemplo",
        code: `<articulo>
                <metadatos>
                  <titulo>Título</titulo>
                  <autor>Autor</autor>
                </metadatos>
                <contenido>
                  ...
                </contenido>
              </articulo>`
      }
    ]
  },

  {
    id: "dtd",
    title: "DTD",
    content: [
      {
        title: "¿Qué es un DTD?",
        text: "Un DTD define las reglas estructurales que debe cumplir un documento XML."
      },
      {
        title: "¿Para qué sirve?",
        text: "Permite establecer qué elementos pueden aparecer, en qué orden y qué atributos pueden utilizarse."
      },
      {
        title: "Especificación utilizada",
        text: "Esta es la especificación DTD utilizada por la aplicación para validar el documento XML.",
        code: baseDtd
      }
    ]
  },

  {
    id: "xsd",
    title: "XSD",
    content: [
      {
        title: "¿Qué es XML Schema?",
        text: "XML Schema (XSD) permite definir de forma más precisa la estructura y las restricciones de un documento XML."
      },
      {
        title: "¿Para qué sirve?",
        text: "La aplicación utiliza este esquema para comprobar que el XML cumple las restricciones definidas."
      },
      {
        title: "Especificación utilizada",
        text: "Esta es la especificación XSD utilizada por la aplicación para validar el documento XML.",
        code: baseXsd
      }
    ]
  },

  {
    id: "validacion",
    title: "Validación",
    content: [
      {
        title: "Validación DTD",
        text: "Comprueba que el documento XML cumple las reglas definidas en el DTD."
      },
      {
        title: "Validación XSD",
        text: "Comprueba que el documento XML cumple la estructura y los tipos definidos en el esquema XSD."
      },
      {
        title: "Errores",
        text: "Cuando se produce un error, la aplicación muestra información sobre la línea, columna y descripción del problema."
      }
    ]
  },

  {
    id: "html",
    title: "Generación HTML",
    content: [
      {
        title: "Generar HTML",
        text: "Una vez validado correctamente el XML, puedes generar un documento HTML a partir de su contenido."
      },
      {
        title: "Validación W3C",
        text: "El HTML generado puede comprobarse mediante el validador del W3C."
      },
      {
        title: "Formato",
        text: "El botón de formato permite organizar el código HTML para facilitar su lectura."
      }
    ]
  },
  
  {
  id: "proceso",
  title: "Proceso",
  content: [
    {
      title: "¿Cómo funciona la aplicación?",
      text: "La aplicación procesa el documento XML mediante una secuencia de validaciones y transformaciones."
    },
    {
      title: "1. XML",
      text: "Primero se comprueba que el documento XML esté correctamente formado."
    },
    {
      title: "2. DTD",
      text: "Después se comprueba que la estructura del XML cumple la especificación DTD."
    },
    {
      title: "3. XSD",
      text: "A continuación se valida el XML utilizando el esquema XSD."
    },
    {
      title: "4. Generación HTML",
      text: "Si las validaciones anteriores son correctas, el XML se transforma en HTML."
    },
    {
      title: "5. Validación W3C",
      text: "Finalmente se comprueba la validez del HTML generado."
    }
  ]
}
];

function HelpSection({ title, text, code }) {
  return (
    <section className="help-section">
      <h4>{title}</h4>

      {text && <p>{text}</p>}

      {code && (
        <pre>
          <code>{code}</code>
        </pre>
      )}
    </section>
  );
}

export default function HelpPanel({ onClose }) {
  const [activeSection, setActiveSection] = useState("xml");

  const section = helpSections.find(
    (item) => item.id === activeSection
  );

  return (
    <aside className="help-panel" aria-label="Panel de ayuda">

      <header className="help-header">
        <div>
          <span className="help-label">DOCUMENTACIÓN</span>
          <h3>Ayuda del editor</h3>
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

      <div className="help-body">

        <nav className="help-navigation">
          {helpSections.map((item) => (
            <button
              key={item.id}
              type="button"
              className={
                activeSection === item.id
                  ? "help-nav-item active"
                  : "help-nav-item"
              }
              onClick={() => setActiveSection(item.id)}
            >
              {item.title}
            </button>
          ))}
        </nav>

        <div className="help-content">

          <h2>{section.title}</h2>

          {section.content.map((item, index) => (
            <HelpSection
              key={`${section.id}-${index}`}
              title={item.title}
              text={item.text}
              code={item.code}
            />
          ))}

        </div>

      </div>
    </aside>
  );
}