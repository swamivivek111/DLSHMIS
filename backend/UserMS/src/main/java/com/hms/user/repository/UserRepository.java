package com.hms.user.repository;

import java.util.Optional;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hms.user.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByEmail(String email);
    
    List<User> findByActiveTrue();
    
    Page<User> findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
        String name, String email, Pageable pageable);
}
