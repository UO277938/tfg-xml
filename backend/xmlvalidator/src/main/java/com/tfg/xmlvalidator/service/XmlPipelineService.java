package com.tfg.xmlvalidator.service;

import com.tfg.xmlvalidator.model.PipelineResult;
import com.tfg.xmlvalidator.model.ValidationResult;

public class XmlPipelineService {

    private final DtdValidationService dtdValidationService;
    private final XsdValidationService xsdValidationService;
    private final XsltTransformationService xsltTransformationService;
    private final W3cValidationService w3cValidationService;

    public XmlPipelineService(
            DtdValidationService dtdValidationService,
            XsdValidationService xsdValidationService,
            XsltTransformationService xsltTransformationService,
            W3cValidationService w3cValidationService) {

        this.dtdValidationService = dtdValidationService;
        this.xsdValidationService = xsdValidationService;
        this.xsltTransformationService = xsltTransformationService;
        this.w3cValidationService = w3cValidationService;
    }

    public PipelineResult execute(String xml) {

        // 1. Validar XML
        ValidationResult dtdResult = dtdValidationService.validateXML(xml);
        ValidationResult xsdResult = xsdValidationService.validateXML(xml);
        // 2. Transformar
        ValidationResult transformationResult = xsltTransformationService.transformXML(xml);

        // 3. Validar HTML
        ValidationResult htmlResult = w3cValidationService.validateHTML(transformationResult.getHtml());
        // 4. devolver todo
        return new PipelineResult();
    }
}