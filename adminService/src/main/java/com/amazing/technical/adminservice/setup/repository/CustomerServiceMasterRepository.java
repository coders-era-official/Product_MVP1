package com.amazing.technical.adminservice.setup.repository;

import com.amazing.technical.adminservice.setup.entity.CustomerServiceMaster;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerServiceMasterRepository extends JpaRepository<CustomerServiceMaster, Long> {
	boolean existsByServiceNumber(Integer serviceNumber);
}
