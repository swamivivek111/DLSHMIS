  export interface Employee{ 
     active: any;
      employeeId: Long;
      employeeCode: String;
      titleId: String;
      firstName: String;    
      middleName: String;
      lastName: String;
      gender: String;
      dob: String;
      joiningDate: String;
      designationId: String; 
      departmentId: Long;
      roleId: String;
      qualification: String;
      emailId: String;
      mobileNo: String;
      address: String;
      cityId: String;
      stateId: String;
      pincode: String;
      country: String;
      remark: Boolean;
      createdBy:  String;
    updatedBy:  String;
    createdAt:  LocalDateTime;
    updatedAt:  LocalDateTime; 
  }