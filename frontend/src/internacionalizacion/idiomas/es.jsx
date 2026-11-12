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
      loading: "Validando...",
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
            etiquetas: "Etiquetas XML",
            xml: "XML",
            dtd: "DTD",
            xsd: "XSD",
            validation: "Validación",
            html: "Generación HTML",
            process: "Proceso"
        },

        tags: {
            title: "Catálogo de etiquetas XML",
            description: "Consulta los elementos disponibles, sus atributos, los elementos que pueden contener y ejemplos de uso.",
            searchPlaceholder: "Buscar etiquetas XML...",
            all: "Todas",
            count: "Etiquetas",
            empty: "No se han encontrado etiquetas.",
            allowedChildren: "Elementos permitidos",
            attributes: "Atributos",
            required: "Obligatorio",
            optional: "Opcional",
            allowedValues: "Valores permitidos",
            type: "Tipo",
            defaultValue: "Valor por defecto",
            example: "Ejemplo XML",
            usage: "Uso",
            usageTypes: {
              empty: "Elemento vacío. No puede contener texto ni otros elementos.",
              textAndChildren: "Puede contener texto y otros elementos.",
              text: "Puede contener texto.",
              children: "Puede contener otros elementos."
            },
            categories: {
              structure: "Estructura",
              metadata: "Metadatos",
              sections: "Secciones",
              text: "Texto y contenido",
              lists: "Listas",
              tables: "Tablas",
              forms: "Formularios",
              multimedia: "Multimedia",
              interactive: "Elementos interactivos"
            },
            elements: {
              documento: { description: "Elemento raíz del documento XML." },
              metadatos: { description: "Contiene los metadatos generales del documento." },
              tituloHTML: { description: "Define el título del documento HTML generado." },
              autor: { description: "Indica el autor del documento." },
              fecha: { description: "Indica la fecha de creación o publicación." },
              resumen: { description: "Contiene un resumen del documento." },
              cuerpo: { description: "Contiene el contenido principal del documento." },
              articulo: { description: "Representa un artículo o bloque de contenido independiente." },
              seccion: { description: "Agrupa contenido relacionado dentro del documento." },
              navegacion: { description: "Agrupa enlaces de navegación." },
              aparte: { description: "Representa contenido relacionado de forma secundaria con el contenido principal." },
              encabezado: { description: "Representa la cabecera de una página o sección." },
              pie: { description: "Representa el pie de una página o sección." },
              principal: { description: "Identifica el contenido principal del documento." },
              contenedor: { description: "Agrupa otros elementos sin añadir significado semántico específico." },
              titulo: { description: "Define un título o encabezado.",
                        attributes: {
                          nivel: { description: "Nivel jerárquico del título." }
                        }
               },
              parrafo: { description: "Representa un párrafo de texto." },
              codigo: { description: "Representa un fragmento de código." },
              preformateado: { description: "Representa texto cuyo formato y espacios deben conservarse." },
              cita: { description: "Representa una cita.",
                attributes: {
                  autor: { description: "Autor de la cita." }
                }
               },
              saltoLinea: { description: "Introduce un salto de línea." },
              lista: { description: "Representa una lista de elementos.",
                attributes: {
                  tipo: { description: "Tipo de lista." }
                }
               },
              elementoLista: { description: "Representa un elemento de una lista." },
              listaDefiniciones: { description: "Representa una lista de términos y sus definiciones." },
              termino: { description: "Indica un término dentro de una lista de definiciones." },
              definicion: { description: "Contiene la definición de un término." },
              tabla: { description: "Representa una tabla de datos." },
              leyenda: { description: "Define el título o descripción de una tabla." },
              cabecera: { description: "Agrupa el contenido de cabecera de una tabla." },
              cuerpoTabla: { description: "Agrupa las filas principales de una tabla." },
              pieTabla: { description: "Agrupa el contenido del pie de una tabla." },
              fila: { description: "Representa una fila de una tabla." },
              celda: { description: "Representa una celda de datos.",
                      attributes: {
                  colspan: { description: "Número de columnas que ocupa la celda." },
                  rowspan: { description: "Número de filas que ocupa la celda." }
                }
               },
              celdaCabecera: { description: "Representa una celda de encabezado de tabla.",
                              attributes: {
                  colspan: { description: "Número de columnas que ocupa la celda." },
                  rowspan: { description: "Número de filas que ocupa la celda." }
                }
               },
              formulario: { description: "Representa un formulario para introducir y enviar datos.",
                                attributes: {
                    action: { description: "Dirección a la que se envían los datos." },
                    method: { description: "Método de envío del formulario." }
                  }
               },
              grupoFormulario: { description: "Agrupa controles relacionados de un formulario." },
              etiqueta: { description: "Proporciona un nombre o descripción para un control.",
                              attributes: {
                  para: { description: "Identifica el control asociado." }
                }
               },
              entrada: { description: "Representa un campo de entrada de datos.",
                                attributes: {
                    tipo: { description: "Tipo de campo." },
                    nombre: { description: "Nombre del campo." },
                    valor: { description: "Valor inicial del campo." },
                    placeholder: { description: "Texto de ayuda del campo." },
                    requerido: { description: "Indica si el campo es obligatorio." },
                    deshabilitado: { description: "Indica si el campo está deshabilitado." }
                  }
               },
              boton: { description: "Representa un botón interactivo.",
                                attributes: {
                    tipo: { description: "Función del botón." }
                  }
               },
              areaTexto: { description: "Representa un campo de texto de varias líneas." },
              seleccion: { description: "Representa una lista de opciones seleccionables.",
                                attributes: {
                    nombre: { description: "Nombre del control." },
                    requerido: { description: "Indica si la selección es obligatoria." }
                  }
               },
              opcion: { description: "Define una opción dentro de una lista de selección.",
                                attributes: {
                    valor: { description: "Valor de la opción." },
                    seleccionado: { description: "Indica si la opción aparece seleccionada." }
                  }
               },
              salida: { description: "Representa el resultado de una operación o cálculo." },
              multimedia: { description: "Permite incorporar contenido multimedia.",
                                attributes: {
                    tipo: { description: "Tipo de contenido multimedia." },
                    src: { description: "Ruta del recurso multimedia." },
                    alt: { description: "Descripción alternativa del recurso." },
                    controles: { description: "Muestra los controles de reproducción." },
                    autoplay: { description: "Reproduce automáticamente el contenido." },
                    loop: { description: "Repite automáticamente la reproducción." },
                    muted: { description: "Silencia el contenido multimedia." },
                    poster: { description: "Imagen previa de un vídeo." },
                    ancho: { description: "Anchura del recurso." },
                    alto: { description: "Altura del recurso." }
                  }
               },
              enlace: { description: "Representa un enlace a otro recurso.",
                                attributes: {
                    href: { description: "Dirección del enlace." },
                    target: { description: "Destino donde se abre el enlace." }
                  }
               },
              figura: { description: "Agrupa contenido multimedia con una posible descripción." },
              detalles: { description: "Representa un bloque de contenido desplegable." },
              resumenDetalles: { description: "Define el encabezado visible de un bloque desplegable." },
              dialogo: { description: "Representa una ventana o cuadro de diálogo." }
            }
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


};

export default es;