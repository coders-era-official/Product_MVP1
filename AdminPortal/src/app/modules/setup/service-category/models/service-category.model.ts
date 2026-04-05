export interface ServiceCategory {
  id: string;
  categoryNumber: number;
  categoryName: string;
  description: string;
  status: 'Active' | 'Inactive';
  createdAt: Date;
}
