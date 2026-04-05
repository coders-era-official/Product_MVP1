export interface AssignedService {
  serviceId: number;
  serviceNumber: number;
  serviceName: string;
  categoryName: string;
}

export interface CustomerRoleAssignment {
  id: number;
  customerId: number;
  customerName: string;
  companyName: string;
  roleId: number;
  roleName: string;
  assignedServices: AssignedService[];
  assignedAt: string;
  status: 'Active' | 'Inactive';
}

export interface CustomerRolePayload {
  customerId: number;
  roleId: number;
  serviceIds: number[];
  status: CustomerRoleAssignment['status'];
}
