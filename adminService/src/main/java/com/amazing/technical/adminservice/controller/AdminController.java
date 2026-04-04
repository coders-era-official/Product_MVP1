package com.amazing.technical.adminservice.controller;

import com.amazing.technical.adminservice.dto.AdminRequestDto;
import com.amazing.technical.adminservice.dto.AdminResponseDto;
import com.amazing.technical.adminservice.service.AdminService;
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
@RequestMapping("/admins")
public class AdminController {

	private final AdminService adminService;

	public AdminController(AdminService adminService) {
		this.adminService = adminService;
	}

	@GetMapping
	public ResponseEntity<List<AdminResponseDto>> getAll() {
		return ResponseEntity.ok(adminService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<AdminResponseDto> getById(@PathVariable Long id) {
		return ResponseEntity.ok(adminService.findById(id));
	}

	@PostMapping
	public ResponseEntity<AdminResponseDto> create(@Valid @RequestBody AdminRequestDto request) {
		AdminResponseDto created = adminService.create(request);
		return ResponseEntity.status(HttpStatus.CREATED).body(created);
	}

	@PutMapping("/{id}")
	public ResponseEntity<AdminResponseDto> update(@PathVariable Long id, @Valid @RequestBody AdminRequestDto request) {
		return ResponseEntity.ok(adminService.update(id, request));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		adminService.deleteById(id);
		return ResponseEntity.noContent().build();
	}
}
