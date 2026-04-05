package com.amazing.technical.adminservice.setup.repository;

import com.amazing.technical.adminservice.setup.entity.RoleMaster;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleMasterRepository extends JpaRepository<RoleMaster, Long> {
	boolean existsByRoleCodeIgnoreCase(String roleCode);
}
