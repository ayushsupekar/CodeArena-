package com.codearena.repository;
import com.codearena.entity.Submission; import org.springframework.data.jpa.repository.JpaRepository; import org.springframework.data.domain.Pageable; import java.util.List;
public interface SubmissionRepository extends JpaRepository<Submission,String>{
 List<Submission> findByUserIdOrderByCreatedAtDesc(String userId);
 List<Submission> findByUserIdOrderByCreatedAtDesc(String userId,Pageable pageable);
 long countByProblemIdAndStatus(String problemId,String status);
}
