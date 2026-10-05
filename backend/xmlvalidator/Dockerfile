FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

RUN ls -la

RUN chmod +x mvnw && ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["sh", "-c", "java -jar target/*.jar"]