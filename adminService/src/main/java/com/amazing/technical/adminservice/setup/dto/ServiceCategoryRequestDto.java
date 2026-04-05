package com.amazing.technical.adminservice.setup.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ServiceCategoryRequestDto(
		@NotNull Integer categoryNumber,
		@NotBlank @Size(max = 120) String categoryName,
		@Size(max = 400) String description,
		@NotBlank @Size(max = 20) String status) {
}
