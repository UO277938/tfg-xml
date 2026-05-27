package com.tfg.xmlvalidator.service;

import com.tfg.xmlvalidator.model.ValidationResult;

import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

import java.io.InputStream;
import java.io.StringReader;
import java.io.StringWriter;

public class XsltTransformationService {

    public String transformXML(String xmlContent) {
        try {

            InputStream xsltStream = getClass()
                    .getClassLoader()
                    .getResourceAsStream("xml/transformacion.xslt");

            if (xsltStream == null) {
                throw new RuntimeException("No se encontró transformacion.xslt");
            }

            xmlContent = xmlContent.replaceAll("<!DOCTYPE[^>]*>", "");

            TransformerFactory factory = TransformerFactory.newInstance();

            Transformer transformer = factory.newTransformer(
                    new StreamSource(xsltStream)
            );

            StreamSource xmlSource =
                    new StreamSource(new StringReader(xmlContent));

            StringWriter writer = new StringWriter();

            transformer.transform(
                    xmlSource,
                    new StreamResult(writer)
            );

            return writer.toString();

        } catch (Exception e) {
            throw new RuntimeException(
                    "Error transformando XML a HTML: " + e.getMessage()
            );
        }

    }

}