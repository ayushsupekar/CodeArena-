package com.codearena.repository;
import com.codearena.entity.Problem; import org.springframework.data.jpa.repository.JpaRepository; import org.springframework.data.domain.Sort; import java.util.List;
public interface ProblemRepository extends JpaRepository<Problem,String>{List<Problem> findByCategory(String category,Sort sort);List<Problem> findByDifficulty(String difficulty,Sort sort);List<Problem> findByCategoryAndDifficulty(String category,String difficulty,Sort sort);}
