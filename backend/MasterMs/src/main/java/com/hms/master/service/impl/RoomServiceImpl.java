package com.hms.master.service.impl;

import com.hms.master.entity.Room;
import com.hms.master.repository.RoomRepository;
import com.hms.master.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Override
    public Room addRoom(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public Room updateRoom(Long id, Room room) {
        Room existingRoom = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));
        
        existingRoom.setWardId(room.getWardId());
        existingRoom.setWardName(room.getWardName());
        existingRoom.setRoomNumber(room.getRoomNumber());
        existingRoom.setRoomType(room.getRoomType());
        existingRoom.setFloorNo(room.getFloorNo());
        existingRoom.setBlockWing(room.getBlockWing());
        existingRoom.setMaxBedsAllowed(room.getMaxBedsAllowed());
        existingRoom.setRoomStatus(room.getRoomStatus());
        existingRoom.setRoomChargesPerDay(room.getRoomChargesPerDay());
        existingRoom.setNursingCharges(room.getNursingCharges());
        existingRoom.setUtilityCharges(room.getUtilityCharges());
        existingRoom.setHasOxygenPoint(room.getHasOxygenPoint());
        existingRoom.setHasVentilatorSupport(room.getHasVentilatorSupport());
        existingRoom.setHasMonitor(room.getHasMonitor());
        existingRoom.setIsAC(room.getIsAC());
        existingRoom.setHasAttachedWashroom(room.getHasAttachedWashroom());
        
        return roomRepository.save(existingRoom);
    }

    @Override
    public Room getRoomById(Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));
    }

    @Override
    public void deleteRoom(Long id) {
        if (!roomRepository.existsById(id)) {
            throw new RuntimeException("Room not found with id: " + id);
        }
        roomRepository.deleteById(id);
    }

    @Override
    public Page<Room> getAllRooms(int page, int limit, String search) {
        Pageable pageable = PageRequest.of(page, limit);
        return roomRepository.findAllWithSearch(search, pageable);
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }
}