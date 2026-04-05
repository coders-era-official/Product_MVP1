package com.amazing.technical.adminservice.setup.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserRequestDto(
		@NotBlank @Size(max = 80) String firstName,
		@NotBlank @Size(max = 80) String lastName,
		@NotBlank @Email @Size(max = 160) String email,
		@NotBlank @Size(max = 30) String phone,
		@NotBlank
		@Size(min = 8, max = 100)
		@Pattern(regexp = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$")
		String password,
		@NotBlank @Size(max = 20) String status) {
}
