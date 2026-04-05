package com.amazing.technical.adminservice.setup.service;

import com.amazing.technical.adminservice.exception.ResourceNotFoundException;
import com.amazing.technical.adminservice.setup.dto.CustomerMainRequestDto;
import com.amazing.technical.adminservice.setup.dto.CustomerMainResponseDto;
import com.amazing.technical.adminservice.setup.dto.CustomerRoleRequestDto;
import com.amazing.technical.adminservice.setup.dto.CustomerRoleResponseDto;
import com.amazing.technical.adminservice.setup.dto.CustomerServiceRequestDto;
import com.amazing.technical.adminservice.setup.dto.CustomerServiceResponseDto;
import com.amazing.technical.adminservice.setup.dto.OnboardingCompleteRequestDto;
import com.amazing.technical.adminservice.setup.dto.OnboardingCompleteResponseDto;
import com.amazing.technical.adminservice.setup.dto.RoleRequestDto;
import com.amazing.technical.adminservice.setup.dto.RoleResponseDto;
import com.amazing.technical.adminservice.setup.dto.ServiceCategoryRequestDto;
import com.amazing.technical.adminservice.setup.dto.ServiceCategoryResponseDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OnboardingSetupService {

	private final CustomerMainSetupService customerMainSetupService;
	private final RoleMasterSetupService roleMasterSetupService;
	private final ServiceCategorySetupService serviceCategorySetupService;
	private final CustomerServiceSetupService customerServiceSetupService;
	private final CustomerRoleSetupService customerRoleSetupService;

	public OnboardingSetupService(
			CustomerMainSetupService customerMainSetupService,
			RoleMasterSetupService roleMasterSetupService,
			ServiceCategorySetupService serviceCategorySetupService,
			CustomerServiceSetupService customerServiceSetupService,
			CustomerRoleSetupService customerRoleSetupService) {
		this.customerMainSetupService = customerMainSetupService;
		this.roleMasterSetupService = roleMasterSetupService;
		this.serviceCategorySetupService = serviceCategorySetupService;
		this.customerServiceSetupService = customerServiceSetupService;
		this.customerRoleSetupService = customerRoleSetupService;
	}

	@Transactional
	public OnboardingCompleteResponseDto complete(OnboardingCompleteRequestDto request) {
		CustomerMainResponseDto customer = resolveCustomer(request.customerId(), request.customer());
		RoleResponseDto role = resolveRole(request.roleId(), request.role());
		ServiceCategoryResponseDto category = resolveCategory(request.serviceCategoryId(), request.serviceCategory());
		CustomerServiceResponseDto service = resolveService(request.customerServiceId(), request.customerService(), category.id());

		List<Long> serviceIds = request.customerServiceIds() != null && !request.customerServiceIds().isEmpty()
				? request.customerServiceIds()
				: List.of(service.id());

		CustomerRoleResponseDto customerRole = customerRoleSetupService.create(
				new CustomerRoleRequestDto(
						customer.id(),
						role.id(),
						serviceIds,
						request.customerRoleStatus() == null || request.customerRoleStatus().isBlank() ? "Active" : request.customerRoleStatus()));

		return new OnboardingCompleteResponseDto(customer, role, category, service, customerRole);
	}

	private CustomerMainResponseDto resolveCustomer(Long customerId, CustomerMainRequestDto request) {
		if (customerId != null) {
			return customerMainSetupService.findById(customerId);
		}
		if (request == null) {
			throw new ResourceNotFoundException("Customer details are required for onboarding.");
		}
		return customerMainSetupService.create(request);
	}

	private RoleResponseDto resolveRole(Long roleId, RoleRequestDto request) {
		if (roleId != null) {
			return roleMasterSetupService.findById(roleId);
		}
		if (request == null) {
			throw new ResourceNotFoundException("Role details are required for onboarding.");
		}
		return roleMasterSetupService.create(request);
	}

	private ServiceCategoryResponseDto resolveCategory(Long categoryId, ServiceCategoryRequestDto request) {
		if (categoryId != null) {
			return serviceCategorySetupService.findById(categoryId);
		}
		if (request == null) {
			throw new ResourceNotFoundException("Service category details are required for onboarding.");
		}
		return serviceCategorySetupService.create(request);
	}

	private CustomerServiceResponseDto resolveService(Long serviceId, CustomerServiceRequestDto request, Long fallbackCategoryId) {
		if (serviceId != null) {
			return customerServiceSetupService.findById(serviceId);
		}
		if (request == null) {
			throw new ResourceNotFoundException("Customer service details are required for onboarding.");
		}
		CustomerServiceRequestDto payload = request.categoryId() == null
				? new CustomerServiceRequestDto(request.serviceNumber(), request.serviceName(), fallbackCategoryId, request.description(), request.status())
				: request;
		return customerServiceSetupService.create(payload);
	}
}
