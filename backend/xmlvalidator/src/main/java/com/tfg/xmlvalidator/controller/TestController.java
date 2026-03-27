package com.tfg.xmlvalidator.controller;

import com.tfg.xmlvalidator.model.ValidationResult;
import com.tfg.xmlvalidator.service.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class TestController {

    @GetMapping("/validar-dtd")
    public String validarDTD() {

        DtdValidationService validator = new DtdValidationService();

        boolean valido = validator.validateXML();

        if (valido) {
            return "XML válido según DTD";
        } else {
            return "XML NO válido";
        }

    }

    @GetMapping("/validar-xsd")
    public String validarXSD() {

        XsdValidationService validator = new XsdValidationService();

        boolean valido = validator.validateXML();

        if (valido) {
            return "XML válido según XSD";
        } else {
            return "XML NO válido según XSD";
        }

    }

    @GetMapping("/generar-html")
    public String generarHTML() {

        XsltTransformationService service = new XsltTransformationService();

        service.transformXML(
                "src/main/resources/xml/ejemplo.xml",
                "src/main/resources/xml/transformacion.xslt",
                "src/main/resources/xml/output.html"
        );

        return "HTML generado correctamente";
    }

    @GetMapping("/validar-w3c")
    public String validarHTMLW3C() {

        W3cValidationService validator = new W3cValidationService();

        String result = validator.validateHTML(
                "src/main/resources/xml/output.html"
        );

        return result;
    }

    @GetMapping("/validar-documento")
    public ValidationResult validarDocumento() {

        XmlValidationPipelineService pipeline =
                new XmlValidationPipelineService();

        return pipeline.validateAll();
    }

}