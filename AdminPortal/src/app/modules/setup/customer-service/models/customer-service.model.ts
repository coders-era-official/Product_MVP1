export interface CustomerService {
  id: string;
  serviceNumber: number;
  serviceName: string;
  categoryId: string;
  categoryName: string;
  description: string;
  status: 'Active' | 'Inactive';
  createdAt: Date;
}
