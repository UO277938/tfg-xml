package com.tfg.xmlvalidator.service;

import com.tfg.xmlvalidator.model.ValidationResult;
import com.tfg.xmlvalidator.model.XmlError;

import javax.xml.transform.ErrorListener;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

import java.io.InputStream;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

public class XsltTransformationService {

    public ValidationResult transformXML(String xmlContent) {
        List<XmlError> errors = new ArrayList<>();
        try {

            InputStream xsltStream = getClass()
                    .getClassLoader()
                    .getResourceAsStream("xml/transformacion.xslt");

            if (xsltStream == null) {
                throw new RuntimeException("No se encontró transformacion.xslt");
            }

            xmlContent = xmlContent.replaceAll("<!DOCTYPE[^>]*>", "");

            TransformerFactory factory =
                    TransformerFactory.newInstance();

            Transformer transformer =
                    factory.newTransformer(
                            new StreamSource(xsltStream)
                    );

            transformer.setErrorListener(new ErrorListener() {

                @Override
                public void warning(TransformerException e) {
                    errors.add(new XmlError(0, 0, e.getMessage()));
                }

                @Override
                public void error(TransformerException e) {
                    errors.add(new XmlError(0, 0, e.getMessage()));
                }

                @Override
                public void fatalError(TransformerException e)
                        throws TransformerException {

                    errors.add(new XmlError(0, 0, e.getMessage()));
                    throw e;
                }
            });

            StringWriter writer = new StringWriter();

            transformer.transform(
                    new StreamSource(
                            new StringReader(xmlContent)
                    ),
                    new StreamResult(writer)
            );

            return new ValidationResult(
                    errors.isEmpty(),
                    errors,
                    writer.toString()
            );

        } catch (Exception e) {

            return new ValidationResult(
                    false,
                    List.of(
                            new XmlError(
                                    0,
                                    0,
                                    "Error transformando XML a HTML: " + e.getMessage()
                            )
                    ),
                    null
            );
        }
    }
}