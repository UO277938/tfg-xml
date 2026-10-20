export const baseDtd = `<!-- REUTILIZABLE -->
<!ENTITY % contenidoElemento
        "parrafo |
        titulo |
        lista |
        listaDefiniciones |
        tabla |
        multimedia |
        figura |
        cita |
        formulario |
        seccion |
        articulo |
        aparte |
        contenedor |
        detalles |
        dialogo |
        preformateado">

<!ENTITY % contenidoTexto
        "(#PCDATA |
        codigo |
        enlace |
        saltoLinea)*">

<!-- ESTRUCTURA -->
<!ELEMENT documento (metadatos, cuerpo)>
<!-- METADATOS -->
<!ELEMENT metadatos (tituloHTML, autor, fecha, resumen?)>
<!ELEMENT tituloHTML (#PCDATA)>
<!ELEMENT autor (#PCDATA)>
<!ELEMENT fecha (#PCDATA)>
<!ELEMENT resumen %contenidoTexto;>

<!-- SECCIONES -->
<!ELEMENT cuerpo ((%contenidoElemento;)* | (encabezado?, navegacion?, aparte?, principal?, pie?))>

<!ELEMENT articulo ((%contenidoElemento;)*)>
<!ELEMENT seccion ((%contenidoElemento;)*)>
<!ELEMENT navegacion (enlace | lista)*>
<!ELEMENT aparte ((%contenidoElemento;)*)>
<!ELEMENT encabezado ((%contenidoElemento;)*)>
<!ELEMENT pie ((%contenidoElemento;)*)>
<!ELEMENT contenedor ((%contenidoElemento;)*)>

<!ELEMENT principal ((%contenidoElemento;)*)>


<!-- CONTENIDO -->
<!ELEMENT titulo %contenidoTexto;>
<!ATTLIST titulo nivel (1|2|3|4|5|6) #REQUIRED>
<!ELEMENT parrafo %contenidoTexto;>

<!-- TEXTO -->
<!ELEMENT codigo (#PCDATA)>
<!ELEMENT preformateado (#PCDATA)>
<!ELEMENT cita %contenidoTexto;>
<!ATTLIST cita autor CDATA #IMPLIED>
<!ELEMENT saltoLinea EMPTY>

<!-- LISTA -->
<!ELEMENT lista (elementoLista+)>
<!ATTLIST lista
    tipo (ordenada | desordenada) "desordenada">
<!ELEMENT elementoLista %contenidoTexto;>

<!ELEMENT listaDefiniciones (termino, definicion)+>
<!ELEMENT termino %contenidoTexto;>
<!ELEMENT definicion %contenidoTexto;>

<!-- TABLA -->
<!ELEMENT tabla (leyenda?, cabecera?, cuerpoTabla, pieTabla?)>

<!ELEMENT leyenda %contenidoTexto;>
<!ELEMENT cabecera (fila+)>
<!ELEMENT cuerpoTabla (fila+)>
<!ELEMENT pieTabla (fila+)>

<!ELEMENT fila (celda | celdaCabecera)+>
<!ELEMENT celda %contenidoTexto;>
<!ATTLIST celda
        colspan CDATA #IMPLIED
        rowspan CDATA #IMPLIED>
<!ELEMENT celdaCabecera %contenidoTexto;>
<!ATTLIST celdaCabecera
        colspan CDATA #IMPLIED
        rowspan CDATA #IMPLIED>

<!-- FORMULARIO -->
<!ELEMENT formulario (
        etiqueta |
        entrada |
        boton |
        areaTexto |
        seleccion |
        grupoFormulario |
        salida
        )*>
<!ATTLIST formulario
        action CDATA #IMPLIED
        method (get | post) "get">

<!ELEMENT grupoFormulario (
        leyenda,
        (etiqueta |
        entrada |
        boton |
        areaTexto |
        seleccion |
        salida)+)>

<!ELEMENT etiqueta %contenidoTexto;>
<!ATTLIST etiqueta
        para CDATA #IMPLIED>

<!ELEMENT entrada EMPTY>
<!ATTLIST entrada
        tipo (
            text |
            password |
            email |
            number |
            date |
            time |
            datetime |
            url |
            tel |
            search |
            checkbox |
            radio |
            file |
            color |
            range |
            hidden |
            submit |
            reset
            ) "text"
        nombre CDATA #IMPLIED
        valor CDATA #IMPLIED
        placeholder CDATA #IMPLIED
        requerido (true | false) "false"
        deshabilitado (true | false) "false">

<!ELEMENT boton %contenidoTexto;>
<!ATTLIST boton
        tipo (button | submit | reset) "submit">
<!ELEMENT areaTexto (#PCDATA)>
<!ELEMENT seleccion (opcion+)>
<!ATTLIST seleccion
        nombre CDATA #IMPLIED
        requerido (true | false) "false">
<!ELEMENT opcion (#PCDATA)>
<!ATTLIST opcion
        valor CDATA #IMPLIED
        seleccionado (true|false) "false">
<!ELEMENT salida %contenidoTexto;>

<!-- MULTIMEDIA -->
<!ELEMENT multimedia EMPTY>
<!ATTLIST multimedia
        tipo (imagen | video | audio) #REQUIRED
        src CDATA #REQUIRED
        alt CDATA #IMPLIED
        controles (true | false) "false"
        autoplay (true | false) "false"
        loop (true | false) "false"
        muted (true | false) "false"
        poster CDATA #IMPLIED
        ancho CDATA #IMPLIED
        alto CDATA #IMPLIED>

<!ELEMENT enlace (#PCDATA)>
<!ATTLIST enlace
    href CDATA #REQUIRED
    target CDATA #IMPLIED>

<!ELEMENT figura (multimedia, leyenda?)>

<!-- INTERACTIVO -->
<!ELEMENT detalles (resumenDetalles, (%contenidoElemento;)*)>
<!ELEMENT resumenDetalles %contenidoTexto;>
<!ELEMENT dialogo ((%contenidoElemento;)*)>`;

