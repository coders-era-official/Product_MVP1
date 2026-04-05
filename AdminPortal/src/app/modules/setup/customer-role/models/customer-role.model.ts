export interface AssignedService {
  serviceId: string;
  serviceNumber: number;
  serviceName: string;
  categoryName: string;
}

export interface CustomerRoleAssignment {
  id: string;
  customerId: string;
  customerName: string;
  companyName: string;
  roleId: string;
  roleName: string;
  assignedServices: AssignedService[];
  assignedAt: Date;
  status: 'Active' | 'Inactive';
}
