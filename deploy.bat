@echo off
echo ========================================
echo Hospital Management System Deployment
echo ========================================
echo.

:: Check if Java is installed
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Java is not installed or not in PATH
    echo Please install Java 17 or higher
    pause
    exit /b 1
)

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 16 or higher
    pause
    exit /b 1
)

:: Check if Maven is installed
mvn --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Maven is not installed or not in PATH
    echo Please install Maven 3.6 or higher
    pause
    exit /b 1
)

echo All prerequisites are installed!
echo.

:: Create logs directory
if not exist "logs" mkdir logs

echo Starting Backend Services...
echo.

:: Start UserMS
echo Starting UserMS on port 8081...
start "UserMS" cmd /k "cd backend\UserMS && mvn spring-boot:run > ..\..\logs\userms.log 2>&1"
timeout /t 10 /nobreak >nul

:: Start MasterMs
echo Starting MasterMs on port 8084...
start "MasterMs" cmd /k "cd backend\MasterMs && mvn spring-boot:run > ..\..\logs\masterms.log 2>&1"
timeout /t 10 /nobreak >nul

:: Start ProfileMs
echo Starting ProfileMs on port 8082...
start "ProfileMs" cmd /k "cd backend\ProfileMs && mvn spring-boot:run > ..\..\logs\profilems.log 2>&1"
timeout /t 10 /nobreak >nul

:: Start AppointmentMS
echo Starting AppointmentMS on port 8083...
start "AppointmentMS" cmd /k "cd backend\AppointmentMS && mvn spring-boot:run > ..\..\logs\appointmentms.log 2>&1"
timeout /t 10 /nobreak >nul

:: Start AuditMS
echo Starting AuditMS on port 8095...
start "AuditMS" cmd /k "cd backend\AuditMS && mvn spring-boot:run > ..\..\logs\auditms.log 2>&1"
timeout /t 10 /nobreak >nul

:: Start GatewayMS
echo Starting GatewayMS on port 9000...
start "GatewayMS" cmd /k "cd backend\GatewayMS && mvn spring-boot:run > ..\..\logs\gatewayms.log 2>&1"
timeout /t 15 /nobreak >nul

echo Backend services are starting...
echo.

:: Install frontend dependencies and start
echo Setting up Frontend...
cd frontend\hms

:: Check if node_modules exists
if not exist "node_modules" (
    echo Installing frontend dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install frontend dependencies
        pause
        exit /b 1
    )
)

echo Starting Frontend on port 5173...
start "Frontend" cmd /k "npm run dev > ..\..\logs\frontend.log 2>&1"

cd ..\..

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo Services Status:
echo - UserMS:        http://localhost:8081
echo - MasterMs:      http://localhost:8084  
echo - ProfileMs:     http://localhost:8082
echo - AppointmentMS: http://localhost:8083
echo - AuditMS:       http://localhost:8095
echo - GatewayMS:     http://localhost:9000
echo - Frontend:      http://localhost:5173
echo.
echo Logs are available in the 'logs' directory
echo.
echo Demo Credentials:
echo Admin:   admin@hms.com / admin123
echo Doctor:  doctor@hms.com / doctor123
echo Patient: patient@hms.com / patient123
echo.
echo Press any key to open the application...
pause >nul

:: Open the application in default browser
start http://localhost:5173

echo.
echo To stop all services, close all command windows or run stop.bat
echo.
pause