package com.amazing.technical.adminservice.setup.controller;

import com.amazing.technical.adminservice.setup.dto.ServiceCategoryRequestDto;
import com.amazing.technical.adminservice.setup.dto.ServiceCategoryResponseDto;
import com.amazing.technical.adminservice.setup.service.ServiceCategorySetupService;
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
@RequestMapping("/api/v1/service-categories")
public class ServiceCategoryController {

	private final ServiceCategorySetupService serviceCategorySetupService;

	public ServiceCategoryController(ServiceCategorySetupService serviceCategorySetupService) {
		this.serviceCategorySetupService = serviceCategorySetupService;
	}

	@GetMapping
	public ResponseEntity<List<ServiceCategoryResponseDto>> getAll() {
		return ResponseEntity.ok(serviceCategorySetupService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<ServiceCategoryResponseDto> getById(@PathVariable Long id) {
		return ResponseEntity.ok(serviceCategorySetupService.findById(id));
	}

	@PostMapping
	public ResponseEntity<ServiceCategoryResponseDto> create(@Valid @RequestBody ServiceCategoryRequestDto request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(serviceCategorySetupService.create(request));
	}

	@PutMapping("/{id}")
	public ResponseEntity<ServiceCategoryResponseDto> update(@PathVariable Long id, @Valid @RequestBody ServiceCategoryRequestDto request) {
		return ResponseEntity.ok(serviceCategorySetupService.update(id, request));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		serviceCategorySetupService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
