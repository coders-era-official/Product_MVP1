package com.amazing.technical.adminservice.setup.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "AMCUSTOMERSERVICE")
public class CustomerServiceMaster {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CUSTOMER_SERVICE_ID")
	private Long customerServiceId;

	@Column(name = "SERVICE_NUMBER", nullable = false, unique = true)
	private Integer serviceNumber;

	@Column(name = "SERVICE_NAME", nullable = false, length = 120)
	private String serviceName;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "SERVICE_CATEGORY_ID", nullable = false)
	private ServiceCategory serviceCategory;

	@Column(name = "DESCRIPTION", length = 400)
	private String description;

	@Column(name = "STATUS", nullable = false, length = 20)
	private String status;

	@Column(name = "CREATED_AT", nullable = false)
	private LocalDateTime createdAt;

	@ManyToMany(mappedBy = "services")
	private List<CustomerRole> customerRoles = new ArrayList<>();

	@PrePersist
	void prePersist() {
		if (createdAt == null) {
			createdAt = LocalDateTime.now();
		}
	}

	public Long getCustomerServiceId() {
		return customerServiceId;
	}

	public void setCustomerServiceId(Long customerServiceId) {
		this.customerServiceId = customerServiceId;
	}

	public Integer getServiceNumber() {
		return serviceNumber;
	}

	public void setServiceNumber(Integer serviceNumber) {
		this.serviceNumber = serviceNumber;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public ServiceCategory getServiceCategory() {
		return serviceCategory;
	}

	public void setServiceCategory(ServiceCategory serviceCategory) {
		this.serviceCategory = serviceCategory;
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
