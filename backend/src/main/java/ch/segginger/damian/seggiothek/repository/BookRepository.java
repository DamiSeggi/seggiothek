package ch.segginger.damian.seggiothek.repository;

import ch.segginger.damian.seggiothek.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
}
