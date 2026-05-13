FROM eclipse-temurin:25-jdk-alpine AS build
WORKDIR /app
COPY . .
RUN chmod +x mvnw || true
# Si mvnw n'existe pas, on utilise mvn directement si possible ou on le crée
# Pour simplifier, on assume que mvnw sera là ou on utilise une image maven
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:25-jre-alpine
RUN apk add --no-cache curl
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8090
ENTRYPOINT ["java", "-jar", "app.jar"]
