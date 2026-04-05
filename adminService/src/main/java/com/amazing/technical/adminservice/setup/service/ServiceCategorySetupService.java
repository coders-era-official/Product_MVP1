package com.amazing.technical.adminservice.setup.service;

import com.amazing.technical.adminservice.exception.ResourceNotFoundException;
import com.amazing.technical.adminservice.setup.dto.ServiceCategoryRequestDto;
import com.amazing.technical.adminservice.setup.dto.ServiceCategoryResponseDto;
import com.amazing.technical.adminservice.setup.entity.ServiceCategory;
import com.amazing.technical.adminservice.setup.repository.ServiceCategoryRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ServiceCategorySetupService {

	private final ServiceCategoryRepository serviceCategoryRepository;

	public ServiceCategorySetupService(ServiceCategoryRepository serviceCategoryRepository) {
		this.serviceCategoryRepository = serviceCategoryRepository;
	}

	@Transactional(readOnly = true)
	public List<ServiceCategoryResponseDto> findAll() {
		return serviceCategoryRepository.findAll().stream().map(SetupMapper::toResponse).toList();
	}

	@Transactional(readOnly = true)
	public ServiceCategoryResponseDto findById(Long id) {
		return SetupMapper.toResponse(getEntity(id));
	}

	@Transactional
	public ServiceCategoryResponseDto create(ServiceCategoryRequestDto request) {
		if (serviceCategoryRepository.existsByCategoryNumber(request.categoryNumber())) {
			throw new DataIntegrityViolationException("Category number already exists: " + request.categoryNumber());
		}
		ServiceCategory entity = new ServiceCategory();
		apply(entity, request);
		return SetupMapper.toResponse(serviceCategoryRepository.save(entity));
	}

	@Transactional
	public ServiceCategoryResponseDto update(Long id, ServiceCategoryRequestDto request) {
		ServiceCategory entity = getEntity(id);
		if (!entity.getCategoryNumber().equals(request.categoryNumber()) && serviceCategoryRepository.existsByCategoryNumber(request.categoryNumber())) {
			throw new DataIntegrityViolationException("Category number already exists: " + request.categoryNumber());
		}
		apply(entity, request);
		return SetupMapper.toResponse(serviceCategoryRepository.save(entity));
	}

	@Transactional
	public void delete(Long id) {
		serviceCategoryRepository.delete(getEntity(id));
	}

	@Transactional(readOnly = true)
	public ServiceCategory getEntity(Long id) {
		return serviceCategoryRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Service category not found with id: " + id));
	}

	private void apply(ServiceCategory entity, ServiceCategoryRequestDto request) {
		entity.setCategoryNumber(request.categoryNumber());
		entity.setCategoryName(request.categoryName().trim());
		entity.setDescription(request.description() == null ? null : request.description().trim());
		entity.setStatus(request.status().trim());
	}
}
