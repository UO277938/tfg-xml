package com.tfg.xmlvalidator.service;

import com.tfg.xmlvalidator.model.ValidationResult;
import com.tfg.xmlvalidator.model.XmlError;
import com.tfg.xmlvalidator.model.XmlErrorHandler;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;
import java.util.List;

public class DtdValidationService {

    public ValidationResult validateXML(String xmlContent) {

        try {

            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            factory.setValidating(true);
            factory.setNamespaceAware(true);

            DocumentBuilder builder = factory.newDocumentBuilder();

            XmlErrorHandler errorHandler = new XmlErrorHandler();
            builder.setErrorHandler(errorHandler);

            builder.setEntityResolver((publicId, systemId) -> {

                InputStream dtdStream = getClass()
                        .getClassLoader()
                        .getResourceAsStream("xml/articulo.dtd");
                return new org.xml.sax.InputSource(dtdStream);
            });


            InputSource is= new InputSource(new java.io.StringReader(xmlContent));

            builder.parse(is);

            boolean valid= false;
            if(errorHandler.getErrors().size()==0){
                valid=true;
            }

            return new ValidationResult(valid, errorHandler.getErrors());

        } catch (Exception e) {
            return new ValidationResult(false, List.of(
                    new XmlError(0,0,e.getMessage())
            ));
        }

    }

}