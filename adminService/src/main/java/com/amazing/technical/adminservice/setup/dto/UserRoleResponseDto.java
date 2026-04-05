package com.amazing.technical.adminservice.setup.dto;

import java.time.LocalDateTime;
import java.util.List;

public record UserRoleResponseDto(
		Long id,
		Long userId,
		String userCode,
		String userName,
		Long roleId,
		String roleName,
		String roleCode,
		Long customerId,
		String customerCode,
		String customerName,
		String companyName,
		List<UserAssignedServiceDto> assignedServices,
		LocalDateTime assignedAt,
		String status) {
}
