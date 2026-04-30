package ch.segginger.damian.seggiothek.service;

import ch.segginger.damian.seggiothek.model.Book;
import ch.segginger.damian.seggiothek.model.Loan;
import ch.segginger.damian.seggiothek.model.User;
import ch.segginger.damian.seggiothek.repository.BookRepository;
import ch.segginger.damian.seggiothek.repository.LoanRepository;
import ch.segginger.damian.seggiothek.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LoanService {

    private final LoanRepository loanRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    public LoanService(LoanRepository loanRepository,
                       UserRepository userRepository,
                       BookRepository bookRepository) {
        this.loanRepository = loanRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    public Loan createLoan(Long bookId, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User nicht gefunden"));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book nicht gefunden"));

        Loan loan = new Loan();
        loan.setUser(user);
        loan.setBook(book);

        return loanRepository.save(loan);
    }

    public List<Loan> getLoansByUser(Long userId) {
        return loanRepository.findByUserId(userId);
    }

    public Loan getLoanById(Long id) {
        return loanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Loan nicht gefunden"));
    }
}