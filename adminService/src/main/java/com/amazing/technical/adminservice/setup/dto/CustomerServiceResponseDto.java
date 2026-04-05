package com.amazing.technical.adminservice.setup.dto;

import java.time.LocalDateTime;

public record CustomerServiceResponseDto(
		Long id,
		Integer serviceNumber,
		String serviceName,
		Long categoryId,
		String categoryName,
		String description,
		String status,
		LocalDateTime createdAt) {
}
