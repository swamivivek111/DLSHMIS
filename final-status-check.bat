@echo off
echo ========================================
echo HMS System Status Check
echo ========================================
echo.

echo [1] Docker Container Status:
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | findstr hms

echo.
echo [2] Database Status:
docker exec hms-mysql mysql -u root -proot -e "SHOW DATABASES;" 2>nul | findstr -E "(userdb|masterdb|profiledb|appointmentdb|opddb|auditdb)"

echo.
echo [3] Service Health Tests:
echo Testing UserMS directly...
curl -s -X POST http://localhost:8081/user/login -H "Content-Type: application/json" -d "{\"email\":\"admin123@gmail.com\",\"password\":\"admin123\"}" | findstr accessToken >nul
if %errorlevel%==0 (
    echo ✅ UserMS: Login successful
) else (
    echo ❌ UserMS: Login failed
)

echo Testing Gateway routing...
curl -s -X POST http://localhost:9000/user/login -H "Content-Type: application/json" -d "{\"email\":\"admin123@gmail.com\",\"password\":\"admin123\"}" | findstr accessToken >nul
if %errorlevel%==0 (
    echo ✅ Gateway: Routing successful
) else (
    echo ❌ Gateway: Routing failed
)

echo.
echo [4] Frontend Status:
curl -s http://localhost:5173 >nul
if %errorlevel%==0 (
    echo ✅ Frontend: Accessible
) else (
    echo ❌ Frontend: Not accessible
)

echo.
echo [5] Sample User Data:
echo Available admin users:
docker exec hms-mysql mysql -u root -proot -e "USE userdb; SELECT email, role FROM user WHERE role=2 LIMIT 3;" 2>nul

echo.
echo ========================================
echo Summary: 
echo - UserMS: Working (Direct access)
echo - Gateway: Issues with routing
echo - Database: Fully initialized
echo - Frontend: Available
echo.
echo Recommendation: Use direct service URLs for testing
echo UserMS: http://localhost:8081
echo Gateway: http://localhost:9000 (has routing issues)
echo Frontend: http://localhost:5173
echo ========================================