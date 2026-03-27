package com.tfg.xmlvalidator.service;

import javax.xml.transform.Result;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;
import java.io.File;

public class XsltTransformationService {

    public void transformXML(String xmlPath, String xsltPath, String outputPath) {

        try {

            TransformerFactory factory = TransformerFactory.newInstance();

            Source xslt = new StreamSource(new File(xsltPath));
            Transformer transformer = factory.newTransformer(xslt);

            Source xml = new StreamSource(new File(xmlPath));

            Result output = new StreamResult(new File(outputPath));

            transformer.transform(xml, output);

            System.out.println("HTML generado correctamente");

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}