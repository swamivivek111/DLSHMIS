# Hospital Management System (HMS) - Complete Documentation

A comprehensive, enterprise-grade Hospital Management System built with **React TypeScript Frontend** and **Spring Boot Microservices Architecture**.

## 🏥 System Overview

### Architecture
- **Frontend**: React 18 + TypeScript + Mantine UI + Redux Toolkit
- **Backend**: 16 Spring Boot Microservices + API Gateway
- **Database**: MySQL 8.0 with 16 specialized databases
- **Deployment**: Docker Compose with full containerization
- **Authentication**: JWT with refresh tokens + role-based access control

### Key Features
- **Multi-tenant Architecture** with role-based access (Admin, Doctor, Patient)
- **Real-time Notifications** and audit logging
- **Responsive Design** for mobile, tablet, and desktop
- **Comprehensive Patient Management** from OPD to IPD
- **Integrated Billing, Pharmacy, and Laboratory** systems
- **Advanced Reporting** and analytics

---

## 📁 Project Structure

```
DLSHMS/
├── backend/                    # 16 Spring Boot Microservices
│   ├── UserMS/                # Authentication & User Management
│   ├── ProfileMs/             # User Profiles (Admin/Doctor/Patient)
│   ├── AppointmentMS/         # Appointment Scheduling
│   ├── MasterMs/              # Master Data Management
│   ├── OPDMS/                 # OPD Patient Registration
│   ├── AuditMS/               # System Audit Logging
│   ├── NotificationMS/        # Notifications & Alerts
│   ├── BillingMS/             # Billing & Payments
│   ├── MedicalRecordsMS/      # Medical Records Management
│   ├── InventoryMS/           # Inventory Management
│   ├── LabMS/                 # Laboratory Management
│   ├── IPDMS/                 # In-Patient Department
│   ├── RadiologyMS/           # Radiology Services
│   ├── PharmacyMS/            # Pharmacy Management
│   ├── OTMS/                  # Operation Theater Management
│   └── GatewayMS/             # API Gateway & Routing
├── frontend/hms/              # React TypeScript Frontend
├── databases/                 # MySQL Database Schemas (16 DBs)
├── testing/                   # Test Suites & Documentation
└── [Configuration Files]
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Java 17+** (tested with Java 21)
- **Maven 3.6+** (tested with 3.9.11)
- **Node.js 18+** (tested with v22.20.0)
- **Docker Desktop** (tested with 4.16.1)
- **MySQL 8.0** (for local development)

### 1. Clone & Setup
```bash
git clone <repository-url>
cd DLSHMS
```

### 2. Build All Services
```bash
# Windows
build-all.bat

# Manual build for each service
cd backend/UserMS && mvn clean package -DskipTests
cd backend/ProfileMs && mvn clean package -DskipTests
# ... repeat for all 16 services
```

### 3. Start with Docker (Recommended)
```bash
# Start all 16 microservices + MySQL + Frontend
docker-compose up -d --build

# Check service status
final-status-check.bat
```

### 4. Start for Local Development
```bash
# Start MySQL locally
# Start each microservice in IDE/Spring Boot Dashboard
# Start frontend
cd frontend/hms
npm install
npm run dev
```

---

## 🌐 Service Architecture & API Endpoints

### Core Services (Port Mapping)

| Service | Port | Database | Primary Function |
|---------|------|----------|------------------|
| **UserMS** | 8081 | userdb | Authentication, User Management |
| **ProfileMs** | 8082 | profiledb | Admin/Doctor/Patient Profiles |
| **AppointmentMS** | 8083 | appointmentdb | Appointment Scheduling |
| **MasterMs** | 8084 | masterdb | Countries, States, Departments |
| **NotificationMS** | 8085 | notificationdb | Alerts & Notifications |
| **BillingMS** | 8086 | billingdb | Billing & Payment Processing |
| **MedicalRecordsMS** | 8087 | medicalrecordsdb | Patient Medical History |
| **InventoryMS** | 8088 | inventorydb | Medical Inventory Management |
| **LabMS** | 8089 | labdb | Laboratory Tests & Results |
| **OPDMS** | 8090 | opddb | OPD Patient Registration |
| **IPDMS** | 8091 | ipddb | In-Patient Department |
| **RadiologyMS** | 8092 | radiologydb | Radiology Services |
| **PharmacyMS** | 8093 | pharmacydb | Pharmacy Management |
| **OTMS** | 8094 | otdb | Operation Theater |
| **AuditMS** | 8095 | auditdb | System Audit Logging |
| **GatewayMS** | 9000 | - | API Gateway & Routing |

### Infrastructure Services

| Service | Port | Function |
|---------|------|----------|
| **Frontend** | 5173 | React Application |
| **MySQL** | 3306 | Database Server |

---

## 🔗 API Documentation & Testing

### Authentication APIs
```bash
# User Login
POST http://localhost:9000/user/login
Content-Type: application/json
{
  "email": "admin123@gmail.com",
  "password": "admin123"
}

