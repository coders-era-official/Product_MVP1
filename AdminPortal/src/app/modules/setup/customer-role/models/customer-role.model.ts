export interface AssignedService {
  serviceId: number;
  serviceNumber: number;
  serviceName: string;
  categoryName: string;
}

export interface CustomerRoleAssignment {
  id: number;
  customerId: number | string;
  customerName: string;
  companyName: string;
  roleId: number;
  roleName: string;
  assignedServices: AssignedService[];
  assignedAt: string;
  status: 'Active' | 'Inactive';
}

export interface CustomerRolePayload {
  customerId: number | string;
  roleId: number;
  serviceIds: number[];
  status: CustomerRoleAssignment['status'];
}
