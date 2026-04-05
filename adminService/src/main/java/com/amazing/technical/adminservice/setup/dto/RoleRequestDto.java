package com.amazing.technical.adminservice.setup.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;

public record RoleRequestDto(
		@NotBlank @Size(max = 120) String roleName,
		@NotBlank @Size(max = 80) String roleCode,
		@Size(max = 400) String description,
		@NotEmpty List<@NotBlank String> permissions,
		@NotBlank @Size(max = 20) String status) {
}
