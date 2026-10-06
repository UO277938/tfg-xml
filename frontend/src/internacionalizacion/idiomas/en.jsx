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
    xml: "XML",
    dtd: "DTD",
    xsd: "XSD",
    validation: "Validation",
    html: "HTML Generation",
    process: "Process"
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

  app: {
  title: "XML Editor",
  kicker: "XML WORKSPACE",
  help: "Help"
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
  noDetails:
    "The pipeline has finished indicating that the document is invalid, but no error details were received.",
  success:
    "The document has successfully passed all pipeline stages.",
  pipelineError:
    "The pipeline could not be executed."
}
};

export default en;