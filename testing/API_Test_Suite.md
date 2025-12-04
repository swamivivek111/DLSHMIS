# API Test Suite

## Authentication APIs
```
POST /user/register
POST /user/login  
POST /user/refresh
POST /user/logout
```

## Master Data APIs
```
GET /master/countries
GET /master/states/{countryId}
GET /master/cities/{stateId}
GET /master/departments
GET /master/bloodgroups
```

## Profile Management APIs
```
POST /profile/patient/create
GET /profile/patient/{id}
PUT /profile/patient/{id}
POST /profile/doctor/create
GET /profile/doctor/{id}
PUT /profile/doctor/{id}
```

## Appointment APIs
```
POST /appointment/book
GET /appointment/patient/{patientId}
GET /appointment/doctor/{doctorId}
PUT /appointment/{id}/status
```

## OPD APIs
```
POST /opd/consultation/create
GET /opd/consultation/{id}
PUT /opd/consultation/{id}
GET /opd/queue/doctor/{doctorId}
```

## IPD APIs
```
POST /ipd/admission/create
GET /ipd/admission/{id}
PUT /ipd/admission/{id}/discharge
GET /ipd/beds/available
```

## Medical Records APIs
```
POST /medical-records/create
GET /medical-records/patient/{patientId}
PUT /medical-records/{id}
```

## Laboratory APIs
```
POST /lab/test/order
GET /lab/test/{id}
PUT /lab/test/{id}/result
GET /lab/reports/patient/{patientId}
```

## Radiology APIs
```
POST /radiology/exam/schedule
GET /radiology/exam/{id}
PUT /radiology/exam/{id}/report
```

## Pharmacy APIs
```
POST /pharmacy/prescription/dispense
GET /pharmacy/inventory
PUT /pharmacy/inventory/{medicineId}
```

## Billing APIs
```
POST /billing/generate
GET /billing/{id}
PUT /billing/{id}/payment
GET /billing/patient/{patientId}
```

## Notification APIs
```
GET /notification/user/{userId}
POST /notification/send
PUT /notification/{id}/read
```

## Audit APIs
```
GET /audit/logs
GET /audit/logs/user/{userId}
GET /audit/logs/export
```

## Test Data Validation
- Response status codes (200, 201, 400, 401, 404, 500)
- Response body structure validation
- Data integrity checks
- Performance benchmarks
- Security validations