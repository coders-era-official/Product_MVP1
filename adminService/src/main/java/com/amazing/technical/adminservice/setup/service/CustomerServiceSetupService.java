package com.amazing.technical.adminservice.setup.service;

import com.amazing.technical.adminservice.exception.ResourceNotFoundException;
import com.amazing.technical.adminservice.setup.dto.CustomerServiceRequestDto;
import com.amazing.technical.adminservice.setup.dto.CustomerServiceResponseDto;
import com.amazing.technical.adminservice.setup.entity.CustomerServiceMaster;
import com.amazing.technical.adminservice.setup.repository.CustomerServiceMasterRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomerServiceSetupService {

	private final CustomerServiceMasterRepository customerServiceMasterRepository;
	private final ServiceCategorySetupService serviceCategorySetupService;

	public CustomerServiceSetupService(
			CustomerServiceMasterRepository customerServiceMasterRepository,
			ServiceCategorySetupService serviceCategorySetupService) {
		this.customerServiceMasterRepository = customerServiceMasterRepository;
		this.serviceCategorySetupService = serviceCategorySetupService;
	}

	@Transactional(readOnly = true)
	public List<CustomerServiceResponseDto> findAll() {
		return customerServiceMasterRepository.findAll().stream().map(SetupMapper::toResponse).toList();
	}

	@Transactional(readOnly = true)
	public CustomerServiceResponseDto findById(Long id) {
		return SetupMapper.toResponse(getEntity(id));
	}

	@Transactional
	public CustomerServiceResponseDto create(CustomerServiceRequestDto request) {
		if (customerServiceMasterRepository.existsByServiceNumber(request.serviceNumber())) {
			throw new DataIntegrityViolationException("Service number already exists: " + request.serviceNumber());
		}
		CustomerServiceMaster entity = new CustomerServiceMaster();
		apply(entity, request);
		return SetupMapper.toResponse(customerServiceMasterRepository.save(entity));
	}

	@Transactional
	public CustomerServiceResponseDto update(Long id, CustomerServiceRequestDto request) {
		CustomerServiceMaster entity = getEntity(id);
		if (!entity.getServiceNumber().equals(request.serviceNumber()) && customerServiceMasterRepository.existsByServiceNumber(request.serviceNumber())) {
			throw new DataIntegrityViolationException("Service number already exists: " + request.serviceNumber());
		}
		apply(entity, request);
		return SetupMapper.toResponse(customerServiceMasterRepository.save(entity));
	}

	@Transactional
	public void delete(Long id) {
		customerServiceMasterRepository.delete(getEntity(id));
	}

	@Transactional(readOnly = true)
	public CustomerServiceMaster getEntity(Long id) {
		return customerServiceMasterRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Customer service not found with id: " + id));
	}

	private void apply(CustomerServiceMaster entity, CustomerServiceRequestDto request) {
		if (request.categoryId() == null) {
			throw new DataIntegrityViolationException("Category id is required for customer service.");
		}
		entity.setServiceNumber(request.serviceNumber());
		entity.setServiceName(request.serviceName().trim());
		entity.setServiceCategory(serviceCategorySetupService.getEntity(request.categoryId()));
		entity.setDescription(request.description() == null ? null : request.description().trim());
		entity.setStatus(request.status().trim());
	}
}
