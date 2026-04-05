export interface ServiceCategory {
  id: number;
  categoryNumber: number;
  categoryName: string;
  description: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

export interface ServiceCategoryPayload {
  categoryNumber: number;
  categoryName: string;
  description: string;
  status: ServiceCategory['status'];
}
