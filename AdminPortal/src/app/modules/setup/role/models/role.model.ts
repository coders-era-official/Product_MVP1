export interface Role {
  id: string;
  roleName: string;
  roleCode: string;
  description: string;
  permissions: string[];
  status: 'Active' | 'Inactive';
  createdAt: Date;
}
