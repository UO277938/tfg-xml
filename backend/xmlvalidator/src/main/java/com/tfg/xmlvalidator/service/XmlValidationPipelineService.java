package com.tfg.xmlvalidator.service;

import com.tfg.xmlvalidator.model.ValidationResult;

public class XmlValidationPipelineService {

    public ValidationResult validateAll() {

        String xml = "src/main/resources/xml/ejemplo.xml";
        String xsd = "src/main/resources/xml/articulo.xsd";
        String xslt = "src/main/resources/xml/transformacion.xslt";
        String html = "src/main/resources/xml/output.html";

        ValidationResult result = new ValidationResult();

        DtdValidationService dtdService = new DtdValidationService();
        XsdValidationService xsdService = new XsdValidationService();
        XsltTransformationService xsltService = new XsltTransformationService();
        W3cValidationService w3cService = new W3cValidationService();

        boolean dtdValid = dtdService.validateXML();
        result.setDtdValid(dtdValid);

        boolean xsdValid = xsdService.validateXML();
        result.setXsdValid(xsdValid);

        if (dtdValid && xsdValid) {

            xsltService.transformXML(xml, xslt, html);
            result.setHtmlGenerated(true);

            String w3c = w3cService.validateHTML(html);
            result.setW3cResponse(w3c);
            //completar mensaje recibido del w3c

        } else {

            result.setHtmlGenerated(false);
            result.setW3cResponse("HTML no generado por errores en XML");

        }

        return result;
    }
}