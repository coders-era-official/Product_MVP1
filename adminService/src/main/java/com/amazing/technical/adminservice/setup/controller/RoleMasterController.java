package com.amazing.technical.adminservice.setup.controller;

import com.amazing.technical.adminservice.setup.dto.RoleRequestDto;
import com.amazing.technical.adminservice.setup.dto.RoleResponseDto;
import com.amazing.technical.adminservice.setup.service.RoleMasterSetupService;
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
@RequestMapping("/api/v1/roles")
public class RoleMasterController {

	private final RoleMasterSetupService roleMasterSetupService;

	public RoleMasterController(RoleMasterSetupService roleMasterSetupService) {
		this.roleMasterSetupService = roleMasterSetupService;
	}

	@GetMapping
	public ResponseEntity<List<RoleResponseDto>> getAll() {
		return ResponseEntity.ok(roleMasterSetupService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<RoleResponseDto> getById(@PathVariable Long id) {
		return ResponseEntity.ok(roleMasterSetupService.findById(id));
	}

	@PostMapping
	public ResponseEntity<RoleResponseDto> create(@Valid @RequestBody RoleRequestDto request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(roleMasterSetupService.create(request));
	}

	@PutMapping("/{id}")
	public ResponseEntity<RoleResponseDto> update(@PathVariable Long id, @Valid @RequestBody RoleRequestDto request) {
		return ResponseEntity.ok(roleMasterSetupService.update(id, request));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		roleMasterSetupService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
