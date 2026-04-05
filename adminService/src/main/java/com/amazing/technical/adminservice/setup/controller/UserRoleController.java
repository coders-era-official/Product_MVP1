package com.amazing.technical.adminservice.setup.controller;

import com.amazing.technical.adminservice.setup.dto.UserRoleRequestDto;
import com.amazing.technical.adminservice.setup.dto.UserRoleResponseDto;
import com.amazing.technical.adminservice.setup.service.UserRoleSetupService;
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
@RequestMapping("/api/v1/user-roles")
public class UserRoleController {

	private final UserRoleSetupService userRoleSetupService;

	public UserRoleController(UserRoleSetupService userRoleSetupService) {
		this.userRoleSetupService = userRoleSetupService;
	}

	@GetMapping
	public ResponseEntity<List<UserRoleResponseDto>> getAll() {
		return ResponseEntity.ok(userRoleSetupService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<UserRoleResponseDto> getById(@PathVariable Long id) {
		return ResponseEntity.ok(userRoleSetupService.findById(id));
	}

	@PostMapping
	public ResponseEntity<UserRoleResponseDto> create(@Valid @RequestBody UserRoleRequestDto request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userRoleSetupService.create(request));
	}

	@PutMapping("/{id}")
	public ResponseEntity<UserRoleResponseDto> update(@PathVariable Long id, @Valid @RequestBody UserRoleRequestDto request) {
		return ResponseEntity.ok(userRoleSetupService.update(id, request));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		userRoleSetupService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
