package com.amazing.technical.adminservice.setup.controller;

import com.amazing.technical.adminservice.setup.dto.CustomerServiceRequestDto;
import com.amazing.technical.adminservice.setup.dto.CustomerServiceResponseDto;
import com.amazing.technical.adminservice.setup.service.CustomerServiceSetupService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customer-services")
public class CustomerServiceController {

	private final CustomerServiceSetupService customerServiceSetupService;

	public CustomerServiceController(CustomerServiceSetupService customerServiceSetupService) {
		this.customerServiceSetupService = customerServiceSetupService;
	}

	@GetMapping
	public ResponseEntity<List<CustomerServiceResponseDto>> getAll() {
		return ResponseEntity.ok(customerServiceSetupService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<CustomerServiceResponseDto> getById(@PathVariable Long id) {
		return ResponseEntity.ok(customerServiceSetupService.findById(id));
	}

	@PostMapping
	public ResponseEntity<CustomerServiceResponseDto> create(@Valid @RequestBody CustomerServiceRequestDto request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(customerServiceSetupService.create(request));
	}

	@PutMapping("/{id}")
	public ResponseEntity<CustomerServiceResponseDto> update(@PathVariable Long id, @Valid @RequestBody CustomerServiceRequestDto request) {
		return ResponseEntity.ok(customerServiceSetupService.update(id, request));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		customerServiceSetupService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
