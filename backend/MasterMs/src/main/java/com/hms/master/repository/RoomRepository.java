package com.hms.master.repository;

import com.hms.master.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    
    @Query("SELECT r FROM Room r WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           "LOWER(r.roomNumber) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(r.roomType) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(r.blockWing) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Room> findAllWithSearch(@Param("search") String search, Pageable pageable);
}