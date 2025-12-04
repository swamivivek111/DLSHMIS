# Docker Setup Guide for HMS

## Prerequisites
- Docker Desktop installed >> 4.16.1 installed on local
- Docker Compose installed >> Docker version 20.10.22, build 3a2c30b
- Java 17+ (for building) >> java 21
- Maven 3.6+ (for building) >> Apache Maven 3.9.11 (3e54c93a704957b63ee3494413a2b544fd3d825b) >> Env variable + path configuration
- Node.js 18+ (for frontend) >> v22.20.0

## Quick Start

### 1. Build All Services
```bash
# Run the build script
build-all.bat

# Or build manually:
# For each microservice, run:
# cd backend/[ServiceName]
# mvn clean package -DskipTests
```

### 2. Start All Services
```bash
# Start all services with Docker Compose
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

### 3. Database Initialization
```bash
# If databases are not initialized properly, run:
docker exec hms-mysql bash /docker-entrypoint-initdb.d/proper-init.sh

# Or use the reinit script:
docker exec hms-mysql bash /reinit-databases.sh
```

### 4. Service Health Check
```bash
# Execute check-services.bat to check all services are up and running
check-services.bat

# Or run final status check
final-status-check.bat
```

### 5. Access the Application
- **Frontend**: http://localhost:5173
- **API Gateway**: http://localhost:9000
- **MySQL Database**: localhost:3306

## All Microservices (16 Services)

### Core Services
- **UserMS**: 8081 - User authentication and management
- **ProfileMs**: 8082 - User profiles (Admin, Doctor, Patient)
- **AppointmentMS**: 8083 - Appointment management
- **MasterMs**: 8084 - Master data management
- **OPDMS**: 8090 - OPD patient registration
- **AuditMS**: 8095 - Audit logging

### Extended Services
- **NotificationMS**: 8085 - Notifications and alerts
- **BillingMS**: 8086 - Billing and payments
- **MedicalRecordsMS**: 8087 - Medical records management
- **InventoryMS**: 8088 - Inventory management
- **LabMS**: 8089 - Laboratory management
- **IPDMS**: 8091 - In-patient department
- **RadiologyMS**: 8092 - Radiology services
- **PharmacyMS**: 8093 - Pharmacy management
- **OTMS**: 8094 - Operation theater management

### Infrastructure
- **GatewayMS**: 9000 - API Gateway with routing
- **Frontend**: 5173 - React frontend application
- **MySQL**: 3306 - Database server

## Database Configuration

### Available Databases (16 Databases)
- userdb, profiledb, appointmentdb, masterdb, opddb, auditdb
- notificationdb, billingdb, medicalrecordsdb, inventorydb, labdb
- ipddb, radiologydb, pharmacydb, otdb, reportdb

### Database Access Methods

#### 1. MySQL Command Line (Inside Container)
```bash
# Access MySQL shell
docker exec -it hms-mysql mysql -u root -proot

# Show all databases
SHOW DATABASES;

# Use specific database
USE userdb;
SHOW TABLES;

# Query data
SELECT * FROM user LIMIT 5;
```

#### 2. External MySQL Client
- **Host**: localhost
- **Port**: 3306
- **Username**: root
- **Password**: root

#### 3. Database Backup/Restore
```bash
# Backup specific database
docker exec hms-mysql mysqldump -u root -proot userdb > userdb_backup.sql

# Restore database
docker exec -i hms-mysql mysql -u root -proot userdb < userdb_backup.sql
```

## Environment Configuration

### Local Development
- Uses `application.properties` with localhost URLs
- Start services individually in IDE/Spring Boot Dashboard

### Docker Environment
- Uses `application-docker.properties` with container names
- Activated via `SPRING_PROFILES_ACTIVE=docker`
- All services communicate via Docker network

## Demo Credentials

### Admin Users
- **Email**: admin123@gmail.com | **Password**: admin123
- **Email**: admin@gmail.com | **Password**: admin123
- **Email**: swami@gmail.com | **Password**: admin123

### Test Login
```bash
# Test Gateway login
curl -X POST http://localhost:9000/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin123@gmail.com","password":"admin123"}'
```

## Useful Commands

### Container Management
```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View all containers
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### Logs and Debugging
```bash
# View logs for all services
docker-compose logs

# View logs for specific service
docker-compose logs hms-userms
docker-compose logs hms-gateway

# Follow logs in real-time
docker-compose logs -f hms-userms
```

### Service Management
```bash
# Restart specific service
docker-compose restart hms-userms

# Rebuild specific service
docker-compose up --build hms-userms

# Scale services (if needed)
docker-compose up --scale hms-userms=2
```

### Network and Connectivity
```bash
# Test connectivity between containers
docker exec hms-gateway ping hms-userms

# Check network configuration
docker network ls
docker network inspect dlshms_hms-network
```

## Troubleshooting

### Port Conflicts
If ports are already in use, modify docker-compose.yml:
```yaml
ports:
  - "8082:8081"  # Change left port number
```

### Build Failures
1. Ensure all JAR files exist in target/ directories
2. Run `build-all.bat` first
3. Check Java/Maven versions
4. Verify Dockerfile exists in each service directory

### Database Connection Issues
1. Wait for MySQL container to be healthy: `docker ps`
2. Check database initialization: `docker logs hms-mysql`
3. Run database reinit script if needed
4. Verify network connectivity between containers

### Service Startup Issues
1. Check service logs: `docker logs hms-[service-name]`
2. Verify database is ready before services start
3. Check environment variables in docker-compose.yml
4. Ensure proper Spring profiles are active

### Gateway Routing Issues
1. Verify Gateway is using correct profile (docker/local)
2. Check container name resolution
3. Test direct service access first
4. Verify TokenFilter configuration

### Frontend Issues
1. Check VITE_API_BASE_URL in docker-compose.yml
2. Ensure Gateway is running before frontend
3. Verify CORS settings in Gateway
4. Check browser network tab for API calls

## Performance Optimization

### Resource Limits
Add to docker-compose.yml for production:
```yaml
deploy:
  resources:
    limits:
      memory: 512M
      cpus: '0.5'
```

### Health Checks
Services include health checks for better reliability:
```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:8081/actuator/health"]
  interval: 30s
  timeout: 10s
  retries: 3
```

## Development Workflow

### 1. Code Changes
```bash
# After making changes to a service
cd backend/UserMS
mvn clean package -DskipTests
docker-compose up --build hms-userms
```

### 2. Database Schema Changes
```bash
# Update SQL files in databases/ folder
# Restart with fresh database
docker-compose down -v
docker-compose up -d
```

### 3. Frontend Changes
```bash
# Frontend hot reload is enabled
# Changes reflect automatically in development
```

## Production Deployment

### Environment Variables
Create `.env` file:
```env
MYSQL_ROOT_PASSWORD=secure_password
JWT_SECRET=your_jwt_secret
API_BASE_URL=https://your-domain.com
```

### SSL/HTTPS Configuration
Add reverse proxy (nginx) for HTTPS termination

### Monitoring
- Add logging aggregation (ELK stack)
- Implement metrics collection (Prometheus)
- Set up health monitoring

## Backup Strategy

### Database Backup
```bash
# Automated backup script
docker exec hms-mysql mysqldump -u root -proot --all-databases > backup_$(date +%Y%m%d).sql
```

### Application Backup
- Source code in version control
- Docker images in registry
- Configuration files backup

---

**System Status**: ✅ All 16 microservices operational
**Last Updated**: November 2024
**Support**: Check logs and run diagnostic scripts for troubleshooting