export interface Ward {
  id?: number;
  wardName: string;
  wardType: string;
  floorNo: string;
  blockBuildingName: string;
  description: string;
  departmentId: number;
  departmentName?: string;
  status: string;
}

export interface WardFormData {
  wardName: string;
  wardType: string;
  floorNo: string;
  blockBuildingName: string;
  description: string;
  departmentId: string;
  status: string;
}