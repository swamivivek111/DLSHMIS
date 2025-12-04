@echo off
echo Testing Audit System...
echo.

echo 1. Testing AuditMS Health Check...
curl -X GET http://localhost:8095/audit/health
echo.
echo.

echo 2. Testing Direct Audit Log Creation...
curl -X POST http://localhost:8095/audit/log ^
  -H "Content-Type: application/json" ^
  -d "{\"operation\":\"TEST_LOGOUT\",\"moduleName\":\"Test\",\"microservice\":\"TestMS\",\"userId\":1,\"userEmail\":\"test@test.com\",\"userRole\":\"ADMIN\",\"description\":\"Test logout audit\",\"operationType\":\"LOGOUT\",\"logLevel\":\"INFO\",\"status\":\"SUCCESS\",\"ipAddress\":\"127.0.0.1\"}"
echo.
echo.

echo 3. Testing UserMS Logout API...
echo Please provide a valid JWT token to test logout audit:
set /p token="Enter JWT token: "
if not "%token%"=="" (
    curl -X POST http://localhost:9000/user/logout ^
      -H "Authorization: Bearer %token%"
    echo.
)

echo.
echo Test completed. Check the console logs and database for audit entries.
pause