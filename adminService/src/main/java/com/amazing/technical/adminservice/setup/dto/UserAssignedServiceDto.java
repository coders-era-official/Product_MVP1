package com.amazing.technical.adminservice.setup.dto;

public record UserAssignedServiceDto(
		Long serviceId,
		Integer serviceNumber,
		String serviceName,
		String categoryName) {
}
