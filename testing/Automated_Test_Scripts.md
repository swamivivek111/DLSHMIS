# Automated Test Scripts

## Postman Collection Structure

### Environment Variables
```json
{
  "baseUrl": "http://localhost:9000",
  "adminToken": "",
  "doctorToken": "",
  "patientToken": "",
  "patientId": "",
  "doctorId": "",
  "appointmentId": ""
}
```

## Test Execution Flow

### 1. Setup Phase
```javascript
// Pre-request Script
pm.test("Environment Setup", function () {
    pm.environment.set("timestamp", Date.now());
    pm.environment.set("randomEmail", "test" + Date.now() + "@hms.com");
});
```

### 2. Authentication Tests
```javascript
// Login Test
pm.test("Admin Login Success", function () {
    pm.response.to.have.status(200);
    const response = pm.response.json();
    pm.expect(response.token).to.exist;
    pm.environment.set("adminToken", response.token);
});
```

### 3. Patient Registration Test
```javascript
pm.test("Patient Registration", function () {
    pm.response.to.have.status(201);
    const response = pm.response.json();
    pm.expect(response.id).to.exist;
    pm.environment.set("patientId", response.id);
});
```

### 4. Appointment Booking Test
```javascript
pm.test("Appointment Booking", function () {
    pm.response.to.have.status(201);
    const response = pm.response.json();
    pm.expect(response.appointmentId).to.exist;
    pm.environment.set("appointmentId", response.appointmentId);
});
```

## Selenium WebDriver Tests

### Page Object Model Structure
```
tests/
├── pages/
│   ├── LoginPage.java
│   ├── PatientRegistrationPage.java
│   ├── AppointmentBookingPage.java
│   └── DashboardPage.java
├── tests/
│   ├── AuthenticationTest.java
│   ├── PatientJourneyTest.java
│   └── BillingTest.java
└── utils/
    ├── TestData.java
    └── WebDriverManager.java
```

### Sample Test Class
```java
@Test
public void completePatientJourney() {
    // Login as admin
    loginPage.login("admin@hms.com", "admin123");
    
    // Register patient
    String patientId = patientPage.registerPatient(testData.getPatientData());
    
    // Book appointment
    String appointmentId = appointmentPage.bookAppointment(patientId, doctorId);
    
    // Verify appointment
    assertTrue(appointmentPage.isAppointmentBooked(appointmentId));
}
```

## Performance Testing

### JMeter Test Plan
- **Thread Groups**: 100 concurrent users
- **Ramp-up Period**: 60 seconds
- **Test Duration**: 10 minutes
- **Key Scenarios**:
  - User login (50 threads)
  - Patient registration (30 threads)
  - Appointment booking (20 threads)

### Load Testing Metrics
- Response time < 2 seconds
- Throughput > 100 requests/second
- Error rate < 1%
- CPU utilization < 80%
- Memory usage < 85%