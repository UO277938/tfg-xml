
const contenidoElemento = [
  "parrafo",
  "titulo",
  "lista",
  "listaDefiniciones",
  "tabla",
  "multimedia",
  "figura",
  "cita",
  "formulario",
  "seccion",
  "articulo",
  "aparte",
  "contenedor",
  "detalles",
  "dialogo",
  "preformateado"
];

const contenidoTexto = [
  "codigo",
  "enlace",
  "saltoLinea"
];

const elementosFormulario = [
  "etiqueta",
  "entrada",
  "boton",
  "areaTexto",
  "seleccion",
  "grupoFormulario",
  "salida"
];

const booleanos = ["true", "false"];

export const elementosRaiz = ["documento"];

export const etiquetasXML = {
  documento: {
    descripcion: "Elemento raíz del documento XML.",
    hijos: ["metadatos", "cuerpo"]
  },

  metadatos: {
    descripcion: "Contiene los metadatos del documento.",
    hijos: ["tituloHTML", "autor", "fecha", "resumen"]
  },

  tituloHTML: {
    descripcion: "Título del documento HTML.",
    texto: true
  },

  autor: {
    descripcion: "Autor del documento.",
    texto: true
  },

  fecha: {
    descripcion: "Fecha de publicación del documento.",
    texto: true
  },

  resumen: {
    descripcion: "Resumen del documento.",
    hijos: contenidoTexto,
    texto: true
  },

  cuerpo: {
    descripcion: "Contiene el contenido principal del documento.",
    hijos: [
      ...contenidoElemento,
      "encabezado",
      "navegacion",
      "principal",
      "pie"
    ]
  },

  articulo: {
    descripcion: "Representa un artículo independiente.",
    hijos: contenidoElemento
  },

  seccion: {
    descripcion: "Agrupa contenido relacionado dentro del documento.",
    hijos: contenidoElemento
  },

  navegacion: {
    descripcion: "Contiene enlaces de navegación.",
    hijos: ["enlace", "lista"]
  },

  aparte: {
    descripcion: "Contenido relacionado de forma secundaria con el contenido principal.",
    hijos: contenidoElemento
  },

  encabezado: {
    descripcion: "Representa la cabecera de una sección o documento.",
    hijos: contenidoElemento
  },

  pie: {
    descripcion: "Representa el pie de una sección o documento.",
    hijos: contenidoElemento
  },

  principal: {
    descripcion: "Contiene el contenido principal del documento.",
    hijos: contenidoElemento
  },

  contenedor: {
    descripcion: "Agrupa otros elementos sin aportar un significado específico.",
    hijos: contenidoElemento
  },

  titulo: {
    descripcion: "Define un título con un nivel de jerarquía.",
    hijos: contenidoTexto,
    texto: true,
    atributos: {
      nivel: {
        descripcion: "Nivel del título.",
        valores: ["1", "2", "3", "4", "5", "6"],
        requerido: true
      }
    }
  },

  parrafo: {
    descripcion: "Representa un párrafo de texto.",
    hijos: contenidoTexto,
    texto: true
  },

  codigo: {
    descripcion: "Representa un fragmento de código.",
    texto: true
  },

  preformateado: {
    descripcion: "Representa texto preformateado que conserva sus espacios y saltos.",
    texto: true
  },

  cita: {
    descripcion: "Representa una cita textual.",
    hijos: contenidoTexto,
    texto: true,
    atributos: {
      autor: {
        descripcion: "Autor de la cita.",
        tipo: "CDATA"
      }
    }
  },

  saltoLinea: {
    descripcion: "Introduce un salto de línea. No contiene texto ni elementos.",
    vacio: true
  },

  lista: {
    descripcion: "Representa una lista de elementos.",
    hijos: ["elementoLista"],
    atributos: {
      tipo: {
        descripcion: "Tipo de lista.",
        valores: ["ordenada", "desordenada"],
        defecto: "desordenada"
      }
    }
  },

  elementoLista: {
    descripcion: "Representa un elemento individual de una lista.",
    hijos: contenidoTexto,
    texto: true
  },

  listaDefiniciones: {
    descripcion: "Contiene una serie de términos y sus definiciones.",
    hijos: ["termino", "definicion"]
  },

  termino: {
    descripcion: "Término que se desea definir.",
    hijos: contenidoTexto,
    texto: true
  },

  definicion: {
    descripcion: "Definición asociada a un término.",
    hijos: contenidoTexto,
    texto: true
  },

  tabla: {
    descripcion: "Representa una tabla de datos.",
    hijos: ["leyenda", "cabecera", "cuerpoTabla", "pieTabla"]
  },

  leyenda: {
    descripcion: "Añade una descripción o título a una tabla o figura.",
    hijos: contenidoTexto,
    texto: true
  },

  cabecera: {
    descripcion: "Contiene las filas de cabecera de una tabla.",
    hijos: ["fila"]
  },

  cuerpoTabla: {
    descripcion: "Contiene las filas principales de una tabla.",
    hijos: ["fila"]
  },

  pieTabla: {
    descripcion: "Contiene las filas del pie de una tabla.",
    hijos: ["fila"]
  },

  fila: {
    descripcion: "Representa una fila de una tabla.",
    hijos: ["celda", "celdaCabecera"]
  },

  celda: {
    descripcion: "Representa una celda de datos.",
    hijos: contenidoTexto,
    texto: true,
    atributos: {
      colspan: {
        descripcion: "Número de columnas que ocupa la celda.",
        tipo: "CDATA"
      },
      rowspan: {
        descripcion: "Número de filas que ocupa la celda.",
        tipo: "CDATA"
      }
    }
  },

  celdaCabecera: {
    descripcion: "Representa una celda de encabezado de tabla.",
    hijos: contenidoTexto,
    texto: true,
    atributos: {
      colspan: {
        descripcion: "Número de columnas que ocupa la celda.",
        tipo: "CDATA"
      },
      rowspan: {
        descripcion: "Número de filas que ocupa la celda.",
        tipo: "CDATA"
      }
    }
  },

  formulario: {
    descripcion: "Contiene los controles de un formulario.",
    hijos: elementosFormulario,
    atributos: {
      action: {
        descripcion: "Dirección a la que se envían los datos.",
        tipo: "CDATA"
      },
      method: {
        descripcion: "Método de envío del formulario.",
        valores: ["get", "post"],
        defecto: "get"
      }
    }
  },

  grupoFormulario: {
    descripcion: "Agrupa controles relacionados dentro de un formulario.",
    hijos: [
      "leyenda",
      "etiqueta",
      "entrada",
      "boton",
      "areaTexto",
      "seleccion",
      "salida"
    ]
  },

  etiqueta: {
    descripcion: "Etiqueta descriptiva asociada a un control.",
    hijos: contenidoTexto,
    texto: true,
    atributos: {
      para: {
        descripcion: "Identifica el control asociado.",
        tipo: "CDATA"
      }
    }
  },

  entrada: {
    descripcion: "Campo de entrada de datos. Es un elemento vacío.",
    vacio: true,
    atributos: {
      tipo: {
        descripcion: "Tipo de campo.",
        valores: [
          "text", "password", "email", "number",
          "date", "time", "datetime", "url", "tel",
          "search", "checkbox", "radio", "file",
          "color", "range", "hidden", "submit", "reset"
        ],
        defecto: "text"
      },
      nombre: {
        descripcion: "Nombre del campo.",
        tipo: "CDATA"
      },
      valor: {
        descripcion: "Valor inicial del campo.",
        tipo: "CDATA"
      },
      placeholder: {
        descripcion: "Texto de ayuda del campo.",
        tipo: "CDATA"
      },
      requerido: {
        descripcion: "Indica si el campo es obligatorio.",
        valores: booleanos,
        defecto: "false"
      },
      deshabilitado: {
        descripcion: "Indica si el campo está deshabilitado.",
        valores: booleanos,
        defecto: "false"
      }
    }
  },

  boton: {
    descripcion: "Representa un botón interactivo.",
    hijos: contenidoTexto,
    texto: true,
    atributos: {
      tipo: {
        descripcion: "Función del botón.",
        valores: ["button", "submit", "reset"],
        defecto: "submit"
      }
    }
  },

  areaTexto: {
    descripcion: "Campo de texto multilínea.",
    texto: true
  },

  seleccion: {
    descripcion: "Control que permite seleccionar una opción.",
    hijos: ["opcion"],
    atributos: {
      nombre: {
        descripcion: "Nombre del control.",
        tipo: "CDATA"
      },
      requerido: {
        descripcion: "Indica si la selección es obligatoria.",
        valores: booleanos,
        defecto: "false"
      }
    }
  },

  opcion: {
    descripcion: "Opción disponible dentro de un elemento seleccion.",
    texto: true,
    atributos: {
      valor: {
        descripcion: "Valor de la opción.",
        tipo: "CDATA"
      },
      seleccionado: {
        descripcion: "Indica si la opción aparece seleccionada.",
        valores: booleanos,
        defecto: "false"
      }
    }
  },

  salida: {
    descripcion: "Representa el resultado de una operación o cálculo.",
    hijos: contenidoTexto,
    texto: true
  },

  multimedia: {
    descripcion: "Inserta una imagen, vídeo o audio. Es un elemento vacío.",
    vacio: true,
    atributos: {
      tipo: {
        descripcion: "Tipo de contenido multimedia.",
        valores: ["imagen", "video", "audio"],
        requerido: true
      },
      src: {
        descripcion: "Ruta del recurso multimedia.",
        tipo: "CDATA",
        requerido: true
      },
      alt: {
        descripcion: "Descripción alternativa del recurso.",
        tipo: "CDATA"
      },
      controles: {
        descripcion: "Muestra los controles de reproducción.",
        valores: booleanos,
        defecto: "false"
      },
      autoplay: {
        descripcion: "Reproduce automáticamente el contenido.",
        valores: booleanos,
        defecto: "false"
      },
      loop: {
        descripcion: "Repite automáticamente la reproducción.",
        valores: booleanos,
        defecto: "false"
      },
      muted: {
        descripcion: "Silencia el contenido multimedia.",
        valores: booleanos,
        defecto: "false"
      },
      poster: {
        descripcion: "Imagen previa de un vídeo.",
        tipo: "CDATA"
      },
      ancho: {
        descripcion: "Anchura del recurso.",
        tipo: "CDATA"
      },
      alto: {
        descripcion: "Altura del recurso.",
        tipo: "CDATA"
      }
    }
  },

  enlace: {
    descripcion: "Representa un enlace a otra página o recurso.",
    texto: true,
    atributos: {
      href: {
        descripcion: "Dirección del enlace.",
        tipo: "CDATA",
        requerido: true
      },
      target: {
        descripcion: "Destino donde se abre el enlace.",
        tipo: "CDATA"
      }
    }
  },

  figura: {
    descripcion: "Agrupa un recurso multimedia y una leyenda opcional.",
    hijos: ["multimedia", "leyenda"]
  },

  detalles: {
    descripcion: "Representa contenido adicional que puede mostrarse u ocultarse.",
    hijos: ["resumenDetalles", ...contenidoElemento]
  },

  resumenDetalles: {
    descripcion: "Título o resumen visible de un elemento detalles.",
    hijos: contenidoTexto,
    texto: true
  },

  dialogo: {
    descripcion: "Representa un cuadro de diálogo o ventana interactiva.",
    hijos: contenidoElemento
  }
};
