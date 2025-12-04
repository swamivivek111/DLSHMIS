package com.hms.billing.api;

import com.hms.billing.entity.Invoice;
import com.hms.billing.repository.InvoiceRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/billing")
@Tag(name = "Billing Management", description = "APIs for managing billing and invoices")
public class BillingAPI {
    
    @Autowired
    private InvoiceRepository invoiceRepository;
    
    @PostMapping("/invoice")
    @Operation(summary = "Create a new invoice")
    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice invoice) {
        Invoice savedInvoice = invoiceRepository.save(invoice);
        return new ResponseEntity<>(savedInvoice, HttpStatus.CREATED);
    }
    
    @GetMapping("/invoice/{id}")
    @Operation(summary = "Get invoice by ID")
    public ResponseEntity<Invoice> getInvoice(@PathVariable Long id) {
        return invoiceRepository.findById(id)
            .map(invoice -> new ResponseEntity<>(invoice, HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @GetMapping("/invoices")
    @Operation(summary = "Get all invoices")
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        List<Invoice> invoices = invoiceRepository.findAll();
        return new ResponseEntity<>(invoices, HttpStatus.OK);
    }
}