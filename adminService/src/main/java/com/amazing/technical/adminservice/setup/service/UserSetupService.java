package com.amazing.technical.adminservice.setup.service;

import com.amazing.technical.adminservice.exception.ResourceNotFoundException;
import com.amazing.technical.adminservice.setup.dto.UserRequestDto;
import com.amazing.technical.adminservice.setup.dto.UserResponseDto;
import com.amazing.technical.adminservice.setup.dto.UserStatusUpdateRequestDto;
import com.amazing.technical.adminservice.setup.entity.UserMaster;
import com.amazing.technical.adminservice.setup.repository.UserMasterRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserSetupService {

	private final UserMasterRepository userMasterRepository;

	public UserSetupService(UserMasterRepository userMasterRepository) {
		this.userMasterRepository = userMasterRepository;
	}

	@Transactional(readOnly = true)
	public List<UserResponseDto> findAll() {
		return userMasterRepository.findAll().stream().map(SetupMapper::toResponse).toList();
	}

	@Transactional(readOnly = true)
	public UserResponseDto findById(Long id) {
		return SetupMapper.toResponse(getEntity(id));
	}

	@Transactional
	public UserResponseDto create(UserRequestDto request) {
		if (userMasterRepository.existsByEmailIgnoreCase(request.email())) {
			throw new DataIntegrityViolationException("User email already exists: " + request.email());
		}
		UserMaster entity = new UserMaster();
		entity.setUserCode(nextUserCode());
		apply(entity, request);
		return SetupMapper.toResponse(userMasterRepository.save(entity));
	}

	@Transactional
	public UserResponseDto updateStatus(Long id, UserStatusUpdateRequestDto request) {
		UserMaster entity = getEntity(id);
		entity.setStatus(request.status().trim());
		return SetupMapper.toResponse(userMasterRepository.save(entity));
	}

	@Transactional(readOnly = true)
	public UserMaster getEntity(Long id) {
		return userMasterRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
	}

	private void apply(UserMaster entity, UserRequestDto request) {
		entity.setFirstName(request.firstName().trim());
		entity.setLastName(request.lastName().trim());
		entity.setEmail(request.email().trim().toLowerCase());
		entity.setPhone(request.phone().trim());
		entity.setPasswordHash(hashPassword(request.password()));
		entity.setStatus(request.status().trim());
	}

	private String nextUserCode() {
		UserMaster latest = userMasterRepository.findTopByOrderByUserCodeDesc();
		long nextNumber = 1L;
		if (latest != null && latest.getUserCode() != null && latest.getUserCode().startsWith("USR-")) {
			nextNumber = Long.parseLong(latest.getUserCode().substring(4)) + 1;
		}
		String candidate = "USR-" + String.format("%06d", nextNumber);
		while (userMasterRepository.existsByUserCode(candidate)) {
			nextNumber += 1;
			candidate = "USR-" + String.format("%06d", nextNumber);
		}
		return candidate;
	}

	private String hashPassword(String rawPassword) {
		return Integer.toHexString(rawPassword.hashCode());
	}
}
