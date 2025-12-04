export interface Employee {
  employeeId: number;
  employeeCode: string;
  titleId?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender?: string;
  dob?: string;
  joiningDate?: string;
  designationId?: string;
  departmentId?: number;
  roleId?: string;
  qualification?: string;
  emailId?: string;
  mobileNo?: string;
  address?: string;
  cityId?: string;
  stateId?: string;
  pincode?: string;
  country?: string;
  remark?: boolean;
  createdBy?: string;
  updatedBy?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}