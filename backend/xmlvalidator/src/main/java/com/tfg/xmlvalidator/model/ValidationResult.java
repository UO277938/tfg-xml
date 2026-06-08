package com.tfg.xmlvalidator.model;

import java.util.List;

public class ValidationResult {

    private boolean valid;
    private List<XmlError> errors;
    private String html;

    public ValidationResult(boolean valid, List<XmlError> errors){
        this.valid=valid;
        this.errors=errors;
    }

    public ValidationResult(boolean valid, List<XmlError> errors, String html){
        this.valid=valid;
        this.errors=errors;
        this.html = html;
    }

    public boolean isValid(){
        return valid;
    }

    public List<XmlError> getErrors(){
        return errors;
    }

    public String getHtml() { return html;}
}