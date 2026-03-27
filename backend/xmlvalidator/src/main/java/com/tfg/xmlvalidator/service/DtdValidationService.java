package com.tfg.xmlvalidator.service;

import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;

public class DtdValidationService {

    public boolean validateXML() {

        try {

            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            factory.setValidating(true);
            factory.setNamespaceAware(true);

            DocumentBuilder builder = factory.newDocumentBuilder();

            builder.setEntityResolver((publicId, systemId) -> {

                InputStream dtdStream = getClass()
                        .getClassLoader()
                        .getResourceAsStream("xml/articulo.dtd");

                if (dtdStream == null) {
                    throw new RuntimeException("No se encontró articulo.dtd");
                }

                return new org.xml.sax.InputSource(dtdStream);
            });

            builder.setErrorHandler(new org.xml.sax.helpers.DefaultHandler() {
                @Override
                public void error(org.xml.sax.SAXParseException e) throws SAXException {
                    throw e;
                }
            });

            // Cargar el XML correctamente
            InputStream xmlStream = getClass()
                    .getClassLoader()
                    .getResourceAsStream("xml/ejemplo.xml");

            if (xmlStream == null) {
                throw new RuntimeException("No se encontró ejemplo.xml");
            }

            builder.parse(xmlStream);

            return true;

        } catch (Exception e) {
            System.out.println("Error de validación: " + e.getMessage());
            return false;
        }

    }

}