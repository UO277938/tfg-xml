package com.tfg.xmlvalidator.service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

public class W3cValidationService {

    public String validateHTML(String htmlPath) {

        try {

            File htmlFile = new File(htmlPath);

            URL url = new URL("https://validator.w3.org/nu/?out=json");

            HttpURLConnection connection =
                    (HttpURLConnection) url.openConnection();

            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "text/html; charset=utf-8");
            connection.setDoOutput(true);

            OutputStream os = connection.getOutputStream();

            FileInputStream fis = new FileInputStream(htmlFile);

            byte[] buffer = new byte[1024];
            int bytesRead;

            while ((bytesRead = fis.read(buffer)) != -1) {
                os.write(buffer, 0, bytesRead);
            }

            fis.close();
            os.close();

            BufferedReader reader =
                    new BufferedReader(
                            new InputStreamReader(connection.getInputStream())
                    );

            String line;
            StringBuilder response = new StringBuilder();

            while ((line = reader.readLine()) != null) {
                response.append(line);
            }

            reader.close();

            return response.toString();

        } catch (Exception e) {
            return "Error validando HTML: " + e.getMessage();
        }

    }

}