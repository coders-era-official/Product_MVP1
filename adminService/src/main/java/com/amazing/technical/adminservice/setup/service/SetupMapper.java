package com.amazing.technical.adminservice.setup.service;

import com.amazing.technical.adminservice.setup.dto.AssignedServiceDto;
import com.amazing.technical.adminservice.setup.dto.CustomerMainResponseDto;
import com.amazing.technical.adminservice.setup.dto.CustomerRoleResponseDto;
import com.amazing.technical.adminservice.setup.dto.CustomerServiceResponseDto;
import com.amazing.technical.adminservice.setup.dto.RoleResponseDto;
import com.amazing.technical.adminservice.setup.dto.ServiceCategoryResponseDto;
import com.amazing.technical.adminservice.setup.entity.CustomerMain;
import com.amazing.technical.adminservice.setup.entity.CustomerRole;
import com.amazing.technical.adminservice.setup.entity.CustomerServiceMaster;
import com.amazing.technical.adminservice.setup.entity.RoleMaster;
import com.amazing.technical.adminservice.setup.entity.ServiceCategory;

import java.util.Arrays;
import java.util.List;

public final class SetupMapper {

	private SetupMapper() {
	}

	public static CustomerMainResponseDto toResponse(CustomerMain entity) {
		return new CustomerMainResponseDto(
				entity.getCustomerId(),
				entity.getFirstName(),
				entity.getLastName(),
				entity.getEmail(),
				entity.getPhone(),
				entity.getCompanyName(),
				entity.getCompanyType(),
				entity.getGstNumber(),
				entity.getCompanySize(),
				entity.getIndustry(),
				entity.getAddressLine1(),
				entity.getAddressLine2(),
				entity.getCity(),
				entity.getState(),
				entity.getPincode(),
				entity.getCountry(),
				entity.getPlanName(),
				entity.getBillingCycle(),
				entity.getStatus(),
				entity.getOnboardedAt());
	}

	public static RoleResponseDto toResponse(RoleMaster entity) {
		return new RoleResponseDto(
				entity.getRoleId(),
				entity.getRoleName(),
				entity.getRoleCode(),
				entity.getDescription(),
				splitPermissions(entity.getPermissions()),
				entity.getStatus(),
				entity.getCreatedAt());
	}

	public static ServiceCategoryResponseDto toResponse(ServiceCategory entity) {
		return new ServiceCategoryResponseDto(
				entity.getServiceCategoryId(),
				entity.getCategoryNumber(),
				entity.getCategoryName(),
				entity.getDescription(),
				entity.getStatus(),
				entity.getCreatedAt());
	}

	public static CustomerServiceResponseDto toResponse(CustomerServiceMaster entity) {
		return new CustomerServiceResponseDto(
				entity.getCustomerServiceId(),
				entity.getServiceNumber(),
				entity.getServiceName(),
				entity.getServiceCategory().getServiceCategoryId(),
				entity.getServiceCategory().getCategoryName(),
				entity.getDescription(),
				entity.getStatus(),
				entity.getCreatedAt());
	}

	public static CustomerRoleResponseDto toResponse(CustomerRole entity) {
		List<AssignedServiceDto> assignedServices = entity.getServices().stream()
				.map(service -> new AssignedServiceDto(
						service.getCustomerServiceId(),
						service.getServiceNumber(),
						service.getServiceName(),
						service.getServiceCategory().getCategoryName()))
				.toList();

		return new CustomerRoleResponseDto(
				entity.getCustomerRoleId(),
				entity.getCustomer().getCustomerId(),
				entity.getCustomer().getFirstName() + " " + entity.getCustomer().getLastName(),
				entity.getCustomer().getCompanyName(),
				entity.getRole().getRoleId(),
				entity.getRole().getRoleName(),
				assignedServices,
				entity.getAssignedAt(),
				entity.getStatus());
	}

	public static String joinPermissions(List<String> permissions) {
		return permissions.stream()
				.map(String::trim)
				.filter(value -> !value.isBlank())
				.distinct()
				.reduce((left, right) -> left + "," + right)
				.orElse("");
	}

	private static List<String> splitPermissions(String permissions) {
		if (permissions == null || permissions.isBlank()) {
			return List.of();
		}
		return Arrays.stream(permissions.split(","))
				.map(String::trim)
				.filter(value -> !value.isBlank())
				.toList();
	}
}
