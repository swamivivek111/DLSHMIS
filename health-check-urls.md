# HMS Microservices Health Check & Swagger URLs

## Health Check URLs (Direct Access)
- **UserMS**: http://localhost:8081/actuator/health
- **ProfileMs**: http://localhost:8082/actuator/health
- **AppointmentMS**: http://localhost:8083/actuator/health
- **MasterMs**: http://localhost:8084/actuator/health
- **NotificationMS**: http://localhost:8085/actuator/health
- **BillingMS**: http://localhost:8086/actuator/health
- **MedicalRecordsMS**: http://localhost:8087/actuator/health
- **InventoryMS**: http://localhost:8088/actuator/health
- **LabMS**: http://localhost:8089/actuator/health
- **OPDMS**: http://localhost:8090/actuator/health
- **IPDMS**: http://localhost:8091/actuator/health
- **RadiologyMS**: http://localhost:8092/actuator/health
- **PharmacyMS**: http://localhost:8093/actuator/health
- **OTMS**: http://localhost:8094/actuator/health
- **AuditMS**: http://localhost:8095/actuator/health
- **GatewayMS**: http://localhost:9000/actuator/health

## Health Check URLs (Through Gateway)
- **UserMS**: http://localhost:9000/user/actuator/health
- **ProfileMs**: http://localhost:9000/profile/actuator/health
- **AppointmentMS**: http://localhost:9000/appointment/actuator/health
- **MasterMs**: http://localhost:9000/master/actuator/health
- **NotificationMS**: http://localhost:9000/notification/actuator/health
- **BillingMS**: http://localhost:9000/billing/actuator/health
- **MedicalRecordsMS**: http://localhost:9000/medicalrecords/actuator/health
- **InventoryMS**: http://localhost:9000/inventory/actuator/health
- **LabMS**: http://localhost:9000/lab/actuator/health
- **OPDMS**: http://localhost:9000/opd/actuator/health
- **IPDMS**: http://localhost:9000/ipd/actuator/health
- **RadiologyMS**: http://localhost:9000/radiology/actuator/health
- **PharmacyMS**: http://localhost:9000/pharmacy/actuator/health
- **OTMS**: http://localhost:9000/ot/actuator/health
- **AuditMS**: http://localhost:9000/audit/actuator/health

## Swagger URLs (Direct Access)
- **UserMS**: http://localhost:8081/swagger-ui.html
- **ProfileMs**: http://localhost:8082/swagger-ui.html
- **AppointmentMS**: http://localhost:8083/swagger-ui.html
- **MasterMs**: http://localhost:8084/swagger-ui.html
- **NotificationMS**: http://localhost:8085/swagger-ui.html
- **BillingMS**: http://localhost:8086/swagger-ui.html
- **MedicalRecordsMS**: http://localhost:8087/swagger-ui.html
- **InventoryMS**: http://localhost:8088/swagger-ui.html
- **LabMS**: http://localhost:8089/swagger-ui.html
- **OPDMS**: http://localhost:8090/swagger-ui.html
- **IPDMS**: http://localhost:8091/swagger-ui.html
- **RadiologyMS**: http://localhost:8092/swagger-ui.html
- **PharmacyMS**: http://localhost:8093/swagger-ui.html
- **OTMS**: http://localhost:8094/swagger-ui.html
- **AuditMS**: http://localhost:8095/swagger-ui.html

## API Documentation URLs (Direct Access)
- **UserMS**: http://localhost:8081/api-docs
- **ProfileMs**: http://localhost:8082/api-docs
- **AppointmentMS**: http://localhost:8083/api-docs
- **MasterMs**: http://localhost:8084/api-docs
- **NotificationMS**: http://localhost:8085/api-docs
- **BillingMS**: http://localhost:8086/api-docs
- **MedicalRecordsMS**: http://localhost:8087/api-docs
- **InventoryMS**: http://localhost:8088/api-docs
- **LabMS**: http://localhost:8089/api-docs
- **OPDMS**: http://localhost:8090/api-docs
- **IPDMS**: http://localhost:8091/api-docs
- **RadiologyMS**: http://localhost:8092/api-docs
- **PharmacyMS**: http://localhost:8093/api-docs
- **OTMS**: http://localhost:8094/api-docs
- **AuditMS**: http://localhost:8095/api-docs

## Frontend & Database
- **Frontend**: http://localhost:5173
- **MySQL Database**: localhost:3306 (root/root)

## Test API Endpoints
- **Login**: POST http://localhost:9000/user/login
- **OPD Test**: GET http://localhost:9000/opd/patient-registration/test
- **Master Data**: GET http://localhost:9000/master/department/getall

## Quick Health Check Script
```bash
# Check all services
curl http://localhost:8081/actuator/health
curl http://localhost:8082/actuator/health
curl http://localhost:8083/actuator/health
curl http://localhost:8084/actuator/health
curl http://localhost:8085/actuator/health
curl http://localhost:8086/actuator/health
curl http://localhost:8087/actuator/health
curl http://localhost:8088/actuator/health
curl http://localhost:8089/actuator/health
curl http://localhost:8090/actuator/health
curl http://localhost:8091/actuator/health
curl http://localhost:8092/actuator/health
curl http://localhost:8093/actuator/health
curl http://localhost:8094/actuator/health
curl http://localhost:8095/actuator/health
curl http://localhost:9000/actuator/health
```