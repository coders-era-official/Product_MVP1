package com.amazing.technical.adminservice.serviceImpl;

import com.amazing.technical.adminservice.dto.AdminRequestDto;
import com.amazing.technical.adminservice.dto.AdminResponseDto;
import com.amazing.technical.adminservice.entity.Admin;
import com.amazing.technical.adminservice.exception.ResourceNotFoundException;
import com.amazing.technical.adminservice.repository.AdminRepository;
import com.amazing.technical.adminservice.service.AdminService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

	private final AdminRepository adminRepository;

	public AdminServiceImpl(AdminRepository adminRepository) {
		this.adminRepository = adminRepository;
	}

	@Override
	@Transactional(readOnly = true)
	public List<AdminResponseDto> findAll() {
		return adminRepository.findAll().stream().map(this::toResponse).toList();
	}

	@Override
	@Transactional(readOnly = true)
	public AdminResponseDto findById(Long id) {
		return adminRepository.findById(id).map(this::toResponse).orElseThrow(() -> new ResourceNotFoundException("Admin not found with id: " + id));
	}

	@Override
	@Transactional
	public AdminResponseDto create(AdminRequestDto request) {
		if (adminRepository.existsByUsername(request.getUsername())) {
			throw new DataIntegrityViolationException("Username already exists: " + request.getUsername());
		}
		if (adminRepository.existsByEmail(request.getEmail())) {
			throw new DataIntegrityViolationException("Email already exists: " + request.getEmail());
		}
		Admin admin = new Admin();
		admin.setUsername(request.getUsername().trim());
		admin.setEmail(request.getEmail().trim().toLowerCase());
		admin.setFullName(request.getFullName().trim());
		return toResponse(adminRepository.save(admin));
	}

	@Override
	@Transactional
	public AdminResponseDto update(Long id, AdminRequestDto request) {
		Admin admin = adminRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Admin not found with id: " + id));
		if (!admin.getUsername().equals(request.getUsername()) && adminRepository.existsByUsername(request.getUsername())) {
			throw new DataIntegrityViolationException("Username already exists: " + request.getUsername());
		}
		if (!admin.getEmail().equalsIgnoreCase(request.getEmail()) && adminRepository.existsByEmail(request.getEmail())) {
			throw new DataIntegrityViolationException("Email already exists: " + request.getEmail());
		}
		admin.setUsername(request.getUsername().trim());
		admin.setEmail(request.getEmail().trim().toLowerCase());
		admin.setFullName(request.getFullName().trim());
		return toResponse(adminRepository.save(admin));
	}

	@Override
	@Transactional
	public void deleteById(Long id) {
		if (!adminRepository.existsById(id)) {
			throw new ResourceNotFoundException("Admin not found with id: " + id);
		}
		adminRepository.deleteById(id);
	}

	private AdminResponseDto toResponse(Admin admin) {
		return new AdminResponseDto(
				admin.getId(),
				admin.getUsername(),
				admin.getEmail(),
				admin.getFullName(),
				admin.getCreatedAt());
	}
}
