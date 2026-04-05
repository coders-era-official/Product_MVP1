package com.amazing.technical.adminservice.setup.service;

import com.amazing.technical.adminservice.exception.ResourceNotFoundException;
import com.amazing.technical.adminservice.setup.dto.CustomerMainRequestDto;
import com.amazing.technical.adminservice.setup.dto.CustomerMainResponseDto;
import com.amazing.technical.adminservice.setup.entity.CustomerMain;
import com.amazing.technical.adminservice.setup.repository.CustomerMainRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomerMainSetupService {

	private final CustomerMainRepository customerMainRepository;

	public CustomerMainSetupService(CustomerMainRepository customerMainRepository) {
		this.customerMainRepository = customerMainRepository;
	}

	@Transactional(readOnly = true)
	public List<CustomerMainResponseDto> findAll() {
		return customerMainRepository.findAll().stream().map(SetupMapper::toResponse).toList();
	}

	@Transactional(readOnly = true)
	public CustomerMainResponseDto findById(Long id) {
		return SetupMapper.toResponse(getEntity(id));
	}

	@Transactional
	public CustomerMainResponseDto create(CustomerMainRequestDto request) {
		if (customerMainRepository.existsByEmailIgnoreCase(request.email())) {
			throw new DataIntegrityViolationException("Customer email already exists: " + request.email());
		}
		CustomerMain entity = new CustomerMain();
		apply(entity, request);
		return SetupMapper.toResponse(customerMainRepository.save(entity));
	}

	@Transactional
	public CustomerMainResponseDto update(Long id, CustomerMainRequestDto request) {
		CustomerMain entity = getEntity(id);
		if (!entity.getEmail().equalsIgnoreCase(request.email()) && customerMainRepository.existsByEmailIgnoreCase(request.email())) {
			throw new DataIntegrityViolationException("Customer email already exists: " + request.email());
		}
		apply(entity, request);
		return SetupMapper.toResponse(customerMainRepository.save(entity));
	}

	@Transactional
	public void delete(Long id) {
		customerMainRepository.delete(getEntity(id));
	}

	@Transactional(readOnly = true)
	public CustomerMain getEntity(Long id) {
		return customerMainRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + id));
	}

	private void apply(CustomerMain entity, CustomerMainRequestDto request) {
		entity.setFirstName(request.firstName().trim());
		entity.setLastName(request.lastName().trim());
		entity.setEmail(request.email().trim().toLowerCase());
		entity.setPhone(request.phone().trim());
		entity.setCompanyName(request.companyName().trim());
		entity.setCompanyType(request.companyType().trim());
		entity.setGstNumber(request.gstNumber() == null ? null : request.gstNumber().trim());
		entity.setCompanySize(request.companySize().trim());
		entity.setIndustry(request.industry().trim());
		entity.setAddressLine1(request.addressLine1().trim());
		entity.setAddressLine2(request.addressLine2() == null ? null : request.addressLine2().trim());
		entity.setCity(request.city().trim());
		entity.setState(request.state().trim());
		entity.setPincode(request.pincode().trim());
		entity.setCountry(request.country().trim());
		entity.setPlanName(request.planName().trim());
		entity.setBillingCycle(request.billingCycle().trim());
		entity.setStatus(request.status().trim());
	}
}
