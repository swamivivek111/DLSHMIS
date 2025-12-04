package com.hms.master.api;

import com.hms.master.dto.ApplicationSettingDTO;
import com.hms.master.entity.ApplicationSetting;
import com.hms.master.service.ApplicationSettingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/applicationsetting")
@CrossOrigin
public class ApplicationSettingAPI {
    
    @Autowired
    private ApplicationSettingService settingService;
    
    @PostMapping("/create")
    public ResponseEntity<String> createSetting(@RequestBody @Valid ApplicationSettingDTO dto) {
        try {
            settingService.createSetting(dto);
            return new ResponseEntity<>("Setting created successfully", HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @PutMapping("/update/{key}")
    public ResponseEntity<String> updateSetting(@PathVariable String key, @RequestBody Map<String, String> request) {
        try {
            String value = request.get("value");
            settingService.updateSetting(key, value);
            return new ResponseEntity<>("Setting updated successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @PutMapping("/update-multiple")
    public ResponseEntity<String> updateMultipleSettings(@RequestBody Map<String, String> settings) {
        try {
            System.out.println("Received settings update: " + settings);
            settingService.updateMultipleSettings(settings);
            return new ResponseEntity<>("Settings updated successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            System.err.println("Error updating settings: " + e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @GetMapping("/get/{key}")
    public ResponseEntity<String> getSettingValue(@PathVariable String key) {
        String value = settingService.getSettingValue(key);
        if (value != null) {
            return new ResponseEntity<>(value, HttpStatus.OK);
        }
        return new ResponseEntity<>("Setting not found", HttpStatus.NOT_FOUND);
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ApplicationSetting>> getSettingsByCategory(@PathVariable String category) {
        List<ApplicationSetting> settings = settingService.getSettingsByCategory(category);
        return new ResponseEntity<>(settings, HttpStatus.OK);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<ApplicationSetting>> getAllSettings() {
        List<ApplicationSetting> settings = settingService.getAllActiveSettings();
        return new ResponseEntity<>(settings, HttpStatus.OK);
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> testConnection() {
        return new ResponseEntity<>("Application Settings API is working!", HttpStatus.OK);
    }
    
    @DeleteMapping("/delete/{key}")
    public ResponseEntity<String> deleteSetting(@PathVariable String key) {
        try {
            settingService.deleteSetting(key);
            return new ResponseEntity<>("Setting deleted successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}