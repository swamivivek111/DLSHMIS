# Service URL Configuration Summary

## Overview
Moved hardcoded service URLs to properties files for better configuration management across local and Docker environments.

## Changes Made

### 1. UserMS Configuration
**Files Updated:**
- `application.properties` - Added service URLs for local development
- `application-docker.properties` - Added Docker container URLs
- `AuditService.java` - Uses `${audit.service.url}`
- `APIService.java` - Uses `${profile.service.url}`

**Properties Added:**
```properties
# Local (application.properties)
audit.service.url=http://localhost:8095
profile.service.url=http://localhost:8082

# Docker (application-docker.properties)  
audit.service.url=http://hms-auditms:8095
profile.service.url=http://hms-profilems:8082
```

### 2. AppointmentMS Configuration
**Files Updated:**
- `application.properties` - Added service URLs for local development
- `application-docker.properties` - Added Docker container URLs
- `APIService.java` - Uses configurable URLs
- `AppointmentServiceImpl.java` - Uses `${master.service.url}`

**Properties Added:**
```properties
# Local (application.properties)
profile.service.url=http://localhost:8082
user.service.url=http://localhost:8081
master.service.url=http://localhost:8084

# Docker (application-docker.properties)
profile.service.url=http://hms-profilems:8082
user.service.url=http://hms-userms:8081
master.service.url=http://hms-masterms:8084
```

## Remaining Services to Update

Based on the scan, these services still have hardcoded URLs:

### MasterMs
- `APIService.java` - Profile and User service calls
- Needs similar configuration updates

### GatewayMS  
- `MobileAPI.java` - Base URL configuration
- Already uses localhost, may need Docker variant

### CORS Configurations
Multiple services have hardcoded frontend URL:
- `AppointmentMS/CorsConfig.java`
- `ProfileMs/CorsConfig.java` 
- `UserMS/CorsConfig.java`
- `NotificationMS/WebSocketConfig.java`

Should be moved to properties as:
```properties
frontend.url=http://localhost:5173
```

## Usage Instructions

### Local Development
Use default profile (no changes needed):
```bash
java -jar service.jar
```

### Docker Deployment
Use docker profile:
```bash
java -jar service.jar --spring.profiles.active=docker
```

Or set in docker-compose.yml:
```yaml
environment:
  - SPRING_PROFILES_ACTIVE=docker
```

## Benefits
✅ **Environment Flexibility** - Easy switching between local/Docker URLs
✅ **Configuration Management** - Centralized service endpoint configuration  
✅ **Deployment Ready** - No code changes needed for different environments
✅ **Maintainability** - Single place to update service URLs

## Next Steps
1. Update remaining services (MasterMs, etc.)
2. Move CORS URLs to properties
3. Update docker-compose.yml to use docker profile
4. Test audit logging with new configuration

## Testing Audit Logging
After restarting UserMS with new configuration:
1. Login via frontend or API
2. Check audit logs: `GET http://localhost:9000/audit/logs`
3. Verify login entries are created with correct format