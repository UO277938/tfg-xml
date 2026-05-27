package com.tfg.xmlvalidator.service;

import com.tfg.xmlvalidator.model.ValidationResult;
import com.tfg.xmlvalidator.model.XmlError;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class W3cValidationService {

    public ValidationResult validateHTML(String htmlContent) {

        try {

            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();

            headers.setContentType(MediaType.TEXT_HTML);

            headers.set("User-Agent", "XMLValidatorTFG");
            headers.set("Accept", "application/json");

            HttpEntity<String> entity =
                    new HttpEntity<>(htmlContent, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    "https://validator.w3.org/nu/?out=json",
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            String body = response.getBody();

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(body);

            List<XmlError> errors = new ArrayList<>();

            JsonNode messages = root.get("messages");

            if (messages != null) {

                for (JsonNode msg : messages) {

                    String type = msg.has("type")
                            ? msg.get("type").asText()
                            : "unknown";

                    // solo errores
                    if ("error".equals(type)) {

                        int line = msg.has("lastLine")
                                ? msg.get("lastLine").asInt()
                                : 0;

                        int col = msg.has("firstColumn")
                                ? msg.get("firstColumn").asInt()
                                : 0;

                        String message = msg.has("message")
                                ? msg.get("message").asText()
                                : "Error desconocido";

                        errors.add(new XmlError(line, col, message));
                    }
                }
            }

            return new ValidationResult(
                    errors.isEmpty(),
                    errors
            );

        } catch (Exception e) {

            return new ValidationResult(
                    false,
                    List.of(new XmlError(
                            0,
                            0,
                            "Error validando con W3C: " + e.getMessage()
                    ))
            );
        }

    }

}