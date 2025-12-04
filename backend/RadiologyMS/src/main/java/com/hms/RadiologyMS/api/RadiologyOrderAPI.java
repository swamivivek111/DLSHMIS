package com.hms.RadiologyMS.api;

import com.hms.RadiologyMS.entity.RadiologyOrder;
import com.hms.RadiologyMS.repository.RadiologyOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/radiology/orders")
public class RadiologyOrderAPI {
    
    @Autowired
    private RadiologyOrderRepository orderRepository;
    
    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody RadiologyOrder order) {
        RadiologyOrder saved = orderRepository.save(order);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Radiology order created successfully!");
        response.put("orderId", saved.getOrderId());
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/getall")
    public ResponseEntity<List<RadiologyOrder>> getAllOrders() {
        return ResponseEntity.ok(orderRepository.findAll());
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<RadiologyOrder> getOrderById(@PathVariable Long id) {
        return orderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/complete/{id}")
    public ResponseEntity<Map<String, Object>> completeOrder(@PathVariable Long id) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setStatus(RadiologyOrder.OrderStatus.COMPLETED);
                    orderRepository.save(order);
                    Map<String, Object> response = new HashMap<>();
                    response.put("message", "Order completed successfully!");
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}