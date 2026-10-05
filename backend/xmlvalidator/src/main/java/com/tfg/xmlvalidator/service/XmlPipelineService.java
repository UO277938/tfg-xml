package com.tfg.xmlvalidator.service;

import com.tfg.xmlvalidator.model.PipelineResult;
import com.tfg.xmlvalidator.model.ValidationResult;

import com.tfg.xmlvalidator.model.XmlError;
import org.springframework.stereotype.Service;

import java.util.List;

public class XmlPipelineService {

    private final DtdValidationService dtdValidationService;
    private final XsdValidationService xsdValidationService;
    private final XsltTransformationService xsltTransformationService;
    private final W3cValidationService w3cValidationService;

    private final TranslationService translationService;

    public XmlPipelineService(
            DtdValidationService dtdValidationService,
            XsdValidationService xsdValidationService,
            XsltTransformationService xsltTransformationService,
            W3cValidationService w3cValidationService,
            TranslationService translationService) {

        this.dtdValidationService = dtdValidationService;
        this.xsdValidationService = xsdValidationService;
        this.xsltTransformationService = xsltTransformationService;
        this.w3cValidationService = w3cValidationService;
        this.translationService = translationService;
    }

    public PipelineResult execute(String xml, String idioma) {

        // 1.Validar XML
        ValidationResult dtdResult = dtdValidationService.validateXML(xml);
        if (!dtdResult.isValid()) {
            return new PipelineResult(
                    false,
                    "DTD",
                    //dtdResult.getErrors(),
                    translateErrors(dtdResult.getErrors(), idioma),
                    null
            );
        }
        ValidationResult xsdResult = xsdValidationService.validateXML(xml);
        if (!xsdResult.isValid()) {
            return new PipelineResult(
                    false,
                    "XSD",
                    translateErrors(xsdResult.getErrors(), idioma),
                    null
            );
        }
        // 2.Transformar
        ValidationResult transformationResult = xsltTransformationService.transformXML(xml);
        if (!transformationResult.isValid()) {
            return new PipelineResult(
                    false,
                    "Transformation XSLT",
                    translateErrors(transformationResult.getErrors(), idioma),
                    null
            );
        }
        // 3.Validar HTML
        ValidationResult htmlResult = w3cValidationService.validateHTML(transformationResult.getHtml());
        if (!htmlResult.isValid()) {
            return new PipelineResult(
                    false,
                    "W3C",
                    //htmlResult.getErrors(),
                    translateErrors(htmlResult.getErrors(), idioma),
                    transformationResult.getHtml()
            );
        }
        // Return
        return new PipelineResult(
                true,
                "W3C",
                null,
                transformationResult.getHtml()
        );
    }

    private List<XmlError> translateErrors(List<XmlError> errors, String idioma) {

        return errors.stream()
                .map(error -> new XmlError(
                        error.getLine(),
                        error.getColumn(),
                        translationService.translate(
                                error.getMessage(),
                                "en",
                                idioma
                        )
                ))
                .toList();
    }
}