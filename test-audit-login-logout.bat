@echo off
echo ========================================
echo Testing Audit Login/Logout Functionality
echo ========================================

echo.
echo 1. Testing Login Audit...
curl -X POST http://localhost:9000/user/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@hms.com\",\"password\":\"admin123\"}" ^
  -w "\nStatus: %%{http_code}\n"

echo.
echo 2. Testing Logout Audit...
curl -X POST http://localhost:9000/user/logout ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer test-token" ^
  -w "\nStatus: %%{http_code}\n"

echo.
echo 3. Checking Audit Logs...
curl -X GET "http://localhost:9000/audit/logs?page=0&size=5&sortBy=timestamp&sortDir=desc" ^
  -H "Authorization: Bearer test-token" ^
  -w "\nStatus: %%{http_code}\n"

echo.
echo ========================================
echo Test completed. Check the responses above.
echo ========================================
pause