export const  baseXsd = `<?xml version="1.0" encoding="UTF-8"?>

<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
        <!-- REUTILIZABLE -->
        <xs:group name="contenidoElemento">
                <xs:choice>
                        <xs:element ref="parrafo"/>
                        <xs:element ref="titulo"/>
                        <xs:element ref="lista"/>
                        <xs:element ref="listaDefiniciones"/>
                        <xs:element ref="tabla"/>
                        <xs:element ref="multimedia"/>
                        <xs:element ref="figura"/>
                        <xs:element ref="cita"/>
                        <xs:element ref="formulario"/>
                        <xs:element ref="seccion"/>
                        <xs:element ref="articulo"/>
                        <xs:element ref="aparte"/>
                        <xs:element ref="contenedor"/>
                        <xs:element ref="detalles"/>
                        <xs:element ref="dialogo"/>
                        <xs:element ref="preformateado"/>
                </xs:choice>
        </xs:group>

        <xs:complexType name="contenidoTexto" mixed="true">
                <xs:choice minOccurs="0" maxOccurs="unbounded">
                        <xs:element ref="codigo"/>
                        <xs:element ref="enlace"/>
                        <xs:element ref="saltoLinea"/>
                </xs:choice>
        </xs:complexType>

        <xs:complexType name="contenidoConTitulo">
                <xs:sequence>
                        <xs:element ref="titulo"/>
                        <xs:group ref="contenidoElemento"
                                  minOccurs="0"
                                  maxOccurs="unbounded"/>
                </xs:sequence>
        </xs:complexType>

        <xs:complexType name="soloContenidoElemento">
                <xs:group ref="contenidoElemento"
                          minOccurs="0"
                          maxOccurs="unbounded"/>
        </xs:complexType>
        
        <!-- RAIZ -->
        <xs:element name="documento">
                <xs:complexType>
                <xs:sequence>
                        <xs:element ref="metadatos"/>
                        <xs:element ref="cuerpo"/>
                </xs:sequence>
                </xs:complexType>
        </xs:element>

        <!-- METADATOS -->
        <xs:element name="metadatos">
                <xs:complexType>
                <xs:sequence>
                        <xs:element ref="tituloHTML"/>
                        <xs:element ref="autor"/>
                        <xs:element ref="fecha"/>
                        <xs:element ref="resumen" minOccurs="0"/>
                </xs:sequence>
                </xs:complexType>
        </xs:element>
        <xs:element name="tituloHTML">
                <xs:simpleType>
                <xs:restriction base="xs:string">
                        <xs:maxLength value="120"/>
                </xs:restriction>
                </xs:simpleType>
        </xs:element>
        <xs:element name="autor">
                <xs:simpleType>
                <xs:restriction base="xs:string">
                        <xs:maxLength value="50"/>
                </xs:restriction>
                </xs:simpleType>
        </xs:element>

        <xs:element name="fecha" type="xs:date"/>

        <xs:element name="resumen">
                <xs:simpleType>
                <xs:restriction base="xs:string">
                        <xs:maxLength value="300"/>
                </xs:restriction>
                </xs:simpleType>
        </xs:element>


        <!-- CUERPO -->
        <xs:element name="cuerpo">
                <xs:complexType>
                <xs:sequence>
                        <xs:element ref="encabezado" minOccurs="0"/>
                        <xs:element ref="navegacion" minOccurs="0"/>
                        <xs:element ref="aparte" minOccurs="0"/>
                        <xs:element ref="principal" minOccurs="0"/>
                        <xs:element ref="pie" minOccurs="0"/>
                </xs:sequence>
                </xs:complexType>
        </xs:element>

        <xs:element name="encabezado" type="contenidoConTitulo"/>

        <xs:element name="navegacion">
                <xs:complexType>
                        <xs:choice minOccurs="0" maxOccurs="unbounded">
                                <xs:element ref="enlace"/>
                                <xs:element ref="lista"/>
                        </xs:choice>
                </xs:complexType>
        </xs:element>

        <xs:element name="aparte" type="contenidoConTitulo"/>

        <xs:element name="principal" type="soloContenidoElemento"/>

        <xs:element name="pie" type="soloContenidoElemento"/>

        <xs:element name="contenedor" type="soloContenidoElemento"/>

        <xs:element name="seccion" type="contenidoConTitulo"/>

        <xs:element name="articulo" type="contenidoConTitulo"/>

        <!-- CONTENIDO -->
        <xs:complexType name="tituloType">
                <xs:complexContent>
                        <xs:extension base="contenidoTexto">
                                <xs:attribute name="nivel" use="required">
                                        <xs:simpleType>
                                                <xs:restriction base="xs:integer">
                                                        <xs:minInclusive value="1"/>
                                                        <xs:maxInclusive value="6"/>
                                                </xs:restriction>
                                        </xs:simpleType>
                                </xs:attribute>
                        </xs:extension>
                </xs:complexContent>
        </xs:complexType>

        <xs:element name="titulo" type="tituloType"/>

        <xs:element name="parrafo" type="contenidoTexto"/>

        <!-- TEXTO -->
        <xs:element name="codigo" type="xs:string"/>

        <xs:element name="preformateado" type="xs:string"/>

        <xs:element name="saltoLinea">
                <xs:complexType/>
        </xs:element>

        <xs:element name="enlace">
                <xs:complexType>
                        <xs:simpleContent>
                                <xs:extension base="xs:string">
                                        <xs:attribute name="href"
                                                      type="xs:anyURI"
                                                      use="required"/>
                                        <xs:attribute name="target"
                                                      type="xs:string"/>
                                </xs:extension>
                        </xs:simpleContent>
                </xs:complexType>
        </xs:element>

        <xs:complexType name="citaType">
                <xs:complexContent>
                        <xs:extension base="contenidoTexto">
                                <xs:attribute name="autor" type="xs:string"/>
                        </xs:extension>
                </xs:complexContent>
        </xs:complexType>

        <xs:element name="cita" type="citaType"/>

        <!-- LISTA -->
        <xs:element name="lista">
                <xs:complexType>
                        <xs:sequence>
                                <xs:element ref="elementoLista"
                                            minOccurs="1"
                                            maxOccurs="unbounded"/>
                        </xs:sequence>

                        <xs:attribute name="tipo" default="desordenada">
                                <xs:simpleType>
                                        <xs:restriction base="xs:string">
                                                <xs:enumeration value="ordenada"/>
                                                <xs:enumeration value="desordenada"/>
                                        </xs:restriction>
                                </xs:simpleType>
                        </xs:attribute>
                </xs:complexType>
        </xs:element>

        <xs:element name="elementoLista" type="contenidoTexto"/>

        <xs:element name="listaDefiniciones">
                <xs:complexType>
                        <xs:sequence minOccurs="1" maxOccurs="unbounded">
                                <xs:element ref="termino"/>
                                <xs:element ref="definicion"/>
                        </xs:sequence>
                </xs:complexType>
        </xs:element>

        <xs:element name="termino" type="contenidoTexto"/>
        <xs:element name="definicion" type="contenidoTexto"/>

        <!-- TABLA -->
        <xs:element name="tabla">
                <xs:complexType>
                        <xs:sequence>
                                <xs:element ref="leyenda" minOccurs="0"/>
                                <xs:element ref="cabecera" minOccurs="0"/>
                                <xs:element ref="cuerpoTabla"/>
                                <xs:element ref="pieTabla" minOccurs="0"/>
                        </xs:sequence>
                </xs:complexType>
        </xs:element>

        <xs:element name="leyenda" type="xs:string"/>

        <xs:element name="cabecera">
                <xs:complexType>
                        <xs:sequence>
                                <xs:element ref="fila"
                                            minOccurs="1"
                                            maxOccurs="unbounded"/>
                        </xs:sequence>
                </xs:complexType>
        </xs:element>

        <xs:element name="cuerpoTabla">
                <xs:complexType>
                        <xs:sequence>
                                <xs:element ref="fila"
                                            minOccurs="1"
                                            maxOccurs="unbounded"/>
                        </xs:sequence>
                </xs:complexType>
        </xs:element>

        <xs:element name="pieTabla">
                <xs:complexType>
                        <xs:sequence>
                                <xs:element ref="fila"
                                            minOccurs="1"
                                            maxOccurs="unbounded"/>
                        </xs:sequence>
                </xs:complexType>
        </xs:element>

        <xs:element name="fila">
                <xs:complexType>
                        <xs:choice minOccurs="1" maxOccurs="unbounded">
                                <xs:element ref="celda"/>
                                <xs:element ref="celdaCabecera"/>
                        </xs:choice>
                </xs:complexType>
        </xs:element>

        <xs:element name="celda" type="contenidoTexto"/>

        <xs:complexType name="celdaCabeceraType">
                <xs:complexContent>
                        <xs:extension base="contenidoTexto">
                                <xs:attribute name="colspan"
                                              type="xs:positiveInteger"
                                              use="optional"/>
                                <xs:attribute name="rowspan"
                                              type="xs:positiveInteger"
                                              use="optional"/>
                        </xs:extension>
                </xs:complexContent>
        </xs:complexType>

        <xs:element name="celdaCabecera" type="celdaCabeceraType"/>

        <!-- MULTIMEDIA -->

        <xs:element name="multimedia">
                <xs:complexType>

                        <xs:attribute name="tipo" use="required">
                                <xs:simpleType>
                                        <xs:restriction base="xs:string">
                                                <xs:enumeration value="imagen"/>
                                                <xs:enumeration value="video"/>
                                                <xs:enumeration value="audio"/>
                                        </xs:restriction>
                                </xs:simpleType>
                        </xs:attribute>

                        <xs:attribute name="src"
                                      type="xs:anyURI"
                                      use="required"/>

                        <xs:attribute name="alt"
                                      type="xs:string"/>

                        <xs:attribute name="controles"
                                      type="xs:boolean"
                                      default="false"/>

                        <xs:attribute name="autoplay"
                                      type="xs:boolean"
                                      default="false"/>

                        <xs:attribute name="loop"
                                      type="xs:boolean"
                                      default="false"/>

                        <xs:attribute name="muted"
                                      type="xs:boolean"
                                      default="false"/>

                        <xs:attribute name="poster"
                                      type="xs:anyURI"/>

                        <xs:attribute name="ancho"
                                      type="xs:positiveInteger"/>

                        <xs:attribute name="alto"
                                      type="xs:positiveInteger"/>

                </xs:complexType>
        </xs:element>

        <xs:element name="figura">
                <xs:complexType>
                        <xs:sequence>
                                <xs:element ref="multimedia"/>
                                <xs:element ref="leyenda" minOccurs="0"/>
                        </xs:sequence>
                </xs:complexType>
        </xs:element>

        <!-- FORMULARIO -->
        <xs:element name="formulario">
                <xs:complexType>
                        <xs:choice minOccurs="0" maxOccurs="unbounded">
                                <xs:element ref="etiqueta"/>
                                <xs:element ref="entrada"/>
                                <xs:element ref="boton"/>
                                <xs:element ref="areaTexto"/>
                                <xs:element ref="seleccion"/>
                                <xs:element ref="grupoFormulario"/>
                                <xs:element ref="salida"/>
                        </xs:choice>

                        <xs:attribute name="action"
                                      type="xs:anyURI"/>

                        <xs:attribute name="method" default="get">
                                <xs:simpleType>
                                        <xs:restriction base="xs:string">
                                                <xs:enumeration value="get"/>
                                                <xs:enumeration value="post"/>
                                        </xs:restriction>
                                </xs:simpleType>
                        </xs:attribute>
                </xs:complexType>
        </xs:element>

        <xs:element name="grupoFormulario">
                <xs:complexType>
                        <xs:choice minOccurs="1" maxOccurs="unbounded">
                                <xs:element ref="leyenda"/>
                                <xs:element ref="etiqueta"/>
                                <xs:element ref="entrada"/>
                                <xs:element ref="boton"/>
                                <xs:element ref="areaTexto"/>
                                <xs:element ref="seleccion"/>
                        </xs:choice>
                </xs:complexType>
        </xs:element>

        <xs:complexType name="etiquetaType">
                <xs:complexContent>
                        <xs:extension base="contenidoTexto">
                                <xs:attribute name="para" type="xs:string"/>
                        </xs:extension>
                </xs:complexContent>
        </xs:complexType>

        <xs:element name="etiqueta" type="etiquetaType"/>

        <xs:element name="entrada">
                <xs:complexType>

                        <xs:attribute name="tipo" default="text">
                                <xs:simpleType>
                                        <xs:restriction base="xs:string">
                                                <xs:enumeration value="text"/>
                                                <xs:enumeration value="password"/>
                                                <xs:enumeration value="email"/>
                                                <xs:enumeration value="number"/>
                                                <xs:enumeration value="date"/>
                                                <xs:enumeration value="time"/>
                                                <xs:enumeration value="datetime"/>
                                                <xs:enumeration value="url"/>
                                                <xs:enumeration value="tel"/>
                                                <xs:enumeration value="search"/>
                                                <xs:enumeration value="checkbox"/>
                                                <xs:enumeration value="radio"/>
                                                <xs:enumeration value="file"/>
                                                <xs:enumeration value="color"/>
                                                <xs:enumeration value="range"/>
                                                <xs:enumeration value="hidden"/>
                                                <xs:enumeration value="submit"/>
                                                <xs:enumeration value="reset"/>
                                        </xs:restriction>
                                </xs:simpleType>
                        </xs:attribute>

                        <xs:attribute name="nombre" type="xs:string"/>
                        <xs:attribute name="valor" type="xs:string"/>
                        <xs:attribute name="placeholder" type="xs:string"/>

                        <xs:attribute name="requerido"
                                      type="xs:boolean"
                                      default="false"/>

                        <xs:attribute name="deshabilitado"
                                      type="xs:boolean"
                                      default="false"/>

                </xs:complexType>
        </xs:element>

        <xs:complexType name="botonType">
                <xs:complexContent>
                        <xs:extension base="contenidoTexto">
                                <xs:attribute name="tipo" default="submit">
                                        <xs:simpleType>
                                                <xs:restriction base="xs:string">
                                                        <xs:enumeration value="button"/>
                                                        <xs:enumeration value="submit"/>
                                                        <xs:enumeration value="reset"/>
                                                </xs:restriction>
                                        </xs:simpleType>
                                </xs:attribute>
                        </xs:extension>
                </xs:complexContent>
        </xs:complexType>

        <xs:element name="boton" type="botonType"/>

        <xs:element name="areaTexto" type="xs:string"/>

        <xs:element name="seleccion">
                <xs:complexType>
                        <xs:sequence>
                                <xs:element ref="opcion"
                                            minOccurs="1"
                                            maxOccurs="unbounded"/>
                        </xs:sequence>

                        <xs:attribute name="nombre" type="xs:string"/>

                        <xs:attribute name="requerido"
                                      type="xs:boolean"
                                      default="false"/>
                </xs:complexType>
        </xs:element>

        <xs:element name="opcion">
                <xs:complexType>
                        <xs:simpleContent>
                                <xs:extension base="xs:string">
                                        <xs:attribute name="valor"
                                                      type="xs:string"/>
                                        <xs:attribute name="seleccionado"
                                                      type="xs:boolean"
                                                      default="false"/>
                                </xs:extension>
                        </xs:simpleContent>
                </xs:complexType>
        </xs:element>

        <xs:element name="salida" type="contenidoTexto"/>

        <!-- INTERACTIVO -->

        <xs:element name="detalles">
                <xs:complexType>
                        <xs:sequence>
                                <xs:element ref="resumenDetalles"/>
                                <xs:group ref="contenidoElemento"
                                          minOccurs="0"
                                          maxOccurs="unbounded"/>
                        </xs:sequence>
                </xs:complexType>
        </xs:element>

        <xs:element name="resumenDetalles" type="contenidoTexto"/>

        <xs:element name="dialogo">
                <xs:complexType>
                        <xs:group ref="contenidoElemento"
                                  minOccurs="0"
                                  maxOccurs="unbounded"/>
                </xs:complexType>
        </xs:element>
</xs:schema>`;

export const baseXml = `<?xml version="1.0"?>
<!DOCTYPE documento SYSTEM "articulo.dtd">
<documento>
  <metadatos>
    <tituloHTML>
      TITULO DOCUMENTO
    </tituloHTML>
    <autor>
      FERNANDO
    </autor>
    <fecha>
      2002-09-24
    </fecha>
    <resumen>
      RESUMEN OPCIONAL
    </resumen>
  </metadatos>
  <cuerpo>
    <principal>
      <titulo nivel="1">TITULO 1</titulo>
    </principal>
  </cuerpo>
</documento>`;

export const baseHtml = `Aqui obtendrás un HTML a partir de tu XML válido.

Pulsa Generar HTML cuando el XML sea válido en DTD y XSD para obtener un buen HTML.`;
