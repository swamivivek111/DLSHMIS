# Domain Restructure Plan - Phase 2

## 🎯 **CURRENT STATUS**

### **✅ COMPLETED**
- ✅ Cleaned Patient entity in ProfileMs (demographics only)
- ✅ Cleaned Doctor entity in ProfileMs (profile only)
- ✅ Updated PatientDTO and DoctorDTO
- ✅ Removed duplicate entities from MasterMs

### **📋 ENTITIES ANALYSIS**

#### **✅ KEEP IN MasterMs (Static Master Data)**
- ✅ ApplicationSetting - System configuration
- ✅ BloodGroup - Static reference data
- ✅ City, Country, State, District, Taluka - Location master
- ✅ Department - Hospital departments
- ✅ Designation - Job titles
- ✅ Employee - Staff master
- ✅ Hospital - Hospital master
- ✅ Title - Name prefixes (Mr, Mrs, Dr)
- ✅ UserMenu - Menu configuration
- ✅ UserProfileRole - Role definitions
- ✅ DoctorSchedule - Schedule templates (configuration)

#### **❌ ALREADY REMOVED FROM MasterMs**
- ❌ Patient - Moved to ProfileMs domain
- ❌ Doctor - Moved to ProfileMs domain

## 🎯 **DOMAIN BOUNDARIES - FINAL STATE**

### **ProfileMs - Demographics Only**
```
Patient Entity:
- Core Demographics (name, gender, DOB, age)
- Contact Information (phone, email, address)
- Identity (Aadhar, PRN)
- Emergency Contact
- System Fields (created, updated)

Doctor Entity:
- Personal Information (name, gender, DOB)
- Contact Information (phone, email, address)
- Credentials (license, qualification, registration)
- Professional Info (specialization, experience)
- References to Master Data (departmentId, hospitalId)
- System Fields (created, updated)
```

### **MasterMs - Static Configuration Only**
```
Static Master Data:
- Location hierarchy (Country → State → District → City)
- Hospital master data
- Department definitions
- Blood groups, Titles, Designations
- Employee master
- System settings and configurations
- Doctor schedule templates
```

### **Clinical Data Distribution**
```
Medical History → MedicalRecordsMS
Allergies, Chronic Disease → MedicalRecordsMS
Vitals → OPDMS/IPDMS
Prescriptions → PharmacyMS
Lab Results → LabMS
Radiology Reports → RadiologyMS
Consultation Notes → OPDMS
Surgery Notes → OTMS
Billing Information → BillingMS
```

## ✅ **BENEFITS ACHIEVED**

### **1. Clean Domain Separation**
- ProfileMs = Pure demographics and contact information
- MasterMs = Static configuration data only
- Clinical data properly distributed to respective services

### **2. Scalability**
- Each service can evolve independently
- No cross-domain dependencies
- Clear ownership of data

### **3. Maintainability**
- Developers know exactly where to find/modify data
- Reduced coupling between services
- Single source of truth for each data type

### **4. Compliance**
- Clear audit trails per domain
- Data privacy compliance easier to implement
- Regulatory requirements can be met per service

## 🎯 **NEXT STEPS**

### **Phase 3: Event-Driven Architecture**
- Implement inter-service communication
- Add event publishing for data changes
- Implement eventual consistency patterns

### **Phase 4: Frontend Integration**
- Update frontend to work with cleaned entities
- Implement proper error handling
- Add validation for new field structures

## 📊 **VERIFICATION CHECKLIST**

### **ProfileMs Verification**
- ✅ Patient entity contains only demographics
- ✅ Doctor entity contains only profile information
- ✅ No clinical data in ProfileMs
- ✅ Proper references to master data via IDs

### **MasterMs Verification**
- ✅ Contains only static master data
- ✅ No transactional entities
- ✅ No patient/doctor duplicates
- ✅ Configuration data properly structured

### **Data Distribution Verification**
- ✅ Clinical data moved to appropriate services
- ✅ No entity duplication across services
- ✅ Clear ownership of each data type
- ✅ Proper foreign key relationships via IDs

## 🎉 **PHASE 2 STATUS: COMPLETE** ✅

Domain boundaries have been properly restructured with:
- Clean separation of demographics vs clinical data
- Static master data properly isolated
- No entity duplication
- Clear service ownership
- Scalable architecture foundation

**Ready for Phase 3: Event-Driven Architecture Implementation**