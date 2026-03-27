<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html" encoding="UTF-8" indent="yes" />

    <xsl:template match="/articulo">

        <xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html&gt;</xsl:text>

        <html lang="es">
            <head>
                <title>
                    <xsl:value-of select="metadatos/titulo"/>
                </title>
            </head>

            <body>

                <h1>
                    <xsl:value-of select="metadatos/titulo"/>
                </h1>

                <p>
                    Autor:
                    <xsl:value-of select="metadatos/autor"/>
                </p>

                <p>
                    Fecha:
                    <xsl:value-of select="metadatos/fecha"/>
                </p>

                <xsl:if test="metadatos/resumen">
                    <p>
                        Resumen:
                        <xsl:value-of select="metadatos/resumen"/>
                    </p>
                </xsl:if>

                <xsl:apply-templates select="contenido/seccion"/>

            </body>
        </html>

    </xsl:template>


    <xsl:template match="seccion">

        <h2>
            <xsl:value-of select="tituloSeccion"/>
        </h2>

        <xsl:apply-templates select="parrafo"/>
        <xsl:apply-templates select="lista"/>
        <xsl:apply-templates select="imagen"/>

    </xsl:template>


    <xsl:template match="parrafo">

        <p>
            <xsl:value-of select="."/>
        </p>

    </xsl:template>


    <xsl:template match="lista">

        <ul>
            <xsl:for-each select="elementoLista">
                <li>
                    <xsl:value-of select="."/>
                </li>
            </xsl:for-each>
        </ul>

    </xsl:template>


    <xsl:template match="imagen">

        <img>
            <xsl:attribute name="src">
                <xsl:value-of select="@src"/>
            </xsl:attribute>

            <xsl:attribute name="alt">
                <xsl:value-of select="@alt"/>
            </xsl:attribute>

        </img>

    </xsl:template>

</xsl:stylesheet>