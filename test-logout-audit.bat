@echo off
echo ========================================
echo Testing Logout Audit Flow
echo ========================================
echo.

echo 1. Testing AuditMS Health...
curl -s http://localhost:8095/audit/health
if %errorlevel% neq 0 (
    echo ERROR: AuditMS is not running on port 8095
    echo Please start AuditMS first
    pause
    exit /b 1
)
echo.

echo 2. Testing Gateway to AuditMS routing...
curl -s http://localhost:9000/audit/health
if %errorlevel% neq 0 (
    echo ERROR: Gateway cannot route to AuditMS
    echo Check Gateway configuration
    pause
    exit /b 1
)
echo.

echo 3. Testing direct audit log creation...
curl -X POST http://localhost:8095/audit/log ^
  -H "Content-Type: application/json" ^
  -d "{\"operation\":\"TEST_LOGOUT\",\"moduleName\":\"Authentication\",\"microservice\":\"UserMS\",\"userId\":1,\"userEmail\":\"test@test.com\",\"userRole\":\"ADMIN\",\"description\":\"Test logout audit entry\",\"operationType\":\"LOGOUT\",\"logLevel\":\"INFO\",\"status\":\"SUCCESS\",\"ipAddress\":\"127.0.0.1\",\"timestamp\":\"2024-01-01T10:00:00\"}"
echo.

echo 4. Testing audit logs retrieval...
curl -s "http://localhost:9000/audit/logs?page=0&size=5" -H "Authorization: Bearer YOUR_TOKEN_HERE"
echo.

echo.
echo Test completed. 
echo If you see audit entries above, the system is working.
echo If not, check:
echo 1. AuditMS is running on port 8095
echo 2. Database 'auditdb' exists and is accessible
echo 3. Gateway routing is working
echo.
pause