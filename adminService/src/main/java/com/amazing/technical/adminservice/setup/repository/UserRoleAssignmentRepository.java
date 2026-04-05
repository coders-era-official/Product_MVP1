package com.amazing.technical.adminservice.setup.repository;

import com.amazing.technical.adminservice.setup.entity.UserRoleAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleAssignmentRepository extends JpaRepository<UserRoleAssignment, Long> {
}
