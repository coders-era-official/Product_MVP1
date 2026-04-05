package com.amazing.technical.adminservice.setup.repository;

import com.amazing.technical.adminservice.setup.entity.ServiceCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceCategoryRepository extends JpaRepository<ServiceCategory, Long> {
	boolean existsByCategoryNumber(Integer categoryNumber);
}
