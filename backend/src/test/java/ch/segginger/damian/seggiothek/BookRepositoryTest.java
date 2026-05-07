package ch.segginger.damian.seggiothek;

import ch.segginger.damian.seggiothek.model.Book;
import ch.segginger.damian.seggiothek.model.Category;
import ch.segginger.damian.seggiothek.repository.BookRepository;
import ch.segginger.damian.seggiothek.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.boot.jpa.test.autoconfigure.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;


import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
class BookRepositoryTest {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TestEntityManager entityManager;

    private Category testCategory;
    private Book testBook;

    @BeforeEach
    void setUp() {
        testCategory = new Category();
        testCategory.setName("Science Fiction");
        categoryRepository.save(testCategory);

        testBook = new Book();
        testBook.setTitle("Dune");
        testBook.setAuthor("Frank Herbert");
        testBook.setCategory(testCategory);
        bookRepository.save(testBook);

        entityManager.flush();
        entityManager.clear();
    }

    @Test
    void testSaveBook() {
        Book book = new Book();
        book.setTitle("1984");
        book.setAuthor("George Orwell");
        book.setCategory(testCategory);

        Book saved = bookRepository.save(book);

        assertNotNull(saved.getId());
        assertEquals("1984", saved.getTitle());
        assertEquals("George Orwell", saved.getAuthor());
    }

    @Test
    void testFindById() {
        Optional<Book> found = bookRepository.findById(testBook.getId());

        assertTrue(found.isPresent());
        assertEquals("Dune", found.get().getTitle());
        assertEquals("Frank Herbert", found.get().getAuthor());
    }

    @Test
    void testFindById_NotFound() {
        Optional<Book> found = bookRepository.findById(999L);

        assertTrue(found.isEmpty());
    }

    @Test
    void testFindAll() {
        Book book2 = new Book();
        book2.setTitle("Foundation");
        book2.setAuthor("Isaac Asimov");
        book2.setCategory(testCategory);
        bookRepository.save(book2);

        List<Book> books = bookRepository.findAll();

        assertEquals(2, books.size());
    }

    @Test
    void testUpdateBook() {
        testBook.setTitle("Dune Updated");
        testBook.setAuthor("Frank Herbert Updated");

        Book updated = bookRepository.save(testBook);

        assertEquals("Dune Updated", updated.getTitle());
        assertEquals("Frank Herbert Updated", updated.getAuthor());
    }

    @Test
    void testDeleteBook() {
        Long bookId = testBook.getId();
        bookRepository.deleteById(bookId);

        Optional<Book> deleted = bookRepository.findById(bookId);

        assertTrue(deleted.isEmpty());
    }

    @Test
    void testBookWithCategory() {
        Optional<Book> found = bookRepository.findById(testBook.getId());

        assertTrue(found.isPresent());
        assertNotNull(found.get().getCategory());
        assertEquals("Science Fiction", found.get().getCategory().getName());
    }
}