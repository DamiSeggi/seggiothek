package ch.segginger.damian.seggiothek.repository;

import ch.segginger.damian.seggiothek.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
