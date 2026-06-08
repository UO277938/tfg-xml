package com.tfg.xmlvalidator.service;

import com.tfg.xmlvalidator.model.ValidationResult;
import com.tfg.xmlvalidator.model.XmlError;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.io.*;
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

            System.out.println("=== W3C RAW RESPONSE ===");
            System.out.println(body);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(body);

            List<XmlError> errors = new ArrayList<>();

            JsonNode messages = root.get("messages");

            if (messages.isArray()) {
                for (JsonNode msg : messages) {
                    System.out.println("ENTRA");
                    String type = msg.path("type").asText("");

                    if ("error".equals(type) || "info".equals(type)) {

                        int line = msg.path("lastLine").asInt(0);
                        int col = msg.path("firstColumn").asInt(0);
                        String message = msg.path("message").asText("Unknown W3C message");

                        errors.add(new XmlError(line, col, "[" + type + "] " + message));
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
                    List.of(new XmlError(0, 0, "Error validando con W3C: " + e.getMessage()
                    ))
            );
        }

    }

}