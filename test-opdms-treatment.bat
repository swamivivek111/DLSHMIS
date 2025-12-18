@echo off
echo Testing OPDMS Treatment API...
echo.

echo 1. Testing OPDMS basic endpoint...
curl -X GET "http://localhost:8090/opd/patient-registration/test"
echo.
echo.

echo 2. Testing treatment test endpoint...
curl -X GET "http://localhost:8090/opd/patient-registration/treatment/test"
echo.
echo.

echo 3. Testing through Gateway...
curl -X GET "http://localhost:9000/opd/patient-registration/test"
echo.
echo.

echo 4. Testing treatment through Gateway...
curl -X GET "http://localhost:9000/opd/patient-registration/treatment/test"
echo.
echo.

pause