const en = {
  translation: {
    app: {
      title: "XML Editor",
      kicker: "XML WORKSPACE",
      help: "Help"
    },

    tabs: {
      xml: "XML",
      html: "HTML"
    },

    toolbar: {
      format: "Format",
      clear: "Clear",
      reset: "Reset"
    },

    validation: {
      validate: "Validate document",
      loading: "Validating...",
      result: "PIPELINE RESULT",
      valid: "Valid document",
      invalid: "Invalid document",
      errors: "Errors found",
      line: "Line",
      column: "Column",
      noDetails: "The pipeline has finished indicating that the document is invalid, but no error details were received.",
      success: "The document has successfully passed all pipeline stages."
    },

    language: {
      spanish: "Español",
      english: "English"
    },

    help: {
  label: "DOCUMENTATION",
  title: "Editor Help",
  close: "Close help",

  navigation: {
    etiquetas: "XML Tags",
    xml: "XML",
    dtd: "DTD",
    xsd: "XSD",
    validation: "Validation",
    html: "HTML Generation",
    process: "Process"
  },

  tags: {
    title: "XML Tag Catalog",
    description: "Explore the available elements, their attributes, allowed child elements and usage examples.",
    searchPlaceholder: "Search XML tags...",
    all: "All",
    count: "Tags",
    empty: "No tags were found.",
    allowedChildren: "Allowed child elements",
    attributes: "Attributes",
    required: "Required",
    optional: "Optional",
    allowedValues: "Allowed values",
    type: "Type",
    defaultValue: "Default value",
    example: "XML Example",
    usage: "Usage",
    usageTypes: {
      empty: "Empty element. It cannot contain text or other elements.",
      textAndChildren: "Can contain text and other elements.",
      text: "Can contain text.",
      children: "Can contain other elements."
    },
    categories: {
      structure: "Structure",
      metadata: "Metadata",
      sections: "Sections",
      text: "Text and content",
      lists: "Lists",
      tables: "Tables",
      forms: "Forms",
      multimedia: "Multimedia",
      interactive: "Interactive elements"
    },
    elements: {
      documento: { description: "Root element of the XML document." },
      metadatos: { description: "Contains the general metadata of the document." },
      tituloHTML: { description: "Defines the title of the generated HTML document." },
      autor: { description: "Specifies the author of the document." },
      fecha: { description: "Specifies the creation or publication date." },
      resumen: { description: "Contains a summary of the document." },
      cuerpo: { description: "Contains the main content of the document." },
      articulo: { description: "Represents an article or independent content block." },
      seccion: { description: "Groups related content within the document." },
      navegacion: { description: "Groups navigation links." },
      aparte: { description: "Represents content indirectly related to the main content." },
      encabezado: { description: "Represents the header of a page or section." },
      pie: { description: "Represents the footer of a page or section." },
      principal: { description: "Identifies the main content of the document." },
      contenedor: { description: "Groups elements without adding specific semantic meaning." },
      titulo: { description: "Defines a title or heading.",
              attributes: {
          nivel: { description: "Heading hierarchy level." }
        }
       },
      parrafo: { description: "Represents a paragraph of text." },
      codigo: { description: "Represents a code fragment." },
      preformateado: { description: "Represents text whose formatting and whitespace must be preserved." },
      cita: { description: "Represents a quotation.",
                attributes: {
            autor: { description: "Author of the quotation." }
          }
       },
      saltoLinea: { description: "Inserts a line break." },
      lista: { description: "Represents a list of items.",
                attributes: {
            tipo: { description: "List type." }
          }
       },
      elementoLista: { description: "Represents an item in a list." },
      listaDefiniciones: { description: "Represents a list of terms and their definitions." },
      termino: { description: "Specifies a term in a definition list." },
      definicion: { description: "Contains the definition of a term." },
      tabla: { description: "Represents a data table." },
      leyenda: { description: "Defines the title or caption of a table." },
      cabecera: { description: "Groups the header content of a table." },
      cuerpoTabla: { description: "Groups the main rows of a table." },
      pieTabla: { description: "Groups the footer content of a table." },
      fila: { description: "Represents a table row." },
      celda: { description: "Represents a data cell.",
              attributes: {
          colspan: { description: "Number of columns occupied by the cell." },
          rowspan: { description: "Number of rows occupied by the cell." }
        }
       },
      celdaCabecera: { description: "Represents a table header cell.",
                attributes: {
            colspan: { description: "Number of columns occupied by the cell." },
            rowspan: { description: "Number of rows occupied by the cell." }
          }
       },
      formulario: { description: "Represents a form for entering and submitting data.",
                attributes: {
            action: { description: "Address where the form data is sent." },
            method: { description: "Form submission method." }
          }
       },
      grupoFormulario: { description: "Groups related form controls." },
      etiqueta: { description: "Provides a name or description for a control.",
                attributes: {
            para: { description: "Identifies the associated control." }
          }
       },
      entrada: { description: "Represents a data input field.",
                attributes: {
            tipo: { description: "Input field type." },
            nombre: { description: "Name of the input field." },
            valor: { description: "Initial value of the field." },
            placeholder: { description: "Help text displayed in the field." },
            requerido: { description: "Indicates whether the field is required." },
            deshabilitado: { description: "Indicates whether the field is disabled." }
          }
       },
      boton: { description: "Represents an interactive button.",
                attributes: {
            tipo: { description: "Button function." }
          }
       },
      areaTexto: { description: "Represents a multiline text field." },
      seleccion: { description: "Represents a list of selectable options.",
                attributes: {
            nombre: { description: "Control name." },
            requerido: { description: "Indicates whether a selection is required." }
          }
       },
      opcion: { description: "Defines an option within a selection list.",
                attributes: {
            valor: { description: "Option value." },
            seleccionado: { description: "Indicates whether the option is selected." }
          }
       },
      salida: { description: "Represents the result of an operation or calculation." },
      multimedia: { description: "Allows multimedia content to be included.",
                attributes: {
            tipo: { description: "Type of multimedia content." },
            src: { description: "Path to the multimedia resource." },
            alt: { description: "Alternative description of the resource." },
            controles: { description: "Displays playback controls." },
            autoplay: { description: "Automatically plays the content." },
            loop: { description: "Automatically repeats playback." },
            muted: { description: "Mutes the multimedia content." },
            poster: { description: "Preview image for a video." },
            ancho: { description: "Resource width." },
            alto: { description: "Resource height." }
          }
       },
      enlace: { description: "Represents a link to another resource.",
              attributes: {
          href: { description: "Link address." },
          target: { description: "Destination where the link opens." }
        }
       },
      figura: { description: "Groups multimedia content with an optional caption." },
      detalles: { description: "Represents a collapsible content block." },
      resumenDetalles: { description: "Defines the visible heading of a collapsible block." },
      dialogo: { description: "Represents a dialog box or window." }
    }
  },

  xml: {
    title: "XML",
    what: {
      title: "What is XML?",
      text: "XML is a markup language used to represent information in a structured way using elements and attributes."
    },
    structure: {
      title: "Structure",
      text: "An XML document consists of hierarchically organized elements. Each element can contain other elements or text."
    },
    example: {
      title: "Example"
    }
  },

  dtd: {
    what: {
      title: "What is a DTD?",
      text: "A DTD defines the structural rules that an XML document must follow."
    },
    purpose: {
      title: "What is it used for?",
      text: "It defines which elements can appear, in which order, and which attributes can be used."
    },
    specification: {
      title: "Specification used",
      text: "This is the DTD specification used by the application to validate the XML document."
    }
  },

  xsd: {
    what: {
      title: "What is XML Schema?",
      text: "XML Schema (XSD) allows the structure and constraints of an XML document to be defined more precisely."
    },
    purpose: {
      title: "What is it used for?",
      text: "The application uses this schema to check that the XML complies with the defined constraints."
    },
    specification: {
      title: "Specification used",
      text: "This is the XSD specification used by the application to validate the XML document."
    }
  },

  validationHelp: {
    dtd: {
      title: "DTD Validation",
      text: "Checks that the XML document complies with the rules defined in the DTD."
    },
    xsd: {
      title: "XSD Validation",
      text: "Checks that the XML document complies with the structure and types defined in the XSD schema."
    },
    errors: {
      title: "Errors",
      text: "When an error occurs, the application displays information about the line, column and description of the problem."
    }
  },

  htmlHelp: {
    generate: {
      title: "Generate HTML",
      text: "Once the XML has been successfully validated, you can generate an HTML document from its content."
    },
    w3c: {
      title: "W3C Validation",
      text: "The generated HTML can be checked using the W3C validator."
    },
    format: {
      title: "Formatting",
      text: "The format button organizes the HTML code to make it easier to read."
    }
  },

  process: {
    what: {
      title: "How does the application work?",
      text: "The application processes the XML document through a sequence of validations and transformations."
    },
    xml: "First, the XML document is checked to ensure that it is well-formed.",
    dtd: "Next, the XML structure is checked against the DTD specification.",
    xsd: "The XML is then validated using the XSD schema.",
    html: "If the previous validations are successful, the XML is transformed into HTML.",
    w3c: "Finally, the generated HTML is checked for validity."
  }
}
  },


};

export default en;