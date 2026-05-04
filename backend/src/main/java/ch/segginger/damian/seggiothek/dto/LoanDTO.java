package ch.segginger.damian.seggiothek.dto;

import java.time.LocalDate;

public class LoanDTO {

    private Long id;
    private Long bookId;
    private Long userId;
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

    public boolean isReturned() { return returned; }

    public void setReturned(boolean returned) { this.returned = returned; }
}