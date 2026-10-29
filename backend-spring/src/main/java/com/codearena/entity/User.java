package com.codearena.entity;
import jakarta.persistence.*;
import lombok.Getter; import lombok.Setter;
import java.time.LocalDateTime;
@Entity @Table(name="users") @Getter @Setter
public class User {
 @Id private String id;
 @Column(name="clerkId",nullable=false,unique=true) private String clerkId;
 @Column(nullable=false,unique=true) private String username;
 @Column(nullable=false,unique=true) private String email;
 private String password; private String avatar;
 @Column(name="createdAt",nullable=false) private LocalDateTime createdAt;
 @Column(name="updatedAt",nullable=false) private LocalDateTime updatedAt;
 @PrePersist public void prePersist(){ if(id==null)id=java.util.UUID.randomUUID().toString(); LocalDateTime n=LocalDateTime.now(); if(createdAt==null)createdAt=n;if(updatedAt==null)updatedAt=n; }
 @PreUpdate public void preUpdate(){updatedAt=LocalDateTime.now();}
}
