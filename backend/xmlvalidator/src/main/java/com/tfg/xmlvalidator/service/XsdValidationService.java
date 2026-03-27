package com.tfg.xmlvalidator.service;

import javax.xml.XMLConstants;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;
import java.io.InputStream;

public class XsdValidationService {

    public boolean validateXML() {

        try {

            SchemaFactory factory =
                    SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);

            InputStream xmlStream = getClass()
                    .getClassLoader()
                    .getResourceAsStream("xml/ejemploxsd.xml");

            InputStream xsdStream = getClass()
                    .getClassLoader()
                    .getResourceAsStream("xml/articulo.xsd");

            if (xsdStream == null) {
                throw new RuntimeException("No se encontró xml/articulo.xsd en resources");
            }
            if (xmlStream == null) {
                throw new RuntimeException("No se encontró xml/ejemplo.xml en resources");
            }



            Schema schema = factory.newSchema(new StreamSource(xsdStream));

            Validator validator = schema.newValidator();

            validator.validate(new StreamSource((xmlStream)));

            return true;

        } catch (Exception e) {

            System.out.println("Error de validación XSD: " + e.getMessage());

            return false;
        }

    }

}