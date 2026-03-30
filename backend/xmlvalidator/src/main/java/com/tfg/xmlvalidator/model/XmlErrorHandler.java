package com.tfg.xmlvalidator.model;

import org.xml.sax.*;

import java.util.ArrayList;
import java.util.List;

public class XmlErrorHandler implements ErrorHandler {

    private final List<XmlError> errors = new ArrayList<>();

    @Override
    public void warning(SAXParseException e) {
        errors.add(new XmlError(e.getLineNumber(), e.getColumnNumber(), e.getMessage()));
    }

    @Override
    public void error(SAXParseException e) {
        errors.add(new XmlError(e.getLineNumber(), e.getColumnNumber(), e.getMessage()));
    }

    @Override
    public void fatalError(SAXParseException e) throws SAXException {
        errors.add(new XmlError(e.getLineNumber(), e.getColumnNumber(), e.getMessage()));
        throw e; // corta el parseo
    }

    public List<XmlError> getErrors() {
        return errors;
    }
}