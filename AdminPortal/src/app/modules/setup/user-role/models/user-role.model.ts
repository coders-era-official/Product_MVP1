export interface UserAssignedService {
  serviceId: string;
  serviceNumber: number;
  serviceName: string;
  categoryName: string;
}

export interface UserRoleAssignment {
  id: string;
  userId: string;
  userCode: string;
  userName: string;
  roleId: string;
  roleName: string;
  roleCode: string;
  customerId: string;
  customerCode: string;
  customerName: string;
  companyName: string;
  assignedServices: UserAssignedService[];
  assignedAt: Date;
  status: 'Active' | 'Inactive';
}

export interface UserRoleAssignmentPayload {
  userId: string;
  userCode: string;
  userName: string;
  roleId: string;
  roleName: string;
  roleCode: string;
  customerId: string;
  customerCode: string;
  customerName: string;
  companyName: string;
  assignedServices: UserAssignedService[];
  status: 'Active' | 'Inactive';
}
