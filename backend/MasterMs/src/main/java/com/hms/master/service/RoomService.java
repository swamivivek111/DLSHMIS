package com.hms.master.service;

import com.hms.master.entity.Room;
import org.springframework.data.domain.Page;

import java.util.List;

public interface RoomService {
    Room addRoom(Room room);
    Room updateRoom(Long id, Room room);
    Room getRoomById(Long id);
    void deleteRoom(Long id);
    Page<Room> getAllRooms(int page, int limit, String search);
    List<Room> getAllRooms();
}