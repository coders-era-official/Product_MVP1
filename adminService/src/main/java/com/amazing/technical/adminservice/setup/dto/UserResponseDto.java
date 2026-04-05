package com.amazing.technical.adminservice.setup.dto;

import java.time.LocalDateTime;

public record UserResponseDto(
		Long id,
		String userCode,
		String firstName,
		String lastName,
		String email,
		String phone,
		String status,
		LocalDateTime createdAt) {
}
