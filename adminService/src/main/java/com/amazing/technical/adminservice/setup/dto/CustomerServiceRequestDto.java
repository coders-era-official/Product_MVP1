package com.amazing.technical.adminservice.setup.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CustomerServiceRequestDto(
		@NotNull Integer serviceNumber,
		@NotBlank @Size(max = 120) String serviceName,
		Long categoryId,
		@Size(max = 400) String description,
		@NotBlank @Size(max = 20) String status) {
}
