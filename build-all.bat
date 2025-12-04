@echo off
setlocal enabledelayedexpansion
echo ========================================
echo    HMS MICROSERVICES BUILD STATUS
echo ========================================

echo Checking JAR files status BEFORE build...
echo ----------------------------------------
echo UserMS:           
if exist "backend\UserMS\target\*.jar" (echo [FOUND]) else (echo [MISSING])
echo ProfileMs:        
if exist "backend\ProfileMs\target\*.jar" (echo [FOUND]) else (echo [MISSING])
echo AppointmentMS:    
if exist "backend\AppointmentMS\target\*.jar" (echo [FOUND]) else (echo [MISSING])
echo MasterMs:         
if exist "backend\MasterMs\target\*.jar" (echo [FOUND]) else (echo [MISSING])
echo OPDMS:            
if exist "backend\OPDMS\target\*.jar" (echo [FOUND]) else (echo [MISSING])
echo AuditMS:          
if exist "backend\AuditMS\target\*.jar" (echo [FOUND]) else (echo [MISSING])
echo GatewayMS:        
if exist "backend\GatewayMS\target\*.jar" (echo [FOUND]) else (echo [MISSING])
echo BillingMS:        
if exist "backend\BillingMS\target\*.jar" (echo [FOUND]) else (echo [MISSING])
echo InventoryMS:      
if exist "backend\InventoryMS\target\*.jar" (echo [FOUND]) else (echo [MISSING])
echo IPDMS:            
if exist "backend\IPDMS\target\*.jar" (echo [FOUND]) else (echo [MISSING])
echo LabMS:            
if exist "backend\LabMS\target\*.jar" (echo [FOUND]) else (echo [MISSING])
echo MedicalRecordsMS: 
if exist "backend\MedicalRecordsMS\target\*.jar" (echo [FOUND]) else (echo [MISSING])
echo NotificationMS:   
if exist "backend\NotificationMS\target\*.jar" (echo [FOUND]) else (echo [MISSING])
echo OTMS:             
if exist "backend\OTMS\target\*.jar" (echo [FOUND]) else (echo [MISSING])
echo PharmacyMS:       
if exist "backend\PharmacyMS\target\*.jar" (echo [FOUND]) else (echo [MISSING])
echo RadiologyMS:      
if exist "backend\RadiologyMS\target\*.jar" (echo [FOUND]) else (echo [MISSING])

echo.
echo ========================================
echo    STARTING BUILD PROCESS
echo ========================================

echo [1/16] Building UserMS...
set start_time=%time%
cd backend\UserMS
call mvn clean package -DskipTests -q
set end_time=%time%
if %ERRORLEVEL% EQU 0 (
    for %%f in (target\*.jar) do set jar_name=%%~nxf
    echo [SUCCESS] UserMS built - JAR: !jar_name! - Time: %start_time% to %end_time%
) else (echo [FAILED] UserMS build failed)
cd ..\..

echo [2/16] Building ProfileMs...
set start_time=%time%
cd backend\ProfileMs
call mvn clean package -DskipTests -q
set end_time=%time%
if %ERRORLEVEL% EQU 0 (
    for %%f in (target\*.jar) do set jar_name=%%~nxf
    echo [SUCCESS] ProfileMs built - JAR: !jar_name! - Time: %start_time% to %end_time%
) else (echo [FAILED] ProfileMs build failed)
cd ..\..

echo [3/16] Building AppointmentMS...
set start_time=%time%
cd backend\AppointmentMS
call mvn clean package -DskipTests -q
set end_time=%time%
if %ERRORLEVEL% EQU 0 (
    for %%f in (target\*.jar) do set jar_name=%%~nxf
    echo [SUCCESS] AppointmentMS built - JAR: !jar_name! - Time: %start_time% to %end_time%
) else (echo [FAILED] AppointmentMS build failed)
cd ..\..

echo [4/16] Building MasterMs...
set start_time=%time%
cd backend\MasterMs
call mvn clean package -DskipTests -q
set end_time=%time%
if %ERRORLEVEL% EQU 0 (
    for %%f in (target\*.jar) do set jar_name=%%~nxf
    echo [SUCCESS] MasterMs built - JAR: !jar_name! - Time: %start_time% to %end_time%
) else (echo [FAILED] MasterMs build failed)
cd ..\..

