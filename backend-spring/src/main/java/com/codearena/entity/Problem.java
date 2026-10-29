package com.codearena.entity;
import jakarta.persistence.*; import lombok.Getter; import lombok.Setter;
import java.time.LocalDateTime;
@Entity @Table(name="problems") @Getter @Setter
public class Problem {
 @Id private String id; @Column(nullable=false) private String title; @Column(nullable=false,columnDefinition="TEXT") private String description;
 @Column(nullable=false) private String difficulty; @Column(nullable=false) private String category;
 @Column(columnDefinition="JSONB",nullable=false) private String examples; @Column(columnDefinition="JSONB",nullable=false) private String constraints;
 @Column(columnDefinition="JSONB",nullable=false) private String templates; @Column(name="testCases",columnDefinition="JSONB",nullable=false) private String testCases;
 @Column(name="timeLimit",nullable=false) private Integer timeLimit=2000; @Column(name="memoryLimit",nullable=false) private Integer memoryLimit=256;
 @Column(name="createdAt",nullable=false) private LocalDateTime createdAt; @Column(name="updatedAt",nullable=false) private LocalDateTime updatedAt;
 @PrePersist public void prePersist(){if(id==null)id=java.util.UUID.randomUUID().toString();LocalDateTime n=LocalDateTime.now();if(createdAt==null)createdAt=n;if(updatedAt==null)updatedAt=n;if(examples==null)examples="[]";if(constraints==null)constraints="[]";if(templates==null)templates="{}";if(testCases==null)testCases="[]";if(timeLimit==null)timeLimit=2000;if(memoryLimit==null)memoryLimit=256;}
 @PreUpdate public void preUpdate(){updatedAt=LocalDateTime.now();}
}
