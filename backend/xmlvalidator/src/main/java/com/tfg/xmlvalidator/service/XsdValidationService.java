package com.tfg.xmlvalidator.service;

import com.tfg.xmlvalidator.model.ValidationResult;
import com.tfg.xmlvalidator.model.XmlError;
import com.tfg.xmlvalidator.model.XmlErrorHandler;

import javax.xml.XMLConstants;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;
import java.io.InputStream;
import java.io.StringReader;

import java.util.List;


public class XsdValidationService {

    public ValidationResult validateXML(String xmlContent) {

        try {

            SchemaFactory factory =
                    SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);

            InputStream xsdStream = getClass()
                    .getClassLoader()
                    .getResourceAsStream("xml/articulo.xsd");

            if (xsdStream == null) {
                throw new RuntimeException("No se encontró xml/articulo.xsd en resources");
            }

            String xmlForXsd = xmlContent.replaceAll("<!DOCTYPE[^>]*>", "");

            Schema schema = factory.newSchema(new StreamSource(xsdStream));
            Validator validator = schema.newValidator();

            XmlErrorHandler errorHandler = new XmlErrorHandler();
            validator.setErrorHandler(errorHandler);

            StreamSource xmlSource =
                    new StreamSource(new StringReader(xmlForXsd));

            validator.validate(xmlSource);

            return new ValidationResult(
                    errorHandler.getErrors().isEmpty(),
                    errorHandler.getErrors()
            );

        } catch (Exception e) {
            return new ValidationResult(false, List.of(
                    new XmlError(0,0,e.getMessage())
            ));
        }

    }

}