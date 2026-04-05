package com.amazing.technical.adminservice.setup.dto;

import jakarta.validation.Valid;

import java.util.List;

public record OnboardingCompleteRequestDto(
		Long customerId,
		@Valid CustomerMainRequestDto customer,
		Long roleId,
		@Valid RoleRequestDto role,
		Long serviceCategoryId,
		@Valid ServiceCategoryRequestDto serviceCategory,
		Long customerServiceId,
		@Valid CustomerServiceRequestDto customerService,
		List<Long> customerServiceIds,
		String customerRoleStatus) {
}
