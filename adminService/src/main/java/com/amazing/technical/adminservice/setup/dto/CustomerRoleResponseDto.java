package com.amazing.technical.adminservice.setup.dto;

import java.time.LocalDateTime;
import java.util.List;

public record CustomerRoleResponseDto(
		Long id,
		Long customerId,
		String customerName,
		String companyName,
		Long roleId,
		String roleName,
		List<AssignedServiceDto> assignedServices,
		LocalDateTime assignedAt,
		String status) {
}
