@echo off
echo ========================================
echo Stopping Hospital Management System
echo ========================================
echo.

echo Stopping all HMS services...

:: Kill Java processes (Spring Boot services)
taskkill /f /im java.exe >nul 2>&1

:: Kill Node.js processes (Frontend)
taskkill /f /im node.exe >nul 2>&1

:: Kill specific processes by window title if the above doesn't work
taskkill /f /fi "WindowTitle eq UserMS*" >nul 2>&1
taskkill /f /fi "WindowTitle eq MasterMs*" >nul 2>&1
taskkill /f /fi "WindowTitle eq ProfileMs*" >nul 2>&1
taskkill /f /fi "WindowTitle eq AppointmentMS*" >nul 2>&1
taskkill /f /fi "WindowTitle eq AuditMS*" >nul 2>&1
taskkill /f /fi "WindowTitle eq GatewayMS*" >nul 2>&1
taskkill /f /fi "WindowTitle eq Frontend*" >nul 2>&1

echo.
echo All HMS services have been stopped.
echo.
pause