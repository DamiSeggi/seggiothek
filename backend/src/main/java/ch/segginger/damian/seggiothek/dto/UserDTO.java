package ch.segginger.damian.seggiothek.dto;

import ch.segginger.damian.seggiothek.model.User;

import io.swagger.v3.oas.annotations.media.Schema;

public class UserDTO {

    @Schema(description = "ID des Users", example = "1")
    private Long id;

    @Schema(description = "Keycloak ID des Users", example = "a3f1-9b2c-xyz")
    private String keycloakId;

    @Schema(description = "Name des Users", example = "admin")
    private String name;

    @Schema(description = "Username", example = "admin")
    private String username;

    public UserDTO() {
    }

    public UserDTO(Long id, String keycloakId, String name, String username) {
        this.id = id;
        this.keycloakId = keycloakId;
        this.name = name;
        this.username = username;
    }

    public static UserDTO from(User user) {
        return new UserDTO(
                user.getId(),
                user.getKeycloakId(),
                user.getName(),
                user.getUsername()
        );
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKeycloakId() {
        return keycloakId;
    }

    public void setKeycloakId(String keycloakId) {
        this.keycloakId = keycloakId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}