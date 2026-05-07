package ch.segginger.damian.seggiothek.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public class CategoryDTO {

    @Schema(description = "ID der Kategorie", example = "1")
    private Long id;

    @Schema(description = "Name der Kategorie", example = "Fantasy")
    private String name;

    @Schema(description = "Beschreibung der Kategorie", example = "Fantasy Bücher und Romane")
    private String description;

    public CategoryDTO() {
    }

    public CategoryDTO(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}