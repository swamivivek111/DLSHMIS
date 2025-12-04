export interface Patient {
  id?: number;
  prnNo: string;
  prefix: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: string;
  age: number;
  mobileNumber: string;
  aadharNumber: string;
  address: string;
  // Legacy fields for backward compatibility
  name?: string;
  email?: string;
  dob?: string;
  phone?: string;
  aadharNo?: string;
  bloodGroup?: any;
  allergies?: string;
  cronicDisease?: string;
}

export interface PatientFormData {
  prnNo: string;
  prefix: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  age: number;
  mobileNumber: string;
  aadharNumber: string;
  address: string;
  departmentId: string;
  consultingDoctorId: string;
}