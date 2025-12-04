@echo off
echo ========================================
echo    HMS SERVICES STATUS CHECK
echo ========================================

echo Checking Docker containers...
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo.
echo ========================================
echo    HEALTH CHECK ENDPOINTS
echo ========================================

echo Testing MySQL...
docker exec hms-mysql mysql -uroot -proot -e "SELECT 'MySQL OK' as status;" 2>nul && echo [OK] MySQL || echo [FAIL] MySQL

echo Testing UserMS...
curl -s http://localhost:8081/user/health >nul 2>&1 && echo [OK] UserMS || echo [FAIL] UserMS

echo Testing ProfileMs...
curl -s http://localhost:8082/actuator/health >nul 2>&1 && echo [OK] ProfileMs || echo [FAIL] ProfileMs

echo Testing AppointmentMS...
curl -s http://localhost:8083/actuator/health >nul 2>&1 && echo [OK] AppointmentMS || echo [FAIL] AppointmentMS

echo Testing MasterMs...
curl -s http://localhost:8084/actuator/health >nul 2>&1 && echo [OK] MasterMs || echo [FAIL] MasterMs

echo Testing OPDMS...
curl -s http://localhost:8090/actuator/health >nul 2>&1 && echo [OK] OPDMS || echo [FAIL] OPDMS

echo Testing AuditMS...
curl -s http://localhost:8095/actuator/health >nul 2>&1 && echo [OK] AuditMS || echo [FAIL] AuditMS

echo Testing Gateway...
curl -s http://localhost:9000/actuator/health >nul 2>&1 && echo [OK] Gateway || echo [FAIL] Gateway

echo Testing Frontend...
curl -s http://localhost:5173 >nul 2>&1 && echo [OK] Frontend || echo [FAIL] Frontend

echo.
echo ========================================
echo    QUICK LOGIN TEST
echo ========================================
curl -X POST http://localhost:9000/user/login -H "Content-Type: application/json" -d "{\"email\":\"admin123@gmail.com\",\"password\":\"admin123\"}" 2>nul

echo.
echo ========================================
echo    STATUS CHECK COMPLETED
echo ========================================