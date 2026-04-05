package com.amazing.technical.adminservice.setup.service;

import com.amazing.technical.adminservice.exception.ResourceNotFoundException;
import com.amazing.technical.adminservice.setup.dto.RoleRequestDto;
import com.amazing.technical.adminservice.setup.dto.RoleResponseDto;
import com.amazing.technical.adminservice.setup.entity.RoleMaster;
import com.amazing.technical.adminservice.setup.repository.RoleMasterRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RoleMasterSetupService {

	private final RoleMasterRepository roleMasterRepository;

	public RoleMasterSetupService(RoleMasterRepository roleMasterRepository) {
		this.roleMasterRepository = roleMasterRepository;
	}

	@Transactional(readOnly = true)
	public List<RoleResponseDto> findAll() {
		return roleMasterRepository.findAll().stream().map(SetupMapper::toResponse).toList();
	}

	@Transactional(readOnly = true)
	public RoleResponseDto findById(Long id) {
		return SetupMapper.toResponse(getEntity(id));
	}

	@Transactional
	public RoleResponseDto create(RoleRequestDto request) {
		String roleCode = request.roleCode().trim().toUpperCase();
		if (roleMasterRepository.existsByRoleCodeIgnoreCase(roleCode)) {
			throw new DataIntegrityViolationException("Role code already exists: " + roleCode);
		}
		RoleMaster entity = new RoleMaster();
		apply(entity, request, roleCode);
		return SetupMapper.toResponse(roleMasterRepository.save(entity));
	}

	@Transactional
	public RoleResponseDto update(Long id, RoleRequestDto request) {
		RoleMaster entity = getEntity(id);
		String roleCode = request.roleCode().trim().toUpperCase();
		if (!entity.getRoleCode().equalsIgnoreCase(roleCode) && roleMasterRepository.existsByRoleCodeIgnoreCase(roleCode)) {
			throw new DataIntegrityViolationException("Role code already exists: " + roleCode);
		}
		apply(entity, request, roleCode);
		return SetupMapper.toResponse(roleMasterRepository.save(entity));
	}

	@Transactional
	public void delete(Long id) {
		roleMasterRepository.delete(getEntity(id));
	}

	@Transactional(readOnly = true)
	public RoleMaster getEntity(Long id) {
		return roleMasterRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Role not found with id: " + id));
	}

	private void apply(RoleMaster entity, RoleRequestDto request, String roleCode) {
		entity.setRoleName(request.roleName().trim());
		entity.setRoleCode(roleCode);
		entity.setDescription(request.description() == null ? null : request.description().trim());
		entity.setPermissions(SetupMapper.joinPermissions(request.permissions()));
		entity.setStatus(request.status().trim());
	}
}
