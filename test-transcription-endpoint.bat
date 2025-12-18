@echo off
echo Testing transcription endpoint...
echo.

echo 1. Testing OPDMS service health...
curl -X GET "http://localhost:8090/opd/patient-registration/test"
echo.
echo.

echo 2. Testing through Gateway...
curl -X GET "http://localhost:9000/opd/patient-registration/test"
echo.
echo.

echo 3. Testing transcription endpoint directly...
curl -X POST "http://localhost:8090/opd/patient-registration/treatment/transcribe-audio" -F "audioFile=@test.txt"
echo.
echo.

echo 4. Testing transcription through Gateway...
curl -X POST "http://localhost:9000/opd/patient-registration/treatment/transcribe-audio" -F "audioFile=@test.txt"
echo.
echo.

pause