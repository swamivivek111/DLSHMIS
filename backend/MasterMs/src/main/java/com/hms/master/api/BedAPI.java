package com.hms.master.api;

import com.hms.master.entity.Bed;
import com.hms.master.service.BedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/master/bed")
@CrossOrigin(origins = "*")
public class BedAPI {

    @Autowired
    private BedService bedService;

    @PostMapping("/add")
    public ResponseEntity<Bed> addBed(@RequestBody Bed bed) {
        Bed savedBed = bedService.addBed(bed);
        return ResponseEntity.ok(savedBed);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Bed> updateBed(@PathVariable Long id, @RequestBody Bed bed) {
        Bed updatedBed = bedService.updateBed(id, bed);
        return ResponseEntity.ok(updatedBed);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Bed> getBedById(@PathVariable Long id) {
        Bed bed = bedService.getBedById(id);
        return ResponseEntity.ok(bed);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> deleteBed(@PathVariable Long id) {
        bedService.deleteBed(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Bed deleted successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllBeds(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "") String search) {
        
        Page<Bed> bedPage = bedService.getAllBeds(page, limit, search);
        
        Map<String, Object> response = new HashMap<>();
        response.put("beds", bedPage.getContent());
        response.put("totalPages", bedPage.getTotalPages());
        response.put("totalElements", bedPage.getTotalElements());
        response.put("currentPage", page);
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Bed>> getAllBeds() {
        List<Bed> beds = bedService.getAllBeds();
        return ResponseEntity.ok(beds);
    }
}