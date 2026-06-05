package ch.segginger.damian.seggiothek.service;

import ch.segginger.damian.seggiothek.model.Book;
import ch.segginger.damian.seggiothek.model.Category;
import ch.segginger.damian.seggiothek.repository.BookRepository;
import ch.segginger.damian.seggiothek.repository.CategoryRepository;
import ch.segginger.damian.seggiothek.repository.LoanRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;
    private final LoanRepository loanRepository;

    public BookService(BookRepository bookRepository, CategoryRepository categoryRepository, LoanRepository loanRepository) {
        this.bookRepository = bookRepository;
        this.categoryRepository = categoryRepository;
        this.loanRepository = loanRepository;
    }

    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    public Optional<Book> findById(Long id) {
        return bookRepository.findById(id);
    }

    public Book create(Book book, Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        book.setCategory(category);
        return bookRepository.save(book);
    }

    public Book update(Long id, Book updated, Long categoryId) {
        Book existing = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        existing.setTitle(updated.getTitle());
        existing.setAuthor(updated.getAuthor());
        if (categoryId != null) {
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            existing.setCategory(category);
        }
        return bookRepository.save(existing);
    }

    public void delete(Long id) {
        loanRepository.deleteByBookId(id);
        bookRepository.deleteById(id);
    }
}