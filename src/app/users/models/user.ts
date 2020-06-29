import { Address } from './address';
import { Company } from './company';

export interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
