export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  companyType: string;
  gstNumber: string;
  companySize: string;
  industry: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  planName: string;
  billingCycle: string;
  status: 'Active' | 'Pending' | 'Inactive';
  onboardedAt: Date;
}