# User Registration
POST http://localhost:9000/user/register
Content-Type: application/json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "PATIENT"
}

# Refresh Token
POST http://localhost:9000/user/refresh
Authorization: Bearer <refresh_token>
```

### Master Data APIs
```bash
# Get Countries
GET http://localhost:9000/master/countries

# Get States by Country
GET http://localhost:9000/master/states?countryId=1

# Get Cities by State
GET http://localhost:9000/master/cities?stateId=1

# Get Departments
GET http://localhost:9000/master/departments

# Get Blood Groups
GET http://localhost:9000/master/bloodgroups
```

### Profile Management APIs
```bash
# Get Admin Profile
GET http://localhost:9000/profile/admin/{id}
Authorization: Bearer <access_token>

# Get Doctor Profile
GET http://localhost:9000/profile/doctor/{id}
Authorization: Bearer <access_token>

# Get Patient Profile
GET http://localhost:9000/profile/patient/{id}
Authorization: Bearer <access_token>

# Update Profile
PUT http://localhost:9000/profile/admin/{id}
Authorization: Bearer <access_token>
Content-Type: application/json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com"
}
```

### Appointment Management APIs
```bash
# Get Appointments
GET http://localhost:9000/appointment/list
Authorization: Bearer <access_token>

# Create Appointment
POST http://localhost:9000/appointment/create
Authorization: Bearer <access_token>
Content-Type: application/json
{
  "patientId": 1,
  "doctorId": 2,
  "appointmentDate": "2024-12-01",
  "timeSlot": "10:00 AM"
}

# Update Appointment
PUT http://localhost:9000/appointment/update/{id}
Authorization: Bearer <access_token>

# Cancel Appointment
DELETE http://localhost:9000/appointment/{id}
Authorization: Bearer <access_token>
```

### OPD Registration APIs
```bash
# Register OPD Patient
POST http://localhost:9000/opd/register
Authorization: Bearer <access_token>
Content-Type: application/json
{
  "firstName": "John",
  "lastName": "Doe",
  "mobile": "9876543210",
  "age": 30,
  "gender": "MALE",
  "departmentId": 1,
  "consultingDoctorId": 2
}

# Get OPD Registrations
GET http://localhost:9000/opd/list
Authorization: Bearer <access_token>
```

### Billing APIs
```bash
# Generate Bill
POST http://localhost:9000/billing/generate
Authorization: Bearer <access_token>
Content-Type: application/json
{
  "patientId": 1,
  "services": [
    {"serviceId": 1, "quantity": 1, "amount": 500.00}
  ]
}

# Get Patient Bills
GET http://localhost:9000/billing/patient/{patientId}
Authorization: Bearer <access_token>
```

### Audit APIs
```bash
# Get Audit Logs
GET http://localhost:9000/audit/logs
Authorization: Bearer <access_token>

