package com.tfg.xmlvalidator.model;

import java.util.List;

public class ValidationResult {

    private boolean valid;
    private List<XmlError> errors;

    public ValidationResult(boolean valid, List<XmlError> errors){
        this.valid=valid;
        this.errors=errors;
    }

    public boolean isValid(){
        return valid;
    }

    public List<XmlError> getErrors(){
        return errors;
    }
}