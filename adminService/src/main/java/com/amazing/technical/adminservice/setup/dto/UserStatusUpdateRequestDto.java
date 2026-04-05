package com.amazing.technical.adminservice.setup.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserStatusUpdateRequestDto(
		@NotBlank @Size(max = 20) String status) {
}