echo [5/16] Building OPDMS...
set start_time=%time%
cd backend\OPDMS
call mvn clean package -DskipTests -q
set end_time=%time%
if %ERRORLEVEL% EQU 0 (
    for %%f in (target\*.jar) do set jar_name=%%~nxf
    echo [SUCCESS] OPDMS built - JAR: !jar_name! - Time: %start_time% to %end_time%
) else (echo [FAILED] OPDMS build failed)
cd ..\..

echo [6/16] Building AuditMS...
set start_time=%time%
cd backend\AuditMS
call mvn clean package -DskipTests -q
set end_time=%time%
if %ERRORLEVEL% EQU 0 (
    for %%f in (target\*.jar) do set jar_name=%%~nxf
    echo [SUCCESS] AuditMS built - JAR: !jar_name! - Time: %start_time% to %end_time%
) else (echo [FAILED] AuditMS build failed)
cd ..\..

echo [7/16] Building BillingMS...
set start_time=%time%
cd backend\BillingMS
call mvn clean package -DskipTests -q
set end_time=%time%
if %ERRORLEVEL% EQU 0 (
    for %%f in (target\*.jar) do set jar_name=%%~nxf
    echo [SUCCESS] BillingMS built - JAR: !jar_name! - Time: %start_time% to %end_time%
) else (echo [FAILED] BillingMS build failed)
cd ..\..

echo [8/16] Building InventoryMS...
set start_time=%time%
cd backend\InventoryMS
call mvn clean package -DskipTests -q
set end_time=%time%
if %ERRORLEVEL% EQU 0 (
    for %%f in (target\*.jar) do set jar_name=%%~nxf
    echo [SUCCESS] InventoryMS built - JAR: !jar_name! - Time: %start_time% to %end_time%
) else (echo [FAILED] InventoryMS build failed)
cd ..\..

echo [9/16] Building IPDMS...
set start_time=%time%
cd backend\IPDMS
call mvn clean package -DskipTests -q
set end_time=%time%
if %ERRORLEVEL% EQU 0 (
    for %%f in (target\*.jar) do set jar_name=%%~nxf
    echo [SUCCESS] IPDMS built - JAR: !jar_name! - Time: %start_time% to %end_time%
) else (echo [FAILED] IPDMS build failed)
cd ..\..

echo [10/16] Building LabMS...
set start_time=%time%
cd backend\LabMS
call mvn clean package -DskipTests -q
set end_time=%time%
if %ERRORLEVEL% EQU 0 (
    for %%f in (target\*.jar) do set jar_name=%%~nxf
    echo [SUCCESS] LabMS built - JAR: !jar_name! - Time: %start_time% to %end_time%
) else (echo [FAILED] LabMS build failed)
cd ..\..

echo [11/16] Building MedicalRecordsMS...
set start_time=%time%
cd backend\MedicalRecordsMS
call mvn clean package -DskipTests -q
set end_time=%time%
if %ERRORLEVEL% EQU 0 (
    for %%f in (target\*.jar) do set jar_name=%%~nxf
    echo [SUCCESS] MedicalRecordsMS built - JAR: !jar_name! - Time: %start_time% to %end_time%
) else (echo [FAILED] MedicalRecordsMS build failed)
cd ..\..

echo [12/16] Building NotificationMS...
set start_time=%time%
cd backend\NotificationMS
call mvn clean package -DskipTests -q
set end_time=%time%
if %ERRORLEVEL% EQU 0 (
    for %%f in (target\*.jar) do set jar_name=%%~nxf
    echo [SUCCESS] NotificationMS built - JAR: !jar_name! - Time: %start_time% to %end_time%
) else (echo [FAILED] NotificationMS build failed)
cd ..\..

echo [13/16] Building OTMS...
set start_time=%time%
cd backend\OTMS
call mvn clean package -DskipTests -q
set end_time=%time%
if %ERRORLEVEL% EQU 0 (
    for %%f in (target\*.jar) do set jar_name=%%~nxf
    echo [SUCCESS] OTMS built - JAR: !jar_name! - Time: %start_time% to %end_time%
) else (echo [FAILED] OTMS build failed)
cd ..\..

echo [14/16] Building PharmacyMS...
set start_time=%time%
cd backend\PharmacyMS
call mvn clean package -DskipTests -q
set end_time=%time%
if %ERRORLEVEL% EQU 0 (
    for %%f in (target\*.jar) do set jar_name=%%~nxf
    echo [SUCCESS] PharmacyMS built - JAR: !jar_name! - Time: %start_time% to %end_time%
) else (echo [FAILED] PharmacyMS build failed)
cd ..\..

