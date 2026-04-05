package com.amazing.technical.adminservice.setup.repository;

import com.amazing.technical.adminservice.setup.entity.UserMaster;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserMasterRepository extends JpaRepository<UserMaster, Long> {
	boolean existsByEmailIgnoreCase(String email);

	boolean existsByUserCode(String userCode);

	UserMaster findTopByOrderByUserCodeDesc();
}
