export interface Doctor {
    active: any;
    doctorId: Long;
    code: string;
    type: string;
    name: string;
    specialization: string;
    departmentId: string;
    qualification: String;  
    emailId: String;
    contactNumber: String;
    firstConsultationFees: Double;
    followUpFees: Double;
    joiningDate: String;
    panno: String;
    address:  String;
    city: String;
    district:  String;
    doctorShare:  String;
    createdBy:  String;
    updatedBy:  String;
    createdAt:  LocalDateTime;
    updatedAt:  LocalDateTime;
  } 
  