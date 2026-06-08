package ch.segginger.damian.seggiothek.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public class BookDTO {

    @Schema(description = "ID des Buches", example = "1")
    private Long id;

    @Schema(description = "Titel des Buches", example = "Harry Potter")
    private String title;

    @Schema(description = "Autor des Buches", example = "J.K. Rowling")
    private String author;

    @Schema(description = "ID der Kategorie", example = "2")
    private Long categoryId;

    @Schema(description = "Verfügbarkeit des Buches", example = "true")
    private boolean available;

    public BookDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
}