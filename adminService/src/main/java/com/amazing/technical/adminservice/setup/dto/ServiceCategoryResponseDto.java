package com.amazing.technical.adminservice.setup.dto;

import java.time.LocalDateTime;

public record ServiceCategoryResponseDto(
		Long id,
		Integer categoryNumber,
		String categoryName,
		String description,
		String status,
		LocalDateTime createdAt) {
}
