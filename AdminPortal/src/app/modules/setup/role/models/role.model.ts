export interface Role {
  id: number;
  roleName: string;
  roleCode: string;
  description: string;
  permissions: string[];
  status: 'Active' | 'Inactive';
  createdAt: string;
}

export interface RolePayload {
  roleName: string;
  roleCode: string;
  description: string;
  permissions: string[];
  status: Role['status'];
}