echo [15/16] Building RadiologyMS...
set start_time=%time%
cd backend\RadiologyMS
call mvn clean package -DskipTests -q
set end_time=%time%
if %ERRORLEVEL% EQU 0 (
    for %%f in (target\*.jar) do set jar_name=%%~nxf
    echo [SUCCESS] RadiologyMS built - JAR: !jar_name! - Time: %start_time% to %end_time%
) else (echo [FAILED] RadiologyMS build failed)
cd ..\..

echo [16/16] Building GatewayMS...
set start_time=%time%
cd backend\GatewayMS
call mvn clean package -DskipTests -q
set end_time=%time%
if %ERRORLEVEL% EQU 0 (
    for %%f in (target\*.jar) do set jar_name=%%~nxf
    echo [SUCCESS] GatewayMS built - JAR: !jar_name! - Time: %start_time% to %end_time%
) else (echo [FAILED] GatewayMS build failed)
cd ..\..

echo.
echo ========================================
echo    FINAL JAR FILES STATUS
echo ========================================
echo UserMS:           
if exist "backend\UserMS\target\*.jar" (for %%f in (backend\UserMS\target\*.jar) do echo [READY] %%~nxf) else (echo [MISSING])
echo ProfileMs:        
if exist "backend\ProfileMs\target\*.jar" (for %%f in (backend\ProfileMs\target\*.jar) do echo [READY] %%~nxf) else (echo [MISSING])
echo AppointmentMS:    
if exist "backend\AppointmentMS\target\*.jar" (for %%f in (backend\AppointmentMS\target\*.jar) do echo [READY] %%~nxf) else (echo [MISSING])
echo MasterMs:         
if exist "backend\MasterMs\target\*.jar" (for %%f in (backend\MasterMs\target\*.jar) do echo [READY] %%~nxf) else (echo [MISSING])
echo OPDMS:            
if exist "backend\OPDMS\target\*.jar" (for %%f in (backend\OPDMS\target\*.jar) do echo [READY] %%~nxf) else (echo [MISSING])
echo AuditMS:          
if exist "backend\AuditMS\target\*.jar" (for %%f in (backend\AuditMS\target\*.jar) do echo [READY] %%~nxf) else (echo [MISSING])
echo BillingMS:        
if exist "backend\BillingMS\target\*.jar" (for %%f in (backend\BillingMS\target\*.jar) do echo [READY] %%~nxf) else (echo [MISSING])
echo InventoryMS:      
if exist "backend\InventoryMS\target\*.jar" (for %%f in (backend\InventoryMS\target\*.jar) do echo [READY] %%~nxf) else (echo [MISSING])
echo IPDMS:            
if exist "backend\IPDMS\target\*.jar" (for %%f in (backend\IPDMS\target\*.jar) do echo [READY] %%~nxf) else (echo [MISSING])
echo LabMS:            
if exist "backend\LabMS\target\*.jar" (for %%f in (backend\LabMS\target\*.jar) do echo [READY] %%~nxf) else (echo [MISSING])
echo MedicalRecordsMS: 
if exist "backend\MedicalRecordsMS\target\*.jar" (for %%f in (backend\MedicalRecordsMS\target\*.jar) do echo [READY] %%~nxf) else (echo [MISSING])
echo NotificationMS:   
if exist "backend\NotificationMS\target\*.jar" (for %%f in (backend\NotificationMS\target\*.jar) do echo [READY] %%~nxf) else (echo [MISSING])
echo OTMS:             
if exist "backend\OTMS\target\*.jar" (for %%f in (backend\OTMS\target\*.jar) do echo [READY] %%~nxf) else (echo [MISSING])
echo PharmacyMS:       
if exist "backend\PharmacyMS\target\*.jar" (for %%f in (backend\PharmacyMS\target\*.jar) do echo [READY] %%~nxf) else (echo [MISSING])
echo RadiologyMS:      
if exist "backend\RadiologyMS\target\*.jar" (for %%f in (backend\RadiologyMS\target\*.jar) do echo [READY] %%~nxf) else (echo [MISSING])
echo GatewayMS:        
if exist "backend\GatewayMS\target\*.jar" (for %%f in (backend\GatewayMS\target\*.jar) do echo [READY] %%~nxf) else (echo [MISSING])

echo.
echo ========================================
echo    BUILD SUMMARY
echo ========================================
echo All 16 microservices build process completed!
echo Next step: Run 'docker-compose up --build'
echo ========================================