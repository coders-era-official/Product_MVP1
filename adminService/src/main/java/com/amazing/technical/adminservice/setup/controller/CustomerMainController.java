package com.amazing.technical.adminservice.setup.controller;

import com.amazing.technical.adminservice.setup.dto.CustomerMainRequestDto;
import com.amazing.technical.adminservice.setup.dto.CustomerMainResponseDto;
import com.amazing.technical.adminservice.setup.service.CustomerMainSetupService;
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
@RequestMapping("/api/v1/customers")
public class CustomerMainController {

	private final CustomerMainSetupService customerMainSetupService;

	public CustomerMainController(CustomerMainSetupService customerMainSetupService) {
		this.customerMainSetupService = customerMainSetupService;
	}

	@GetMapping
	public ResponseEntity<List<CustomerMainResponseDto>> getAll() {
		return ResponseEntity.ok(customerMainSetupService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<CustomerMainResponseDto> getById(@PathVariable Long id) {
		return ResponseEntity.ok(customerMainSetupService.findById(id));
	}

	@PostMapping
	public ResponseEntity<CustomerMainResponseDto> create(@Valid @RequestBody CustomerMainRequestDto request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(customerMainSetupService.create(request));
	}

	@PutMapping("/{id}")
	public ResponseEntity<CustomerMainResponseDto> update(@PathVariable Long id, @Valid @RequestBody CustomerMainRequestDto request) {
		return ResponseEntity.ok(customerMainSetupService.update(id, request));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		customerMainSetupService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
