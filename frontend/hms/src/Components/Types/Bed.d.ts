export interface Bed {
  id?: number;
  wardId: number;
  wardName?: string;
  roomId: number;
  roomNumber?: string;
  bedNumber: string;
  bedType: string;
  bedStatus: string;
  currentPatientId?: number;
  lastCleanedDate?: string;
  // Billing fields
  bedChargesPerDay: number;
  ventilatorCharge: number;
  monitorCharge: number;
  nursingCharge: number;
  specialEquipmentCharge: number;
  // Infrastructure fields
  oxygenPointAvailable: boolean;
  monitorAvailable: boolean;
  suctionPointAvailable: boolean;
}

export interface BedFormData {
  wardId: string;
  roomId: string;
  bedNumber: string;
  bedType: string;
  bedStatus: string;
  currentPatientId: string;
  lastCleanedDate: Date | null;
  // Billing fields
  bedChargesPerDay: number;
  ventilatorCharge: number;
  monitorCharge: number;
  nursingCharge: number;
  specialEquipmentCharge: number;
  // Infrastructure fields
  oxygenPointAvailable: string;
  monitorAvailable: string;
  suctionPointAvailable: string;
}