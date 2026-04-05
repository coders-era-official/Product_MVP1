package com.amazing.technical.adminservice.setup.repository;

import com.amazing.technical.adminservice.setup.entity.CustomerMain;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerMainRepository extends JpaRepository<CustomerMain, Long> {
	boolean existsByEmailIgnoreCase(String email);

	boolean existsByCustomerCode(String customerCode);

	CustomerMain findTopByOrderByCustomerCodeDesc();
}
