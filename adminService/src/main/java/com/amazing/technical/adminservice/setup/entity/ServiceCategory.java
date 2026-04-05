package com.amazing.technical.adminservice.setup.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "AMSERVICECATEGORY")
public class ServiceCategory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "SERVICE_CATEGORY_ID")
	private Long serviceCategoryId;

	@Column(name = "CATEGORY_NUMBER", nullable = false, unique = true)
	private Integer categoryNumber;

	@Column(name = "CATEGORY_NAME", nullable = false, length = 120)
	private String categoryName;

	@Column(name = "DESCRIPTION", length = 400)
	private String description;

	@Column(name = "STATUS", nullable = false, length = 20)
	private String status;

	@Column(name = "CREATED_AT", nullable = false)
	private LocalDateTime createdAt;

	@OneToMany(mappedBy = "serviceCategory")
	private List<CustomerServiceMaster> customerServices = new ArrayList<>();

	@PrePersist
	void prePersist() {
		if (createdAt == null) {
			createdAt = LocalDateTime.now();
		}
	}

	public Long getServiceCategoryId() {
		return serviceCategoryId;
	}

	public void setServiceCategoryId(Long serviceCategoryId) {
		this.serviceCategoryId = serviceCategoryId;
	}

	public Integer getCategoryNumber() {
		return categoryNumber;
	}

	public void setCategoryNumber(Integer categoryNumber) {
		this.categoryNumber = categoryNumber;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
}
