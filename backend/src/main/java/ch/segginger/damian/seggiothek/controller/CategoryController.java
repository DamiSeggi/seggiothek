package ch.segginger.damian.seggiothek.controller;

import ch.segginger.damian.seggiothek.dto.CategoryDTO;
import ch.segginger.damian.seggiothek.model.Category;
import ch.segginger.damian.seggiothek.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
@Tag(name = "Category API", description = "Verwaltung von Kategorien")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Operation(
            summary = "Alle Kategorien abrufen",
            description = "Lädt alle Kategorien aus der Datenbank"
    )
    @PreAuthorize("hasRole('ROLE_read')")
    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAll() {
        List<CategoryDTO> dtos = categoryService.findAll().stream()
                .map(c -> {
                    CategoryDTO dto = new CategoryDTO();
                    dto.setId(c.getId());
                    dto.setName(c.getName());
                    dto.setDescription(c.getDescription());
                    return dto;
                })
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @Operation(
            summary = "Kategorie anhand der ID abrufen",
            description = "Lädt eine einzelne Kategorie"
    )
    @PreAuthorize("hasRole('ROLE_read')")
    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> getById(@PathVariable Long id) {
        return categoryService.findById(id)
                .map(c -> {
                    CategoryDTO dto = new CategoryDTO();
                    dto.setId(c.getId());
                    dto.setName(c.getName());
                    dto.setDescription(c.getDescription());
                    return ResponseEntity.ok(dto);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(
            summary = "Neue Kategorie erstellen",
            description = "Erstellt eine neue Kategorie"
    )
    @PreAuthorize("hasAuthority('ROLE_admin')")
    @PostMapping
    public ResponseEntity<CategoryDTO> create(@RequestBody CategoryDTO dto) {
        Category category = new Category();
        category.setName(dto.getName());
        category.setDescription(dto.getDescription());
        Category saved = categoryService.create(category);
        CategoryDTO result = new CategoryDTO();
        result.setId(saved.getId());
        result.setName(saved.getName());
        result.setDescription(saved.getDescription());
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @Operation(
            summary = "Kategorie aktualisieren",
            description = "Aktualisiert eine bestehende Kategorie"
    )
    @PreAuthorize("hasAuthority('ROLE_admin')")
    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> update(@PathVariable Long id, @RequestBody CategoryDTO dto) {
        Category updated = new Category();
        updated.setName(dto.getName());
        updated.setDescription(dto.getDescription());
        Category saved = categoryService.update(id, updated);
        CategoryDTO result = new CategoryDTO();
        result.setId(saved.getId());
        result.setName(saved.getName());
        result.setDescription(saved.getDescription());
        return ResponseEntity.ok(result);
    }


    @Operation(
            summary = "Kategorie löschen",
            description = "Löscht eine Kategorie anhand der ID"
    )
    @PreAuthorize("hasAuthority('ROLE_admin')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}