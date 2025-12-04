package com.hms.master.api;

import com.hms.master.entity.Ward;
import com.hms.master.service.WardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/master/ward")
@CrossOrigin(origins = "*")
public class WardAPI {

    @Autowired
    private WardService wardService;

    @PostMapping("/add")
    public ResponseEntity<Ward> addWard(@RequestBody Ward ward) {
        Ward savedWard = wardService.addWard(ward);
        return ResponseEntity.ok(savedWard);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Ward> updateWard(@PathVariable Long id, @RequestBody Ward ward) {
        Ward updatedWard = wardService.updateWard(id, ward);
        return ResponseEntity.ok(updatedWard);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Ward> getWardById(@PathVariable Long id) {
        Ward ward = wardService.getWardById(id);
        return ResponseEntity.ok(ward);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> deleteWard(@PathVariable Long id) {
        wardService.deleteWard(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Ward deleted successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllWards(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "") String search) {
        
        Page<Ward> wardPage = wardService.getAllWards(page, limit, search);
        
        Map<String, Object> response = new HashMap<>();
        response.put("wards", wardPage.getContent());
        response.put("totalPages", wardPage.getTotalPages());
        response.put("totalElements", wardPage.getTotalElements());
        response.put("currentPage", page);
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Ward>> getAllWards() {
        List<Ward> wards = wardService.getAllWards();
        return ResponseEntity.ok(wards);
    }
}