export interface Room {
  id?: number;
  wardId: number;
  wardName?: string;
  roomNumber: string;
  roomType: string;
  floorNo: string;
  blockWing: string;
  maxBedsAllowed: number;
  roomStatus: string;
  // Financial fields
  roomChargesPerDay?: number;
  nursingCharges?: number;
  utilityCharges?: number;
  // Infrastructure fields
  hasOxygenPoint: boolean;
  hasVentilatorSupport: boolean;
  hasMonitor: boolean;
  isAC: boolean;
  hasAttachedWashroom: boolean;
}

export interface RoomFormData {
  wardId: string;
  roomNumber: string;
  roomType: string;
  floorNo: string;
  blockWing: string;
  maxBedsAllowed: number;
  roomStatus: string;
  // Financial fields
  roomChargesPerDay: number;
  nursingCharges: number;
  utilityCharges: number;
  // Infrastructure fields
  hasOxygenPoint: string;
  hasVentilatorSupport: string;
  hasMonitor: string;
  isAC: string;
  hasAttachedWashroom: string;
}