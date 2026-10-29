package com.codearena.entity;
import jakarta.persistence.*; import lombok.Getter; import lombok.Setter; import java.time.LocalDateTime;
@Entity @Table(name="submissions") @Getter @Setter
public class Submission {
 @Id private String id; @Column(name="userId",nullable=false) private String userId; @Column(name="problemId",nullable=false) private String problemId;
 @Column(nullable=false,columnDefinition="TEXT") private String code; @Column(nullable=false) private String language; @Column(nullable=false) private String status;
 private String verdict; private Integer runtime; private Integer memory; @Column(nullable=false) private Integer passed=0; @Column(nullable=false) private Integer total=0;
 @Column(name="createdAt",nullable=false) private LocalDateTime createdAt;
 @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="userId",insertable=false,updatable=false) private User user;
 @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="problemId",insertable=false,updatable=false) private Problem problem;
 @PrePersist public void prePersist(){if(id==null)id=java.util.UUID.randomUUID().toString();if(createdAt==null)createdAt=LocalDateTime.now();if(passed==null)passed=0;if(total==null)total=0;}
}
