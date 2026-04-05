package com.amazing.technical.adminservice.setup.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "AMUSERROLE")
public class UserRoleAssignment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "USER_ROLE_ID")
	private Long userRoleId;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "USER_ID", nullable = false)
	private UserMaster user;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "ROLE_ID", nullable = false)
	private RoleMaster role;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "CUSTOMER_ID", nullable = false)
	private CustomerMain customer;

	@ManyToMany
	@JoinTable(
			name = "AMUSERROLE_SERVICE_MAP",
			joinColumns = @JoinColumn(name = "USER_ROLE_ID"),
			inverseJoinColumns = @JoinColumn(name = "CUSTOMER_SERVICE_ID"))
	private Set<CustomerServiceMaster> services = new LinkedHashSet<>();

	@Column(name = "STATUS", nullable = false, length = 20)
	private String status;

	@Column(name = "ASSIGNED_AT", nullable = false)
	private LocalDateTime assignedAt;

	@PrePersist
	void prePersist() {
		if (assignedAt == null) {
			assignedAt = LocalDateTime.now();
		}
	}

	public Long getUserRoleId() {
		return userRoleId;
	}

	public void setUserRoleId(Long userRoleId) {
		this.userRoleId = userRoleId;
	}

	public UserMaster getUser() {
		return user;
	}

	public void setUser(UserMaster user) {
		this.user = user;
	}

	public RoleMaster getRole() {
		return role;
	}

	public void setRole(RoleMaster role) {
		this.role = role;
	}

	public CustomerMain getCustomer() {
		return customer;
	}

	public void setCustomer(CustomerMain customer) {
		this.customer = customer;
	}

	public Set<CustomerServiceMaster> getServices() {
		return services;
	}

	public void setServices(Set<CustomerServiceMaster> services) {
		this.services = services;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDateTime getAssignedAt() {
		return assignedAt;
	}

	public void setAssignedAt(LocalDateTime assignedAt) {
		this.assignedAt = assignedAt;
	}
}
