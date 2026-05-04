package ch.segginger.damian.seggiothek.controller;

import ch.segginger.damian.seggiothek.dto.BookDTO;
import ch.segginger.damian.seggiothek.model.Book;
import ch.segginger.damian.seggiothek.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PreAuthorize("hasRole('ROLE_read')")
    @GetMapping("/hello")
    public String hello(){
        return "Hello";
    }


    @GetMapping
    public ResponseEntity<List<BookDTO>> getAll() {
        List<BookDTO> dtos = bookService.findAll().stream()
                .map(b -> {
                    BookDTO dto = new BookDTO();
                    dto.setId(b.getId());
                    dto.setTitle(b.getTitle());
                    dto.setAuthor(b.getAuthor());
                    if (b.getCategory() != null) {
                        dto.setCategoryId(b.getCategory().getId());
                    }
                    return dto;
                })
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookDTO> getById(@PathVariable Long id) {
        return bookService.findById(id)
                .map(b -> {
                    BookDTO dto = new BookDTO();
                    dto.setId(b.getId());
                    dto.setTitle(b.getTitle());
                    dto.setAuthor(b.getAuthor());
                    if (b.getCategory() != null) {
                        dto.setCategoryId(b.getCategory().getId());
                    }
                    return ResponseEntity.ok(dto);
                })
                .orElse(ResponseEntity.notFound().build());
    }

        @PreAuthorize("hasAuthority('ROLE_admin')")
        @PostMapping
        public ResponseEntity<BookDTO> create(@RequestBody BookDTO dto) {
            Book book = new Book();
            book.setTitle(dto.getTitle());
            book.setAuthor(dto.getAuthor());
            Book saved = bookService.create(book, dto.getCategoryId());
            BookDTO result = new BookDTO();
            result.setId(saved.getId());
            result.setTitle(saved.getTitle());
            result.setAuthor(saved.getAuthor());
            if (saved.getCategory() != null) {
                result.setCategoryId(saved.getCategory().getId());
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        }

        @PreAuthorize("hasAuthority('ROLE_admin')")
        @PutMapping("/{id}")
        public ResponseEntity<BookDTO> update(@PathVariable Long id, @RequestBody BookDTO dto) {
            Book updated = new Book();
            updated.setTitle(dto.getTitle());
            updated.setAuthor(dto.getAuthor());
            Book saved = bookService.update(id, updated, dto.getCategoryId());
            BookDTO result = new BookDTO();
            result.setId(saved.getId());
            result.setTitle(saved.getTitle());
            result.setAuthor(saved.getAuthor());
            if (saved.getCategory() != null) {
                result.setCategoryId(saved.getCategory().getId());
            }
            return ResponseEntity.ok(result);
        }

        @PreAuthorize("hasAuthority('ROLE_admin')")
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> delete(@PathVariable Long id) {
            bookService.delete(id);
            return ResponseEntity.noContent().build();
        }
    }


