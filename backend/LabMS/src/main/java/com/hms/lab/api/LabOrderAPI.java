package com.hms.lab.api;

import com.hms.lab.entity.LabOrder;
import com.hms.lab.repository.LabOrderRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/lab/orders")
@Tag(name = "Lab Orders", description = "APIs for managing lab test orders")
public class LabOrderAPI {
    
    @Autowired
    private LabOrderRepository labOrderRepository;
    
    @PostMapping
    @Operation(summary = "Create new lab order")
    public ResponseEntity<LabOrder> createOrder(@RequestBody LabOrder order) {
        LabOrder savedOrder = labOrderRepository.save(order);
        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }
    
    @GetMapping
    @Operation(summary = "Get all lab orders")
    public ResponseEntity<List<LabOrder>> getAllOrders() {
        List<LabOrder> orders = labOrderRepository.findAll();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get lab order by ID")
    public ResponseEntity<LabOrder> getOrder(@PathVariable Long id) {
        return labOrderRepository.findById(id)
            .map(order -> new ResponseEntity<>(order, HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update lab order")
    public ResponseEntity<LabOrder> updateOrder(@PathVariable Long id, @RequestBody LabOrder order) {
        if (!labOrderRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        order.setId(id);
        LabOrder updatedOrder = labOrderRepository.save(order);
        return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete lab order")
    public ResponseEntity<String> deleteOrder(@PathVariable Long id) {
        if (!labOrderRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        labOrderRepository.deleteById(id);
        return new ResponseEntity<>("Order deleted successfully", HttpStatus.OK);
    }
    
    @GetMapping("/patient/{patientId}")
    @Operation(summary = "Get orders by patient ID")
    public ResponseEntity<List<LabOrder>> getOrdersByPatient(@PathVariable Long patientId) {
        List<LabOrder> orders = labOrderRepository.findByPatientId(patientId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
    
    @GetMapping("/status/{status}")
    @Operation(summary = "Get orders by status")
    public ResponseEntity<List<LabOrder>> getOrdersByStatus(@PathVariable LabOrder.OrderStatus status) {
        List<LabOrder> orders = labOrderRepository.findByStatus(status);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}