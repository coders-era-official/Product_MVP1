package com.amazing.technical.adminservice.setup.repository;

import com.amazing.technical.adminservice.setup.entity.CustomerRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRoleRepository extends JpaRepository<CustomerRole, Long> {
}
