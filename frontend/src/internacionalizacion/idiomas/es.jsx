const es = {
  translation: {
    app: {
      title: "Editor XML",
      kicker: "XML WORKSPACE",
      help: "Ayuda"
    },

    tabs: {
      xml: "XML",
      html: "HTML"
    },

    toolbar: {
      format: "Formatear",
      clear: "Limpiar",
      reset: "Reiniciar"
    },

    validation: {
      validate: "Validar documento",
      result: "RESULTADO DEL PIPELINE",
      valid: "Documento válido",
      invalid: "Documento no válido",
      errors: "Errores encontrados",
      line: "Línea",
      column: "Columna",
      noDetails: "El pipeline ha terminado indicando que el documento no es válido, pero no se han recibido detalles de los errores.",
      success: "El documento ha superado correctamente todas las fases del pipeline."
    },

    language: {
      spanish: "Español",
      english: "English"
    },

    help: {
        label: "DOCUMENTACIÓN",
        title: "Ayuda del editor",
        close: "Cerrar ayuda",

        navigation: {
            xml: "XML",
            dtd: "DTD",
            xsd: "XSD",
            validation: "Validación",
            html: "Generación HTML",
            process: "Proceso"
        },

    xml: {
        title: "XML",
            what: {
            title: "¿Qué es XML?",
            text: "XML es un lenguaje de marcado utilizado para representar información de forma estructurada mediante elementos y atributos."
            },
            structure: {
            title: "Estructura",
            text: "Un documento XML está formado por elementos organizados jerárquicamente. Cada elemento puede contener otros elementos o texto."
            },
            example: {
            title: "Ejemplo"
            }
    },

    dtd: {
        what: {
        title: "¿Qué es un DTD?",
        text: "Un DTD define las reglas estructurales que debe cumplir un documento XML."
        },
        purpose: {
        title: "¿Para qué sirve?",
        text: "Permite establecer qué elementos pueden aparecer, en qué orden y qué atributos pueden utilizarse."
        },
        specification: {
        title: "Especificación utilizada",
        text: "Esta es la especificación DTD utilizada por la aplicación para validar el documento XML."
        }
    },

    xsd: {
        what: {
        title: "¿Qué es XML Schema?",
        text: "XML Schema (XSD) permite definir de forma más precisa la estructura y las restricciones de un documento XML."
        },
        purpose: {
        title: "¿Para qué sirve?",
        text: "La aplicación utiliza este esquema para comprobar que el XML cumple las restricciones definidas."
        },
        specification: {
        title: "Especificación utilizada",
        text: "Esta es la especificación XSD utilizada por la aplicación para validar el documento XML."
        }
    },

    validationHelp: {
        dtd: {
        title: "Validación DTD",
        text: "Comprueba que el documento XML cumple las reglas definidas en el DTD."
        },
        xsd: {
        title: "Validación XSD",
        text: "Comprueba que el documento XML cumple la estructura y los tipos definidos en el esquema XSD."
        },
        errors: {
        title: "Errores",
        text: "Cuando se produce un error, la aplicación muestra información sobre la línea, columna y descripción del problema."
        }
    },

    htmlHelp: {
        generate: {
        title: "Generar HTML",
        text: "Una vez validado correctamente el XML, puedes generar un documento HTML a partir de su contenido."
        },
        w3c: {
        title: "Validación W3C",
        text: "El HTML generado puede comprobarse mediante el validador del W3C."
        },
        format: {
        title: "Formato",
        text: "El botón de formato permite organizar el código HTML para facilitar su lectura."
        }
    },

    process: {
        what: {
            title: "¿Cómo funciona la aplicación?",
            text: "La aplicación procesa el documento XML mediante una secuencia de validaciones y transformaciones."
        },
        xml: "Primero se comprueba que el documento XML esté correctamente formado.",
        dtd: "Después se comprueba que la estructura del XML cumple la especificación DTD.",
        xsd: "A continuación se valida el XML utilizando el esquema XSD.",
        html: "Si las validaciones anteriores son correctas, el XML se transforma en HTML.",
        w3c: "Finalmente se comprueba la validez del HTML generado."
}
    }
  },

    app: {
        title: "Editor XML",
        kicker: "XML WORKSPACE",
        help: "Ayuda"
    },

    validation: {
        validate: "Validar documento",
        result: "RESULTADO DEL PIPELINE",
        valid: "Documento válido",
        invalid: "Documento no válido",
        errors: "Errores encontrados",
        line: "Línea",
        column: "Columna",
        noDetails:
            "El pipeline ha terminado indicando que el documento no es válido, pero no se han recibido detalles de los errores.",
        success:
            "El documento ha superado correctamente todas las fases del pipeline.",
        pipelineError:
            "No se ha podido ejecutar el pipeline."
    }
};

export default es;