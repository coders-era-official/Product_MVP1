package com.amazing.technical.adminservice.setup.dto;

import java.time.LocalDateTime;
import java.util.List;

public record RoleResponseDto(
		Long id,
		String roleName,
		String roleCode,
		String description,
		List<String> permissions,
		String status,
		LocalDateTime createdAt) {
}
