package com.tfg.xmlvalidator.service;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TranslationService {

    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String translate(String text, String source, String target) {
        try {
            return translateOutsideQuotes(text, source, target);

        } catch (Exception e) {
            throw new RuntimeException(
                    "No se pudo traducir el texto: " + e.getMessage(),
                    e
            );
        }
    }

    private String translateOutsideQuotes(
            String text,
            String source,
            String target) throws Exception {

        Pattern pattern = Pattern.compile("\"[^\"]*\"");
        Matcher matcher = pattern.matcher(text);

        StringBuilder result = new StringBuilder();

        int lastPosition = 0;

        while (matcher.find()) {

            //parte anterior a las comillas
            String textBeforeQuotes =
                    text.substring(lastPosition, matcher.start());

            if (!textBeforeQuotes.isBlank()) {
                result.append(
                        translateText(
                                textBeforeQuotes,
                                source,
                                target
                        )
                );
            } else {
                result.append(textBeforeQuotes);
            }

            //las comillas y su contenido
            result.append(matcher.group());

            lastPosition = matcher.end();
        }

        //parte posterior a las comillas
        String remainingText = text.substring(lastPosition);

        if (!remainingText.isBlank()) {
            result.append(
                    translateText(
                            remainingText,
                            source,
                            target
                    )
            );
        } else {
            result.append(remainingText);
        }

        return result.toString();
    }

    private String translateText(
            String text,
            String source,
            String target) throws Exception {

        String json = """
                {
                    "q": "%s",
                    "source": "%s",
                    "target": "%s",
                    "format": "text"
                }
                """.formatted(
                escapeJson(text),
                source,
                target
        );

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:5000/translate"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();

        HttpResponse<String> response = httpClient.send(
                request,
                HttpResponse.BodyHandlers.ofString()
        );

        if (response.statusCode() != 200) {
            throw new RuntimeException(
                    "Error de LibreTranslate. Código: "
                            + response.statusCode()
                            + " - "
                            + response.body()
            );
        }

        return extractTranslatedText(response.body());
    }

    private String extractTranslatedText(String body) {
        try {
            JsonNode json = objectMapper.readTree(body);

            JsonNode translatedTextNode = json.get("translatedText");

            if (translatedTextNode == null) {
                throw new RuntimeException(
                        "La respuesta de LibreTranslate no contiene translatedText: " + body
                );
            }

            return objectMapper.treeToValue(translatedTextNode, String.class) + " ";

        } catch (Exception e) {
            throw new RuntimeException(
                    "Respuesta inesperada de LibreTranslate: " + body,
                    e
            );
        }
    }

    private String escapeJson(String text) {

        return text
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r");
    }
}