# Get User Activity
GET http://localhost:9000/audit/user/{userId}
Authorization: Bearer <access_token>
```

---

## 👥 User Roles & Access Control

### Admin Role
- **Full System Access**: All modules and functionalities
- **User Management**: Create, update, delete users
- **Master Data Management**: Countries, states, departments
- **System Configuration**: Application settings
- **Reports & Analytics**: Comprehensive reporting

### Doctor Role
- **Patient Management**: View and update patient records
- **Appointment Management**: Schedule and manage appointments
- **Medical Records**: Create and update medical histories
- **Prescription Management**: Create prescriptions
- **Laboratory Results**: View test results

### Patient Role
- **Profile Management**: Update personal information
- **Appointment Booking**: Schedule appointments with doctors
- **Medical History**: View personal medical records
- **Prescription Access**: View prescribed medications
- **Bill Payment**: View and pay bills

---

## 🗄️ Database Schema

### Database Structure (16 Databases)

| Database | Tables | Primary Purpose |
|----------|--------|-----------------|
| **userdb** | users, roles, permissions | User authentication & authorization |
| **profiledb** | admin_profiles, doctor_profiles, patient_profiles | User profile information |
| **masterdb** | countries, states, cities, departments, blood_groups | Master data management |
| **appointmentdb** | appointments, time_slots, schedules | Appointment scheduling |
| **opddb** | opd_registrations, patient_visits | OPD patient registration |
| **auditdb** | audit_logs, user_activities | System audit & logging |
| **billingdb** | bills, bill_items, payments | Billing & payment processing |
| **inventorydb** | items, stock, suppliers | Medical inventory management |
| **medicalrecordsdb** | medical_records, diagnoses, treatments | Patient medical history |
| **labdb** | lab_tests, test_results, reports | Laboratory management |
| **ipddb** | admissions, bed_allocations, discharges | In-patient department |
| **radiologydb** | radiology_orders, images, reports | Radiology services |
| **pharmacydb** | medicines, prescriptions, dispensing | Pharmacy management |
| **otdb** | surgeries, ot_bookings, equipment | Operation theater |
| **notificationdb** | notifications, alerts, messages | Notification system |
| **reportdb** | reports, analytics, dashboards | Reporting & analytics |

### Database Access
```bash
# Access MySQL in Docker
docker exec -it hms-mysql mysql -u root -proot

# Show all databases
SHOW DATABASES;

# Use specific database
USE userdb;
SHOW TABLES;

# Sample queries
SELECT * FROM users WHERE role = 2;  -- Admin users
SELECT * FROM appointments WHERE appointment_date = CURDATE();
```

---

## 🎨 Frontend Architecture

### Technology Stack
- **React 18** with TypeScript
- **Mantine UI** components library
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Axios** for API communication
- **Tailwind CSS** for styling
- **Framer Motion** for animations

### Key Components
```
src/
├── Components/
│   ├── Auth/              # Login, Register components
│   ├── Dashboard/         # Dashboard layouts
│   ├── OPD/              # OPD registration forms
│   ├── Appointments/     # Appointment management
│   ├── Profile/          # User profile components
│   └── Common/           # Reusable components
├── Pages/
│   ├── AdminDashboard/   # Admin-specific pages
│   ├── DoctorDashboard/  # Doctor-specific pages
│   └── PatientDashboard/ # Patient-specific pages
├── Services/
│   ├── AuthService/      # Authentication APIs
│   ├── ProfileService/   # Profile management APIs
│   └── AppointmentService/ # Appointment APIs
├── Slices/               # Redux state slices
├── Routes/               # Route configurations
└── Utility/              # Helper functions
```

### Environment Configuration
```bash
# .env file
VITE_API_BASE_URL=http://localhost:9000
VITE_APP_NAME=Hospital Management System
VITE_VERSION=1.0.0
```

---

## 🔧 Development Workflow

### Local Development Setup
```bash
# 1. Start MySQL locally
mysql -u root -p
CREATE DATABASE userdb;
# ... create other databases

# 2. Start each microservice in IDE
# Configure application.properties with localhost URLs

# 3. Start frontend
cd frontend/hms
npm install
npm run dev
```

### Docker Development
```bash
# 1. Build all services
build-all.bat

# 2. Start with Docker Compose
docker-compose up -d --build

# 3. Check service health
final-status-check.bat

# 4. View logs
docker-compose logs -f hms-userms
```

### Testing
```bash
# Backend testing
cd backend/UserMS
mvn test

# Frontend testing
cd frontend/hms
npm run test

# API testing with curl
curl -X POST http://localhost:9000/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin123@gmail.com","password":"admin123"}'
```

---

## 🔐 Security Features

### Authentication & Authorization
- **JWT Tokens** with access and refresh token mechanism
- **Role-based Access Control** (RBAC)
- **Password Encryption** using BCrypt
- **Token Expiration** and automatic refresh
- **CORS Configuration** for cross-origin requests

### API Security
- **Gateway-level Authentication** for all protected routes
- **Request/Response Logging** for audit trails
- **Rate Limiting** and request throttling
- **Input Validation** and sanitization
- **SQL Injection Prevention**

### Demo Credentials
```bash
# Admin Users
Email: admin123@gmail.com | Password: admin123
Email: admin@gmail.com | Password: admin123
Email: swami@gmail.com | Password: admin123

