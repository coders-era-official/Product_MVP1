package com.amazing.technical.adminservice.setup.service;

import com.amazing.technical.adminservice.exception.ResourceNotFoundException;
import com.amazing.technical.adminservice.setup.dto.UserRoleRequestDto;
import com.amazing.technical.adminservice.setup.dto.UserRoleResponseDto;
import com.amazing.technical.adminservice.setup.entity.CustomerServiceMaster;
import com.amazing.technical.adminservice.setup.entity.UserRoleAssignment;
import com.amazing.technical.adminservice.setup.repository.UserRoleAssignmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashSet;
import java.util.List;

@Service
public class UserRoleSetupService {

	private final UserRoleAssignmentRepository userRoleAssignmentRepository;
	private final UserSetupService userSetupService;
	private final RoleMasterSetupService roleMasterSetupService;
	private final CustomerMainSetupService customerMainSetupService;
	private final CustomerServiceSetupService customerServiceSetupService;

	public UserRoleSetupService(
			UserRoleAssignmentRepository userRoleAssignmentRepository,
			UserSetupService userSetupService,
			RoleMasterSetupService roleMasterSetupService,
			CustomerMainSetupService customerMainSetupService,
			CustomerServiceSetupService customerServiceSetupService) {
		this.userRoleAssignmentRepository = userRoleAssignmentRepository;
		this.userSetupService = userSetupService;
		this.roleMasterSetupService = roleMasterSetupService;
		this.customerMainSetupService = customerMainSetupService;
		this.customerServiceSetupService = customerServiceSetupService;
	}

	@Transactional(readOnly = true)
	public List<UserRoleResponseDto> findAll() {
		return userRoleAssignmentRepository.findAll().stream().map(SetupMapper::toResponse).toList();
	}

	@Transactional(readOnly = true)
	public UserRoleResponseDto findById(Long id) {
		return SetupMapper.toResponse(getEntity(id));
	}

	@Transactional
	public UserRoleResponseDto create(UserRoleRequestDto request) {
		UserRoleAssignment entity = new UserRoleAssignment();
		apply(entity, request);
		return SetupMapper.toResponse(userRoleAssignmentRepository.save(entity));
	}

	@Transactional
	public UserRoleResponseDto update(Long id, UserRoleRequestDto request) {
		UserRoleAssignment entity = getEntity(id);
		apply(entity, request);
		return SetupMapper.toResponse(userRoleAssignmentRepository.save(entity));
	}

	@Transactional
	public void delete(Long id) {
		userRoleAssignmentRepository.delete(getEntity(id));
	}

	@Transactional(readOnly = true)
	public UserRoleAssignment getEntity(Long id) {
		return userRoleAssignmentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User role assignment not found with id: " + id));
	}

	private void apply(UserRoleAssignment entity, UserRoleRequestDto request) {
		entity.setUser(userSetupService.getEntity(request.userId()));
		entity.setRole(roleMasterSetupService.getEntity(request.roleId()));
		entity.setCustomer(customerMainSetupService.getEntity(request.customerId()));
		LinkedHashSet<CustomerServiceMaster> services = request.serviceIds().stream()
				.map(customerServiceSetupService::getEntity)
				.collect(java.util.stream.Collectors.toCollection(LinkedHashSet::new));
		entity.setServices(services);
		entity.setStatus(request.status().trim());
	}
}
