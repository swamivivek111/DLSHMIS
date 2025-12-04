# Development Setup Guide

## Consistent Port Mapping

All services use the same ports in both Docker and local development:

| Service | Port | URL |
|---------|------|-----|
| Gateway | 9000 | http://localhost:9000 |
| UserMS | 8081 | http://localhost:8081 |
| ProfileMS | 8082 | http://localhost:8082 |
| AppointmentMS | 8083 | http://localhost:8083 |
| MasterMS | 8084 | http://localhost:8084 |
| NotificationMS | 8085 | http://localhost:8085 |
| BillingMS | 8086 | http://localhost:8086 |
| MedicalRecordsMS | 8087 | http://localhost:8087 |
| InventoryMS | 8088 | http://localhost:8088 |
| LabMS | 8089 | http://localhost:8089 |
| OPDMS | 8090 | http://localhost:8090 |
| IPDMS | 8091 | http://localhost:8091 |
| RadiologyMS | 8092 | http://localhost:8092 |
| PharmacyMS | 8093 | http://localhost:8093 |
| OTMS | 8094 | http://localhost:8094 |
| AuditMS | 8095 | http://localhost:8095 |
| Frontend | 5173 | http://localhost:5173 |
| MySQL | 3306 | localhost:3306 |

## Running with Docker
```bash
docker-compose up -d
```

## Running Locally (VS Code)
1. Start MySQL (Docker or local)
2. Start Gateway service on port 9000
3. Start required microservices on their respective ports
4. Start React app: `npm run dev` (will run on port 5173)

## Configuration
- Frontend always uses `http://localhost:9000` (Gateway)
- Gateway routes to appropriate microservices
- No code changes needed when switching between Docker/local

## Database
- Always runs on port 3306
- Use Docker MySQL: `docker run -d -p 3306:3306 --name hms-mysql -e MYSQL_ROOT_PASSWORD=root mysql:8.0`