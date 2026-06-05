package ch.segginger.damian.seggiothek.service;

import ch.segginger.damian.seggiothek.model.Book;
import ch.segginger.damian.seggiothek.model.Category;
import ch.segginger.damian.seggiothek.repository.BookRepository;
import ch.segginger.damian.seggiothek.repository.CategoryRepository;
import ch.segginger.damian.seggiothek.repository.LoanRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final BookRepository bookRepository;
    private final LoanRepository loanRepository;

    public CategoryService(CategoryRepository categoryRepository, BookRepository bookRepository, LoanRepository loanRepository) {
        this.categoryRepository = categoryRepository;
        this.bookRepository = bookRepository;
        this.loanRepository = loanRepository;
    }

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Optional<Category> findById(Long id) {
        return categoryRepository.findById(id);
    }

    public Category create(Category category) {
        return categoryRepository.save(category);
    }

    public Category update(Long id, Category updated) {
        Category existing = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        return categoryRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        List<Book> books = bookRepository.findByCategoryId(id);
        for (Book book : books) {
            loanRepository.deleteByBookId(book.getId());
        }
        bookRepository.deleteByCategoryId(id);
        categoryRepository.deleteById(id);
    }
}