export interface User {
  id: string;
  userCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  status: 'Active' | 'Inactive';
  createdAt: Date;
}
