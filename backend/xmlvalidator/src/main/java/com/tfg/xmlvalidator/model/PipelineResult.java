package com.tfg.xmlvalidator.model;

import java.util.List;

public class PipelineResult {
    private boolean success;
    private String fase;
    private List<XmlError> errores;
    private String html;

    public PipelineResult(
            boolean success,
            String fase,
            List<XmlError> errores,
            String html) {

        this.success = success;
        this.fase = fase;
        this.errores = errores;
        this.html = html;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getFase() {
        return fase;
    }

    public List<XmlError> getErrores() {
        return errores;
    }

    public String getHtml() {
        return html;
    }
}

