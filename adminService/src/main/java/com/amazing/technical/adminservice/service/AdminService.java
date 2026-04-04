package com.amazing.technical.adminservice.service;

import com.amazing.technical.adminservice.dto.AdminRequestDto;
import com.amazing.technical.adminservice.dto.AdminResponseDto;

import java.util.List;

public interface AdminService {

	List<AdminResponseDto> findAll();

	AdminResponseDto findById(Long id);

	AdminResponseDto create(AdminRequestDto request);

	AdminResponseDto update(Long id, AdminRequestDto request);

	void deleteById(Long id);
}
