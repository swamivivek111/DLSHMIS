package com.hms.inventory.api;

import com.hms.inventory.entity.Medicine;
import com.hms.inventory.repository.MedicineRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/inventory")
@Tag(name = "Inventory Management", description = "APIs for managing medicine inventory")
public class InventoryAPI {
    
    @Autowired
    private MedicineRepository medicineRepository;
    
    @PostMapping("/medicine")
    @Operation(summary = "Add new medicine to inventory")
    public ResponseEntity<Medicine> addMedicine(@RequestBody Medicine medicine) {
        Medicine savedMedicine = medicineRepository.save(medicine);
        return new ResponseEntity<>(savedMedicine, HttpStatus.CREATED);
    }
    
    @GetMapping("/medicine/{id}")
    @Operation(summary = "Get medicine by ID")
    public ResponseEntity<Medicine> getMedicine(@PathVariable Long id) {
        return medicineRepository.findById(id)
            .map(medicine -> new ResponseEntity<>(medicine, HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @GetMapping("/medicines")
    @Operation(summary = "Get all medicines")
    public ResponseEntity<List<Medicine>> getAllMedicines() {
        List<Medicine> medicines = medicineRepository.findAll();
        return new ResponseEntity<>(medicines, HttpStatus.OK);
    }
}