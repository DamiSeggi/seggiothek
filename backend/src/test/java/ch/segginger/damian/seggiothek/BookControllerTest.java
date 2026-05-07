package ch.segginger.damian.seggiothek;

import ch.segginger.damian.seggiothek.controller.BookController;
import ch.segginger.damian.seggiothek.model.Book;
import ch.segginger.damian.seggiothek.service.BookService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class BookControllerTest {

    private MockMvc mockMvc;
    private BookService bookService;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        bookService = Mockito.mock(BookService.class);
        BookController bookController = new BookController(bookService);
        mockMvc = MockMvcBuilders.standaloneSetup(bookController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void testGetAll() throws Exception {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Dune");
        book.setAuthor("Frank Herbert");

        Mockito.when(bookService.findAll()).thenReturn(List.of(book));

        mockMvc.perform(get("/api/v1/books"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].title").value("Dune"))
                .andExpect(jsonPath("$[0].author").value("Frank Herbert"));

        verify(bookService).findAll();
    }

    @Test
    void testGetById() throws Exception {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Dune");
        book.setAuthor("Frank Herbert");

        Mockito.when(bookService.findById(1L)).thenReturn(Optional.of(book));

        mockMvc.perform(get("/api/v1/books/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Dune"))
                .andExpect(jsonPath("$.author").value("Frank Herbert"));

        verify(bookService).findById(1L);
    }

    @Test
    void testGetById_NotFound() throws Exception {
        Mockito.when(bookService.findById(999L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/v1/books/999"))
                .andExpect(status().isNotFound());

        verify(bookService).findById(999L);
    }

    @Test
    void testCreate() throws Exception {
        Book book = new Book();
        book.setTitle("Dune");
        book.setAuthor("Frank Herbert");

        Book savedBook = new Book();
        savedBook.setId(1L);
        savedBook.setTitle("Dune");
        savedBook.setAuthor("Frank Herbert");

        Mockito.when(bookService.create(any(Book.class), any())).thenReturn(savedBook);

        mockMvc.perform(post("/api/v1/books")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(book)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Dune"))
                .andExpect(jsonPath("$.author").value("Frank Herbert"));

        verify(bookService).create(any(Book.class), any());
    }

    @Test
    void testUpdate() throws Exception {
        Book book = new Book();
        book.setTitle("Dune Updated");
        book.setAuthor("Frank Herbert");

        Book updatedBook = new Book();
        updatedBook.setId(1L);
        updatedBook.setTitle("Dune Updated");
        updatedBook.setAuthor("Frank Herbert");

        Mockito.when(bookService.update(eq(1L), any(Book.class), any())).thenReturn(updatedBook);

        mockMvc.perform(put("/api/v1/books/1")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(book)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Dune Updated"))
                .andExpect(jsonPath("$.author").value("Frank Herbert"));

        verify(bookService).update(eq(1L), any(Book.class), any());
    }

    @Test
    void testDelete() throws Exception {
        Mockito.doNothing().when(bookService).delete(1L);

        mockMvc.perform(delete("/api/v1/books/1"))
                .andExpect(status().isNoContent());

        verify(bookService).delete(1L);
    }
}