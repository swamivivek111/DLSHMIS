package com.hms.master.api;

import com.hms.master.entity.CashCounter;
import com.hms.master.service.CashCounterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/master/cash-counters")
@CrossOrigin(origins = "*")
public class CashCounterAPI {
    
    @Autowired
    private CashCounterService service;
    
    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> getAllCashCounters() {
        try {
            List<CashCounter> cashCounters = service.getAllCashCounters();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("cashCounters", cashCounters);
            response.put("count", cashCounters.size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getCashCounterById(@PathVariable Long id) {
        try {
            return service.getCashCounterById(id)
                .map(cashCounter -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("success", true);
                    response.put("cashCounter", cashCounter);
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createCashCounter(@RequestBody CashCounter cashCounter) {
        try {
            CashCounter created = service.createCashCounter(cashCounter);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Cash Counter created successfully");
            response.put("cashCounter", created);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateCashCounter(@PathVariable Long id, @RequestBody CashCounter cashCounter) {
        try {
            CashCounter updated = service.updateCashCounter(id, cashCounter);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Cash Counter updated successfully");
            response.put("cashCounter", updated);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteCashCounter(@PathVariable Long id) {
        try {
            service.deleteCashCounter(id);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Cash Counter deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}