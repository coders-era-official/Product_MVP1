package com.amazing.technical.adminservice.setup.dto;

import java.time.LocalDateTime;

public record CustomerMainResponseDto(
		Long id,
		String customerCode,
		String firstName,
		String lastName,
		String email,
		String phone,
		String companyName,
		String companyType,
		String gstNumber,
		String companySize,
		String industry,
		String addressLine1,
		String addressLine2,
		String city,
		String state,
		String pincode,
		String country,
		String planName,
		String billingCycle,
		String status,
		LocalDateTime onboardedAt) {
}
