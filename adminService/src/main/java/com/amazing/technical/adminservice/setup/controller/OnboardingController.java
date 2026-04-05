package com.amazing.technical.adminservice.setup.controller;

import com.amazing.technical.adminservice.setup.dto.OnboardingCompleteRequestDto;
import com.amazing.technical.adminservice.setup.dto.OnboardingCompleteResponseDto;
import com.amazing.technical.adminservice.setup.service.OnboardingSetupService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/onboarding")
public class OnboardingController {

	private final OnboardingSetupService onboardingSetupService;

	public OnboardingController(OnboardingSetupService onboardingSetupService) {
		this.onboardingSetupService = onboardingSetupService;
	}

	@PostMapping("/complete")
	public ResponseEntity<OnboardingCompleteResponseDto> complete(@Valid @RequestBody OnboardingCompleteRequestDto request) {
		return ResponseEntity.ok(onboardingSetupService.complete(request));
	}
}
