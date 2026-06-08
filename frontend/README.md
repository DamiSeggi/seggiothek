# Seggiothek – Frontend

Angular Application zur digitalen Bibliotheksverwaltung. Bücher durchsuchen, ausleihen und zurückgeben - abgesichert mit Keycloak.

---

## Voraussetzungen

- Node.js
- npm
- Keycloak (Port 8081)
- Spring Boot Backend (Port 9090)

---

## Anwendung starten

### 1. Keycloak starten
```bash
kc.bat start-dev --http-port 8081
```
**Realm, Rollen, User gemäss Dokumentation (Oder realm-export.json unter keycloak im Source)**

### 2. Backend starten
Spring Boot muss laufen auf Port 9090.

### 3. Frontend starten
```bash
npm start
```

---

## URLs

| Service       | URL                        |
|---------------|----------------------------|
| Frontend      | http://localhost:4200      |
| Backend       | http://localhost:9090      |
| Keycloak      | http://localhost:8081      |

---

## Authentifizierung

Keycloak ist mit `onLoad: 'login-required'` konfiguriert. Beim Start der App wird der Benutzer automatisch zur Keycloak Login-Seite weitergeleitet.

Der JWT Token wird via `includeBearerTokenInterceptor` automatisch an alle Requests an `localhost:9090` angehängt.

---

## Testbenutzer

| Benutzer | Rollen                              |
|----------|-------------------------------------|
| admin    | ROLE_read, ROLE_admin, ROLE_update  |
| user     | ROLE_read, ROLE_update              |

---

## Tests ausführen

```bash
npm test
```

Getestet mit Vitest:
- `book.service.spec.ts` – 3 Tests (getAll, getById, delete)
- `books.component.spec.ts` – 2 Tests (Rendering, Navigation)

---

## Konfiguration

Keycloak-Konfiguration in `app.config.ts`:

```typescript
provideKeycloak({
  config: {
    url: 'http://localhost:8081',
    realm: 'ILV',
    clientId: 'demoapp'
  },
  initOptions: {
    onLoad: 'login-required'
  }
})
```

---

## GitHub

https://github.com/DamiSeggi/seggiothek