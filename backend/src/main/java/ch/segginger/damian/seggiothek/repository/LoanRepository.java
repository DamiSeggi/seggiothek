package ch.segginger.damian.seggiothek.repository;

import ch.segginger.damian.seggiothek.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findByUserId(Long userId);
    boolean existsByBookIdAndReturnedFalse(Long bookId);
    void deleteByBookId(Long bookId);
}
