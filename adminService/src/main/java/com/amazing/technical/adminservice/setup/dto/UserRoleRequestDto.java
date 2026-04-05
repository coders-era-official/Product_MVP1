package com.amazing.technical.adminservice.setup.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record UserRoleRequestDto(
		@NotNull Long userId,
		@NotNull Long roleId,
		@NotNull Long customerId,
		@NotEmpty List<@NotNull Long> serviceIds,
		@NotBlank @Size(max = 20) String status) {
}
