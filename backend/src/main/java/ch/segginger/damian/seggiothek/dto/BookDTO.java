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

    public BookDTO() {
    }

    public BookDTO(Long id, String title, String author, Long categoryId) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.categoryId = categoryId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
}