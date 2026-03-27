package com.tfg.xmlvalidator.model;

public class ValidationResult {

    private boolean dtdValid;
    private boolean xsdValid;
    private boolean htmlGenerated;
    private String w3cResponse;

    public boolean isDtdValid() {
        return dtdValid;
    }

    public void setDtdValid(boolean dtdValid) {
        this.dtdValid = dtdValid;
    }

    public boolean isXsdValid() {
        return xsdValid;
    }

    public void setXsdValid(boolean xsdValid) {
        this.xsdValid = xsdValid;
    }

    public boolean isHtmlGenerated() {
        return htmlGenerated;
    }

    public void setHtmlGenerated(boolean htmlGenerated) {
        this.htmlGenerated = htmlGenerated;
    }

    public String getW3cResponse() {
        return w3cResponse;
    }

    public void setW3cResponse(String w3cResponse) {
        this.w3cResponse = w3cResponse;
    }

    public String toString(){

        return "";
    }
}