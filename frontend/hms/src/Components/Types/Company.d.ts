export interface Company {
  companyId?: number;
  companyCode: string;
  companyName: string;
  companyType: 'Corporate' | 'Insurance' | 'TPA';
  address?: string;
  email?: string;
  phone?: string;
  effectiveFrom?: string;
  effectiveTo?: string;
  orgPercentage?: string;
  empPercentage?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CompanyFormData {
  companyId?: string;
  companyCode: string;
  companyName: string;
  companyType: string;
  address: string;
  email: string;
  phone: string;
  effectiveFrom: string;
  effectiveTo: string;
  orgPercentage: string;
  empPercentage: string;
  isActive: boolean;
}