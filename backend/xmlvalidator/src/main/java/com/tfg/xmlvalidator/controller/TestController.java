package com.tfg.xmlvalidator.controller;

import com.tfg.xmlvalidator.model.PipelineResult;
import com.tfg.xmlvalidator.model.ValidationResult;
import com.tfg.xmlvalidator.model.XmlRequest;
import com.tfg.xmlvalidator.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<ValidationResult> generarHTML(@RequestBody XmlRequest request) {

        XsltTransformationService service = new XsltTransformationService();
        ValidationResult result = service.transformXML(request.getXml());
        return ResponseEntity.ok(result);
    }

    @PostMapping("/validar-w3c")
    public ResponseEntity<ValidationResult> validarHTMLW3C(@RequestBody XmlRequest request) {
        System.out.println("ENTRA EN W3C");
        XsltTransformationService xsltService = new XsltTransformationService();
        ValidationResult html = xsltService.transformXML(request.getXml());
        if(html.isValid()) {
            W3cValidationService validator = new W3cValidationService();

            ValidationResult result = validator.validateHTML(html.getHtml());
            System.out.println("SALE DE W3C");

            return ResponseEntity.ok(result);
        }
        else{
            return ResponseEntity.ok(html);
        }
    }

    @PostMapping("/pipeline")
    public ResponseEntity<PipelineResult> process(@RequestBody XmlRequest request) {
        DtdValidationService dtdValidationService = new DtdValidationService();
        XsdValidationService xsdValidationService = new XsdValidationService();
        XsltTransformationService xsltService = new XsltTransformationService();
        W3cValidationService w3cValidationService = new W3cValidationService();
        TranslationService translationService1 = new TranslationService();
        XmlPipelineService pipelineService = new XmlPipelineService(
                dtdValidationService, xsdValidationService, xsltService, w3cValidationService, translationService);

        return ResponseEntity.ok(
                pipelineService.execute(request.getXml(), request.getIdioma())
        );
    }

    private final TranslationService translationService = new TranslationService();

    @GetMapping("/test-translation")
    public String testTranslation() {
        return translationService.translate(
                "This is a test",
                "en",
                "es"
        );
    }

}