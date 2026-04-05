export interface CustomerService {
  id: number;
  serviceNumber: number;
  serviceName: string;
  categoryId: number;
  categoryName: string;
  description: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

export interface CustomerServicePayload {
  serviceNumber: number;
  serviceName: string;
  categoryId: number;
  description: string;
  status: CustomerService['status'];
}
