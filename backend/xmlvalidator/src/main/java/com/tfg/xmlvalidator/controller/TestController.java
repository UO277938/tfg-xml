package com.tfg.xmlvalidator.controller;

import com.tfg.xmlvalidator.model.ValidationResult;
import com.tfg.xmlvalidator.model.XmlRequest;
import com.tfg.xmlvalidator.service.*;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173/")
public class TestController {

    @PostMapping("/validar-dtd")
    public ResponseEntity<ValidationResult> validarDTD(@RequestBody XmlRequest request) {
        DtdValidationService validator = new DtdValidationService();
        ValidationResult result = validator.validateXML(request.getXml());
        return ResponseEntity.ok(result);
    }

    @PostMapping("/validar-xsd")
    public ResponseEntity<ValidationResult> validarXSD(@RequestBody XmlRequest request) {

        XsdValidationService validator = new XsdValidationService();
        ValidationResult result = validator.validateXML(request.getXml());
        return ResponseEntity.ok(result);
    }

    @PostMapping("/generar-html")
    public ResponseEntity<String> generarHTML(@RequestBody XmlRequest request) {

        XsltTransformationService service = new XsltTransformationService();
        String html = service.transformXML(request.getXml());
        return ResponseEntity.ok(html);
    }

    @PostMapping("/validar-w3c")
    public ResponseEntity<ValidationResult> validarHTMLW3C(@RequestBody XmlRequest request) {

        XsltTransformationService xsltService = new XsltTransformationService();
        String html = xsltService.transformXML(request.getXml());

        W3cValidationService validator = new W3cValidationService();

        ValidationResult result = validator.validateHTML(html);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/validar-documento")
    public ValidationResult validarDocumento() {

        XmlValidationPipelineService pipeline =
                new XmlValidationPipelineService();

        return pipeline.validateAll();
    }

}