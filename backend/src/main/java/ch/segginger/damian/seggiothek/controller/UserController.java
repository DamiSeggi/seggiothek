package ch.segginger.damian.seggiothek.controller;

import ch.segginger.damian.seggiothek.dto.UserDTO;
import ch.segginger.damian.seggiothek.model.User;
import ch.segginger.damian.seggiothek.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@Tag(name = "User API", description = "Verwaltung von Benutzern")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(
            summary = "Aktuellen Benutzer abrufen",
            description = "Lädt den aktuell angemeldeten Benutzer"
    )
    @PreAuthorize("hasRole('ROLE_read')")
    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(
            @AuthenticationPrincipal Jwt jwt) {

        String keycloakId = jwt.getSubject();  // Die "sub" aus dem JWT
        String username = jwt.getClaimAsString("preferred_username");
        String name = jwt.getClaimAsString("name");

        // User wird hier erstellt/aktualisiert
        User user = userService.findOrCreateUser(keycloakId, name, username);

        return ResponseEntity.ok(UserDTO.from(user));
    }

    @Operation(
            summary = "Benutzer anhand der ID abrufen",
            description = "Lädt einen Benutzer aus der Datenbank"
    )
    @PreAuthorize("hasRole('ROLE_admin')")
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return userService.findById(id)
                .map(user -> ResponseEntity.ok(UserDTO.from(user)))
                .orElse(ResponseEntity.notFound().build());
    }
}