package com.hms.master.api;

import com.hms.master.entity.Room;
import com.hms.master.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/master/room")
@CrossOrigin(origins = "*")
public class RoomAPI {

    @Autowired
    private RoomService roomService;

    @PostMapping("/add")
    public ResponseEntity<Room> addRoom(@RequestBody Room room) {
        Room savedRoom = roomService.addRoom(room);
        return ResponseEntity.ok(savedRoom);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable Long id, @RequestBody Room room) {
        Room updatedRoom = roomService.updateRoom(id, room);
        return ResponseEntity.ok(updatedRoom);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long id) {
        Room room = roomService.getRoomById(id);
        return ResponseEntity.ok(room);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Room deleted successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllRooms(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "") String search) {
        
        Page<Room> roomPage = roomService.getAllRooms(page, limit, search);
        
        Map<String, Object> response = new HashMap<>();
        response.put("rooms", roomPage.getContent());
        response.put("totalPages", roomPage.getTotalPages());
        response.put("totalElements", roomPage.getTotalElements());
        response.put("currentPage", page);
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Room>> getAllRooms() {
        List<Room> rooms = roomService.getAllRooms();
        return ResponseEntity.ok(rooms);
    }
}