package com.amazing.technical.adminservice.setup.dto;

public record OnboardingCompleteResponseDto(
		CustomerMainResponseDto customer,
		RoleResponseDto role,
		ServiceCategoryResponseDto serviceCategory,
		CustomerServiceResponseDto customerService,
		CustomerRoleResponseDto customerRole) {
}
