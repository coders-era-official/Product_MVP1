package com.amazing.technical.adminservice.setup.service;

import com.amazing.technical.adminservice.exception.ResourceNotFoundException;
import com.amazing.technical.adminservice.setup.dto.CustomerRoleRequestDto;
import com.amazing.technical.adminservice.setup.dto.CustomerRoleResponseDto;
import com.amazing.technical.adminservice.setup.entity.CustomerRole;
import com.amazing.technical.adminservice.setup.entity.CustomerServiceMaster;
import com.amazing.technical.adminservice.setup.repository.CustomerRoleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashSet;
import java.util.List;

@Service
public class CustomerRoleSetupService {

	private final CustomerRoleRepository customerRoleRepository;
	private final CustomerMainSetupService customerMainSetupService;
	private final RoleMasterSetupService roleMasterSetupService;
	private final CustomerServiceSetupService customerServiceSetupService;

	public CustomerRoleSetupService(
			CustomerRoleRepository customerRoleRepository,
			CustomerMainSetupService customerMainSetupService,
			RoleMasterSetupService roleMasterSetupService,
			CustomerServiceSetupService customerServiceSetupService) {
		this.customerRoleRepository = customerRoleRepository;
		this.customerMainSetupService = customerMainSetupService;
		this.roleMasterSetupService = roleMasterSetupService;
		this.customerServiceSetupService = customerServiceSetupService;
	}

	@Transactional(readOnly = true)
	public List<CustomerRoleResponseDto> findAll() {
		return customerRoleRepository.findAll().stream().map(SetupMapper::toResponse).toList();
	}

	@Transactional(readOnly = true)
	public CustomerRoleResponseDto findById(Long id) {
		return SetupMapper.toResponse(getEntity(id));
	}

	@Transactional
	public CustomerRoleResponseDto create(CustomerRoleRequestDto request) {
		CustomerRole entity = new CustomerRole();
		apply(entity, request);
		return SetupMapper.toResponse(customerRoleRepository.save(entity));
	}

	@Transactional
	public CustomerRoleResponseDto update(Long id, CustomerRoleRequestDto request) {
		CustomerRole entity = getEntity(id);
		apply(entity, request);
		return SetupMapper.toResponse(customerRoleRepository.save(entity));
	}

	@Transactional
	public void delete(Long id) {
		customerRoleRepository.delete(getEntity(id));
	}

	@Transactional(readOnly = true)
	public CustomerRole getEntity(Long id) {
		return customerRoleRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Customer role not found with id: " + id));
	}

	private void apply(CustomerRole entity, CustomerRoleRequestDto request) {
		entity.setCustomer(customerMainSetupService.getEntity(request.customerId()));
		entity.setRole(roleMasterSetupService.getEntity(request.roleId()));
		LinkedHashSet<CustomerServiceMaster> services = request.serviceIds().stream()
				.map(customerServiceSetupService::getEntity)
				.collect(java.util.stream.Collectors.toCollection(LinkedHashSet::new));
		entity.setServices(services);
		entity.setStatus(request.status().trim());
	}
}
