package com.amazing.technical.adminservice.setup.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CustomerMainRequestDto(
		@NotBlank @Size(max = 80) String firstName,
		@NotBlank @Size(max = 80) String lastName,
		@NotBlank @Email @Size(max = 160) String email,
		@NotBlank @Size(max = 30) String phone,
		@NotBlank @Size(max = 160) String companyName,
		@NotBlank @Size(max = 60) String companyType,
		@Size(max = 30) String gstNumber,
		@NotBlank @Size(max = 40) String companySize,
		@NotBlank @Size(max = 80) String industry,
		@NotBlank @Size(max = 200) String addressLine1,
		@Size(max = 200) String addressLine2,
		@NotBlank @Size(max = 80) String city,
		@NotBlank @Size(max = 80) String state,
		@NotBlank @Size(max = 20) String pincode,
		@NotBlank @Size(max = 80) String country,
		@NotBlank @Size(max = 80) String planName,
		@NotBlank @Size(max = 40) String billingCycle,
		@NotBlank @Size(max = 20) String status) {
}
