package com.tfg.xmlvalidator.controller;

import com.tfg.xmlvalidator.model.ValidationResult;
import com.tfg.xmlvalidator.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173/")
public class TestController {

    @PostMapping("/validar-dtd")
    public ResponseEntity<?> validarDTD(@RequestParam("file") MultipartFile file) {

        try {
            String xmlContent = new String(file.getBytes(), StandardCharsets.UTF_8);
            DtdValidationService validator = new DtdValidationService();

            ValidationResult result = validator.validateXML(xmlContent);

            return ResponseEntity.ok(result);

        } catch (IOException e) {
            return ResponseEntity.status(
                    HttpStatus.INTERNAL_SERVER_ERROR).body(
                            "Error leyendo el archivo");
        }



    }

    @PostMapping("/validar-xsd")
    public String validarXSD() {

        XsdValidationService validator = new XsdValidationService();

        boolean valido = validator.validateXML();

        if (valido) {
            return "XML válido según XSD";
        } else {
            return "XML NO válido según XSD";
        }

    }

    @PostMapping("/generar-html")
    public String generarHTML() {

        XsltTransformationService service = new XsltTransformationService();

        service.transformXML(
                "src/main/resources/xml/ejemplo.xml",
                "src/main/resources/xml/transformacion.xslt",
                "src/main/resources/xml/output.html"
        );

        return "HTML generado correctamente";
    }

    @PostMapping("/validar-w3c")
    public String validarHTMLW3C() {

        W3cValidationService validator = new W3cValidationService();

        String result = validator.validateHTML(
                "src/main/resources/xml/output.html"
        );

        return result;
    }

    @PostMapping("/validar-documento")
    public ValidationResult validarDocumento() {

        XmlValidationPipelineService pipeline =
                new XmlValidationPipelineService();

        return pipeline.validateAll();
    }

}