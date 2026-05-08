# Seggiothek – Backend

Digitale Bibliotheksverwaltung mit Spring Boot. Bücher verwalten, Kategorien organisieren und Ausleihvorgänge durchführen – abgesichert mit Keycloak.

---

## Voraussetzungen

- Java 21+
- Maven
- PostgreSQL
- Keycloak

---

## Anwendung starten

### 1. PostgreSQL starten
Datenbank `seggiothek` muss vorhanden sein.

### 2. Keycloak starten
```bash
kc.bat start-dev --http-port 8081
```
**Realm, Rollen, User gemäss Dokumentation**

### 3. Spring Boot starten
```bash
./mvnw spring-boot:run
```
Oder direkt über `BackendApplication.java` in der IDE.

---

## URLs

| Service       | URL                                          |
|---------------|----------------------------------------------|
| Backend       | http://localhost:9090                        |
| Swagger UI    | http://localhost:9090/swagger-ui.html        |
| Keycloak      | http://localhost:8081                        |

---

## Authentifizierung

JWT Token via Postman holen:

```
POST http://localhost:8081/realms/ILV/protocol/openid-connect/token
```

| Key          | Value      |
|--------------|------------|
| client_id    | demoapp    |
| username     | admin      |
| password     | admin      |
| grant_type   | password   |

Token in Swagger unter **Authorize** einfügen.

---

## Testbenutzer

| Benutzer | Rollen                        |
|----------|-------------------------------|
| admin    | ROLE_read, ROLE_admin, ROLE_update |
| user     | ROLE_read, ROLE_update        |

---

## Tests ausführen

```bash
./mvnw test
```

---

## Konfiguration

Umgebungsvariablen in `application.yml`:

```yaml
DB_URL: jdbc:postgresql://localhost:5432/seggiothek
DB_USER: postgres
DB_PASSWORD: test
```