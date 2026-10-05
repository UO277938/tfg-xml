<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html" indent="yes" omit-xml-declaration="yes"/>

    <xsl:template match="/documento">

        <xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html&gt;</xsl:text>

        <html lang="es">
            <head>
                <meta charset="utf-8"/>
                <title>
                    <xsl:value-of select="metadatos/tituloHTML"/>
                </title>
                <meta name="author" content="{metadatos/autor}"/>
                <meta name="date" content="{metadatos/fecha}"/>
                <xsl:if test="metadatos/resumen">
                    <meta name="description" content="{metadatos/resumen}"/>
                </xsl:if>
            </head>

            <body>

                <xsl:apply-templates select="cuerpo"/>

            </body>
        </html>

    </xsl:template>

    <!--CUERPO-->
    <xsl:template match="cuerpo">
        <xsl:apply-templates/>
    </xsl:template>

    <!--ESTRUCTURA-->
    <xsl:template match="encabezado">
        <header>
            <xsl:apply-templates/>
        </header>
    </xsl:template>

    <xsl:template match="navegacion">
        <nav>
            <xsl:apply-templates/>
        </nav>
    </xsl:template>

    <xsl:template match="principal">
        <main>
            <xsl:apply-templates/>
        </main>
    </xsl:template>

    <xsl:template match="aparte">
        <aside>
            <xsl:apply-templates/>
        </aside>
    </xsl:template>

    <xsl:template match="pie">
        <footer>
            <xsl:apply-templates/>
        </footer>
    </xsl:template>

    <xsl:template match="seccion">
        <section>
            <xsl:apply-templates/>
        </section>
    </xsl:template>

    <xsl:template match="articulo">
        <article>
            <xsl:apply-templates/>
        </article>
    </xsl:template>

    <xsl:template match="contenedor">
        <div>
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <!--TITULOS-->
    <xsl:template match="titulo">
        <xsl:choose>
            <xsl:when test="@nivel = '1'">
                <h1>
                    <xsl:apply-templates/>
                </h1>
            </xsl:when>

            <xsl:when test="@nivel = '2'">
                <h2>
                    <xsl:apply-templates/>
                </h2>
            </xsl:when>

            <xsl:when test="@nivel = '3'">
                <h3>
                    <xsl:apply-templates/>
                </h3>
            </xsl:when>

            <xsl:when test="@nivel = '4'">
                <h4>
                    <xsl:apply-templates/>
                </h4>
            </xsl:when>

            <xsl:when test="@nivel = '5'">
                <h5>
                    <xsl:apply-templates/>
                </h5>
            </xsl:when>

            <xsl:when test="@nivel = '6'">
                <h6>
                    <xsl:apply-templates/>
                </h6>
            </xsl:when>
        </xsl:choose>
    </xsl:template>

    <!--CONTENIDO -->
    <xsl:template match="parrafo">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="codigo">
        <code>
            <xsl:value-of select="."/>
        </code>
    </xsl:template>

    <xsl:template match="preformateado">
        <pre>
            <xsl:value-of select="."/>
        </pre>
    </xsl:template>

    <xsl:template match="saltoLinea">
        <br/>
    </xsl:template>

    <xsl:template match="enlace">
        <a href="{@href}">
            <xsl:if test="@target">
                <xsl:attribute name="target">
                    <xsl:value-of select="@target"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:apply-templates/>
        </a>
    </xsl:template>

    <xsl:template match="cita">
        <blockquote>
        <xsl:apply-templates/>
            <xsl:if test="@autor">
                <footer>
                    <cite>
                        <xsl:value-of select="@autor"/>
                    </cite>
                </footer>
            </xsl:if>
        </blockquote>
    </xsl:template>

    <!--LISTA-->
    <xsl:template match="lista">
        <xsl:choose>
        <xsl:when test="@tipo = 'ordenada'">
            <ol>
                <xsl:apply-templates select="elementoLista"/>
            </ol>
        </xsl:when>
            <xsl:otherwise>
                <ul>
                    <xsl:apply-templates select="elementoLista"/>
                </ul>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <xsl:template match="elementoLista">
        <li>
            <xsl:apply-templates/>
        </li>
    </xsl:template>

    <xsl:template match="listaDefiniciones">
        <dl>
            <xsl:apply-templates/>
        </dl>
    </xsl:template>

    <xsl:template match="termino">
        <dt>
            <xsl:apply-templates/>
        </dt>
    </xsl:template>

    <xsl:template match="definicion">
        <dd>
            <xsl:apply-templates/>
        </dd>
    </xsl:template>

    <!--TABLA-->
    <xsl:template match="tabla">
        <table>
            <xsl:if test="leyenda">
                <caption>
                    <xsl:apply-templates select="leyenda"/>
                </caption>
            </xsl:if>
            <xsl:if test="cabecera">
                <thead>
                    <xsl:apply-templates select="cabecera/fila"/>
                </thead>
            </xsl:if>
            <tbody>
                <xsl:apply-templates select="cuerpoTabla/fila"/>
            </tbody>
            <xsl:if test="pieTabla">
                <tfoot>
                    <xsl:apply-templates select="pieTabla/fila"/>
                </tfoot>
            </xsl:if>
        </table>
    </xsl:template>

    <xsl:template match="fila">
        <tr>
            <xsl:apply-templates/>
        </tr>
    </xsl:template>

    <xsl:template match="celda">
        <td>
            <xsl:if test="@colspan">
                <xsl:attribute name="colspan">
                    <xsl:value-of select="@colspan"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@rowspan">
                <xsl:attribute name="rowspan">
                    <xsl:value-of select="@rowspan"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:apply-templates/>
        </td>
    </xsl:template>

    <xsl:template match="celdaCabecera">
        <th>
            <xsl:if test="@colspan">
                <xsl:attribute name="colspan">
                    <xsl:value-of select="@colspan"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@rowspan">
                <xsl:attribute name="rowspan">
                    <xsl:value-of select="@rowspan"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:apply-templates/>
        </th>
    </xsl:template>

    <!--MULTIMEDIA-->
    <xsl:template match="multimedia">
        <xsl:choose>
            <xsl:when test="@tipo = 'imagen'">
                <img src="{@src}">
                    <xsl:if test="@alt">
                        <xsl:attribute name="alt">
                            <xsl:value-of select="@alt"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="@ancho">
                        <xsl:attribute name="width">
                            <xsl:value-of select="@ancho"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="@alto">
                        <xsl:attribute name="height">
                            <xsl:value-of select="@alto"/>
                        </xsl:attribute>
                    </xsl:if>
                </img>
            </xsl:when>

            <xsl:when test="@tipo = 'video'">
                <video src="{@src}">
                    <xsl:if test="@controles = 'true'">
                        <xsl:attribute name="controls">
                            controls
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="@autoplay = 'true'">
                        <xsl:attribute name="autoplay">
                            autoplay
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="@loop = 'true'">
                        <xsl:attribute name="loop">
                            loop
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="@muted = 'true'">
                        <xsl:attribute name="muted">
                            muted
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="@poster">
                        <xsl:attribute name="poster">
                            <xsl:value-of select="@poster"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="@ancho">
                        <xsl:attribute name="width">
                            <xsl:value-of select="@ancho"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="@alto">
                        <xsl:attribute name="height">
                            <xsl:value-of select="@alto"/>
                        </xsl:attribute>
                    </xsl:if>
                </video>
            </xsl:when>

            <xsl:when test="@tipo = 'audio'">
                <audio src="{@src}">
                    <xsl:if test="@controles = 'true'">
                        <xsl:attribute name="controls">
                            controls
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="@autoplay = 'true'">
                        <xsl:attribute name="autoplay">
                            autoplay
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="@loop = 'true'">
                        <xsl:attribute name="loop">
                            loop
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="@muted = 'true'">
                        <xsl:attribute name="muted">
                            muted
                        </xsl:attribute>
                    </xsl:if>
                </audio>
            </xsl:when>
        </xsl:choose>
    </xsl:template>

    <!--FIGURA-->
    <xsl:template match="figura">
        <figure>
            <xsl:apply-templates select="multimedia"/>
            <xsl:if test="leyenda">
                <figcaption>
                    <xsl:apply-templates select="leyenda"/>
                </figcaption>
            </xsl:if>
        </figure>
    </xsl:template>

    <!--FORMULARIO-->
    <xsl:template match="formulario">
        <form>
            <xsl:if test="@action">
                <xsl:attribute name="action">
                    <xsl:value-of select="@action"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:attribute name="method">
                <xsl:value-of select="@method"/>
            </xsl:attribute>
            <xsl:apply-templates/>
        </form>
    </xsl:template>

    <xsl:template match="grupoFormulario">
        <fieldset>
            <xsl:apply-templates select="leyenda"/>
            <xsl:apply-templates select="etiqueta | entrada | boton | areaTexto | seleccion | salida"/>
        </fieldset>
    </xsl:template>

    <xsl:template match="grupoFormulario/leyenda">
        <legend>
            <xsl:apply-templates/>
        </legend>
    </xsl:template>

    <xsl:template match="etiqueta">
        <label>
            <xsl:if test="@para">
                <xsl:attribute name="for">
                    <xsl:value-of select="@para"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:apply-templates/>
        </label>
    </xsl:template>

    <xsl:template match="entrada">
        <input type="{@tipo}">
            <xsl:if test="@nombre">
                <xsl:attribute name="name">
                    <xsl:value-of select="@nombre"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@valor">
                <xsl:attribute name="value">
                    <xsl:value-of select="@valor"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@placeholder">
                <xsl:attribute name="placeholder">
                    <xsl:value-of select="@placeholder"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@requerido = 'true'">
                <xsl:attribute name="required">
                    required
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@deshabilitado = 'true'">
                <xsl:attribute name="disabled">
                    disabled
                </xsl:attribute>
            </xsl:if>
        </input>
    </xsl:template>

    <xsl:template match="boton">
        <button type="{@tipo}">
            <xsl:apply-templates/>
        </button>
    </xsl:template>

    <xsl:template match="areaTexto">
        <textarea>
            <xsl:value-of select="."/>
        </textarea>
    </xsl:template>

    <xsl:template match="seleccion">
        <select>
            <xsl:if test="@nombre">
                <xsl:attribute name="name">
                    <xsl:value-of select="@nombre"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@requerido = 'true'">
                <xsl:attribute name="required">
                    required
                </xsl:attribute>
            </xsl:if>
            <xsl:apply-templates/>
        </select>
    </xsl:template>

    <xsl:template match="opcion">
        <option>
            <xsl:if test="@valor">
                <xsl:attribute name="value">
                    <xsl:value-of select="@valor"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@seleccionado = 'true'">
                <xsl:attribute name="selected">
                    selected
                </xsl:attribute>
            </xsl:if>
            <xsl:value-of select="."/>
        </option>
    </xsl:template>

    <xsl:template match="salida">
        <output>
            <xsl:apply-templates/>
        </output>
    </xsl:template>

    <!--INTERACTIVO-->
    <xsl:template match="detalles">
        <details>
            <summary>
                <xsl:apply-templates select="resumenDetalles"/>
            </summary>
            <xsl:apply-templates select="*[not(self::resumenDetalles)]"/>
        </details>
    </xsl:template>

    <xsl:template match="dialogo">
        <dialog open="open">
            <xsl:apply-templates/>
        </dialog>
    </xsl:template>

    <!--TEXTO-->
    <xsl:template match="text()">
        <xsl:value-of select="."/>
    </xsl:template>

</xsl:stylesheet>