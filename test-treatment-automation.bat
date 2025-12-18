@echo off
echo Testing Treatment Automation APIs...
echo.

echo 1. Starting treatment session...
curl -X POST "http://localhost:9000/opd/treatment/start-session?patientId=1&doctorId=1" ^
     -H "Content-Type: application/json"
echo.
echo.

echo 2. Testing prescription generation...
curl -X POST "http://localhost:9000/opd/treatment/generate-prescription?sessionId=1&transcript=Patient complains of headache and fever for 2 days" ^
     -H "Content-Type: application/json"
echo.
echo.

echo 3. Completing treatment session...
curl -X POST "http://localhost:9000/opd/treatment/complete-session/1" ^
     -H "Content-Type: application/json"
echo.
echo.

echo Treatment automation test completed!
pause