# Doctor Users
Email: doctor@gmail.com | Password: doctor123
Email: drpawan@gmail.com | Password: doctor123

# Patient Users
Email: patient@gmail.com | Password: patient123
```

---

## 📊 Monitoring & Logging

### Health Checks
```bash
# Service health endpoints
GET http://localhost:8081/actuator/health  # UserMS
GET http://localhost:8082/actuator/health  # ProfileMs
# ... for all services

# Database health
docker exec hms-mysql mysqladmin ping -u root -proot
```

### Logging
- **Application Logs**: Each service logs to console and files
- **Audit Logs**: User activities tracked in AuditMS
- **Access Logs**: Gateway logs all API requests
- **Error Logs**: Comprehensive error tracking and reporting

### Monitoring Scripts
```bash
# Check all services
check-services.bat

# Final system status
final-status-check.bat

# Test specific functionality
test-audit.bat
test-logout-audit.bat
```

---

## 🚀 Deployment Guide

### Docker Production Deployment
```bash
# 1. Build production images
docker-compose -f docker-compose.prod.yml build

# 2. Deploy with environment variables
docker-compose -f docker-compose.prod.yml up -d

# 3. Configure reverse proxy (nginx)
# 4. Set up SSL certificates
# 5. Configure monitoring and logging
```

### Environment-Specific Configuration
- **Local**: `application.properties` with localhost URLs
- **Docker**: `application-docker.properties` with container names
- **Production**: Environment variables override

---

## 📈 Performance & Scalability

### Optimization Features
- **Connection Pooling** for database connections
- **Caching Strategies** for frequently accessed data
- **Lazy Loading** in frontend components
- **Code Splitting** for optimized bundle sizes
- **Database Indexing** for query optimization

### Scalability
- **Microservices Architecture** allows independent scaling
- **Load Balancing** support through API Gateway
- **Database Sharding** capabilities
- **Horizontal Scaling** with Docker Swarm/Kubernetes

---

## 🧪 Testing Strategy

### Test Coverage
- **Unit Tests**: Individual service testing
- **Integration Tests**: Service-to-service communication
- **API Tests**: Comprehensive API endpoint testing
- **E2E Tests**: Complete user workflow testing
- **Performance Tests**: Load and stress testing

### Test Execution
```bash
# Run all tests
cd testing/
./run-all-tests.sh

# Specific test suites
./api-tests.sh
./e2e-tests.sh
./performance-tests.sh
```

---

## 📚 Documentation

### Available Documentation
- **API Documentation**: Swagger/OpenAPI specs for each service
- **Database Schema**: Complete ERD and table structures
- **Deployment Guide**: Step-by-step deployment instructions
- **User Manual**: End-user documentation
- **Developer Guide**: Technical implementation details

### Additional Resources
- **Test Scenarios**: `testing/Test_Scenarios.md`
- **API Test Suite**: `testing/API_Test_Suite.md`
- **E2E Testing**: `testing/E2E_Testing_Strategy.md`
- **Advanced Features**: `ADVANCED_FEATURES_COMPLETE.md`

---

## 🤝 Contributing

### Development Guidelines
1. Follow microservices best practices
2. Maintain consistent coding standards
3. Write comprehensive tests
4. Update documentation
5. Use conventional commit messages

### Code Structure
- **Backend**: Spring Boot with layered architecture
- **Frontend**: Component-based React architecture
- **Database**: Normalized schema design
- **API**: RESTful design principles

---

## 📞 Support & Maintenance

### System Status
- ✅ **All 16 Microservices**: Operational
- ✅ **Database**: 16 databases initialized
- ✅ **Frontend**: Responsive and functional
- ✅ **Authentication**: JWT-based security
- ✅ **API Gateway**: Routing and security

### Troubleshooting
- Check service logs: `docker logs hms-[service-name]`
- Verify database connectivity
- Test API endpoints individually
- Review configuration files
- Run diagnostic scripts

### Contact Information
- **Technical Support**: Check logs and diagnostic scripts
- **Documentation**: Comprehensive guides available
- **Issues**: Use provided troubleshooting guides

---

**System Version**: 1.0.0  
**Last Updated**: November 2024  
**Status**: ✅ Production Ready  
**Architecture**: Microservices with React Frontend  
**Deployment**: Docker Compose Ready