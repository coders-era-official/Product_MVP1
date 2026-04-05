package com.amazing.technical.adminservice.setup.dto;

public record AssignedServiceDto(
		Long serviceId,
		Integer serviceNumber,
		String serviceName,
		String categoryName) {
}
