package com.amazing.technical.adminservice.setup.controller;

import com.amazing.technical.adminservice.setup.dto.UserRequestDto;
import com.amazing.technical.adminservice.setup.dto.UserResponseDto;
import com.amazing.technical.adminservice.setup.dto.UserStatusUpdateRequestDto;
import com.amazing.technical.adminservice.setup.service.UserSetupService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

	private final UserSetupService userSetupService;

	public UserController(UserSetupService userSetupService) {
		this.userSetupService = userSetupService;
	}

	@GetMapping
	public ResponseEntity<List<UserResponseDto>> getAll() {
		return ResponseEntity.ok(userSetupService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<UserResponseDto> getById(@PathVariable Long id) {
		return ResponseEntity.ok(userSetupService.findById(id));
	}

	@PostMapping
	public ResponseEntity<UserResponseDto> create(@Valid @RequestBody UserRequestDto request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userSetupService.create(request));
	}

	@PatchMapping("/{id}/status")
	public ResponseEntity<UserResponseDto> updateStatus(@PathVariable Long id, @Valid @RequestBody UserStatusUpdateRequestDto request) {
		return ResponseEntity.ok(userSetupService.updateStatus(id, request));
	}
}
