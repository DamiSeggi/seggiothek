package ch.segginger.damian.seggiothek.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;

public class LoanDTO {

    @Schema(description = "ID der Ausleihe", example = "1")
    private Long id;

    @Schema(description = "ID des ausgeliehenen Buches", example = "5")
    private Long bookId;

    @Schema(description = "ID des Benutzers", example = "2")
    private Long userId;

    @Schema(description = "Gibt an ob das Buch zurückgegeben wurde", example = "false")
    private boolean returned;

    public LoanDTO() {
    }

    public LoanDTO(Long id, LocalDate loanDate, LocalDate dueDate, LocalDate returnDate, Long bookId, Long userId) {
        this.id = id;
        this.bookId = bookId;
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public boolean isReturned() {
        return returned;
    }

    public void setReturned(boolean returned) {
        this.returned = returned;
    }
}