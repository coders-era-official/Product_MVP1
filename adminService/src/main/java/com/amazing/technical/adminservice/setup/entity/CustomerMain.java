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
@Table(name = "AMCUSTOMERMAIN")
public class CustomerMain {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CUSTOMER_ID")
	private Long customerId;

	@Column(name = "FIRST_NAME", nullable = false, length = 80)
	private String firstName;

	@Column(name = "LAST_NAME", nullable = false, length = 80)
	private String lastName;

	@Column(name = "EMAIL", nullable = false, unique = true, length = 160)
	private String email;

	@Column(name = "PHONE", nullable = false, length = 30)
	private String phone;

	@Column(name = "COMPANY_NAME", nullable = false, length = 160)
	private String companyName;

	@Column(name = "COMPANY_TYPE", nullable = false, length = 60)
	private String companyType;

	@Column(name = "GST_NUMBER", length = 30)
	private String gstNumber;

	@Column(name = "COMPANY_SIZE", nullable = false, length = 40)
	private String companySize;

	@Column(name = "INDUSTRY", nullable = false, length = 80)
	private String industry;

	@Column(name = "ADDRESS_LINE1", nullable = false, length = 200)
	private String addressLine1;

	@Column(name = "ADDRESS_LINE2", length = 200)
	private String addressLine2;

	@Column(name = "CITY", nullable = false, length = 80)
	private String city;

	@Column(name = "STATE", nullable = false, length = 80)
	private String state;

	@Column(name = "PINCODE", nullable = false, length = 20)
	private String pincode;

	@Column(name = "COUNTRY", nullable = false, length = 80)
	private String country;

	@Column(name = "PLAN_NAME", nullable = false, length = 80)
	private String planName;

	@Column(name = "BILLING_CYCLE", nullable = false, length = 40)
	private String billingCycle;

	@Column(name = "STATUS", nullable = false, length = 20)
	private String status;

	@Column(name = "ONBOARDED_AT", nullable = false)
	private LocalDateTime onboardedAt;

	@OneToMany(mappedBy = "customer")
	private List<CustomerRole> customerRoles = new ArrayList<>();

	@PrePersist
	void prePersist() {
		if (onboardedAt == null) {
			onboardedAt = LocalDateTime.now();
		}
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getCompanyType() {
		return companyType;
	}

	public void setCompanyType(String companyType) {
		this.companyType = companyType;
	}

	public String getGstNumber() {
		return gstNumber;
	}

	public void setGstNumber(String gstNumber) {
		this.gstNumber = gstNumber;
	}

	public String getCompanySize() {
		return companySize;
	}

	public void setCompanySize(String companySize) {
		this.companySize = companySize;
	}

	public String getIndustry() {
		return industry;
	}

	public void setIndustry(String industry) {
		this.industry = industry;
	}

	public String getAddressLine1() {
		return addressLine1;
	}

	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}

	public String getAddressLine2() {
		return addressLine2;
	}

	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getPlanName() {
		return planName;
	}

	public void setPlanName(String planName) {
		this.planName = planName;
	}

	public String getBillingCycle() {
		return billingCycle;
	}

	public void setBillingCycle(String billingCycle) {
		this.billingCycle = billingCycle;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDateTime getOnboardedAt() {
		return onboardedAt;
	}

	public void setOnboardedAt(LocalDateTime onboardedAt) {
		this.onboardedAt = onboardedAt;
	}
}
