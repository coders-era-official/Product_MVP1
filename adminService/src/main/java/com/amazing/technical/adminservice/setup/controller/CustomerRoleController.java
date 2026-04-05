package com.amazing.technical.adminservice.setup.controller;

import com.amazing.technical.adminservice.setup.dto.CustomerRoleRequestDto;
import com.amazing.technical.adminservice.setup.dto.CustomerRoleResponseDto;
import com.amazing.technical.adminservice.setup.service.CustomerRoleSetupService;
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
@RequestMapping("/api/v1/customer-roles")
public class CustomerRoleController {

	private final CustomerRoleSetupService customerRoleSetupService;

	public CustomerRoleController(CustomerRoleSetupService customerRoleSetupService) {
		this.customerRoleSetupService = customerRoleSetupService;
	}

	@GetMapping
	public ResponseEntity<List<CustomerRoleResponseDto>> getAll() {
		return ResponseEntity.ok(customerRoleSetupService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<CustomerRoleResponseDto> getById(@PathVariable Long id) {
		return ResponseEntity.ok(customerRoleSetupService.findById(id));
	}

	@PostMapping
	public ResponseEntity<CustomerRoleResponseDto> create(@Valid @RequestBody CustomerRoleRequestDto request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(customerRoleSetupService.create(request));
	}

	@PutMapping("/{id}")
	public ResponseEntity<CustomerRoleResponseDto> update(@PathVariable Long id, @Valid @RequestBody CustomerRoleRequestDto request) {
		return ResponseEntity.ok(customerRoleSetupService.update(id, request));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		customerRoleSetupService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
