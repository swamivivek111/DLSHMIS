export interface PatientCategory {
  categoryId?: number;
  categoryCode: string;
  categoryName: string;
  description?: string;
  discountPercentage?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}