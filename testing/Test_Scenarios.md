# Detailed Test Scenarios

## Scenario 1: Complete OPD Patient Journey

### Pre-requisites
- Admin user logged in
- Hospital setup completed
- Doctors registered with schedules

### Test Steps
1. **Patient Registration**
   - Navigate to Patient Registration
   - Fill patient details (name, age, contact, address)
   - Upload patient photo
   - Verify patient ID generation

2. **Appointment Booking**
   - Login as patient
   - Select department and doctor
   - Choose available time slot
   - Confirm appointment booking
   - Verify appointment confirmation

3. **Doctor Consultation**
   - Login as doctor
   - View patient appointment
   - Record consultation notes
   - Add diagnosis
   - Prescribe medications
   - Order lab tests if needed

4. **Pharmacy Processing**
   - Navigate to pharmacy module
   - Search patient prescription
   - Dispense medications
   - Update inventory
   - Generate pharmacy bill

5. **Lab Test Processing**
   - Process lab test orders
   - Enter test results
   - Generate lab reports
   - Notify patient/doctor

6. **Billing & Payment**
   - Generate consolidated bill
   - Apply insurance if applicable
   - Process payment
   - Generate receipt

### Expected Results
- Patient successfully registered with unique ID
- Appointment booked and confirmed
- Consultation completed with proper documentation
- Medications dispensed correctly
- Lab tests processed and reports generated
- Bill calculated accurately and payment processed

## Scenario 2: Complete IPD Patient Journey

### Pre-requisites
- Patient already registered in system
- Beds available in required ward
- Doctor with admission privileges

### Test Steps
1. **Patient Admission**
   - Search existing patient
   - Create admission request
   - Assign bed in appropriate ward
   - Set admission date/time
   - Assign primary doctor

2. **Daily Care Monitoring**
   - Record vital signs
   - Update treatment plans
   - Medication administration
   - Progress notes entry
   - Nursing care documentation

3. **Clinical Services**
   - Order lab tests
   - Schedule radiology exams
   - Pharmacy medication delivery
   - Specialist consultations

4. **Discharge Process**
   - Doctor discharge summary
   - Final medication list
   - Follow-up instructions
   - Discharge bill generation
   - Bed release

### Expected Results
- Patient admitted successfully with bed allocation
- Daily care properly documented
- All clinical services coordinated
- Discharge completed with proper documentation
- Final bill accurate and processed