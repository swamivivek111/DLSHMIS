#!/bin/bash

echo "=== Proper Database Initialization ==="

# Database and SQL file mapping
declare -A DB_FILES=(
    ["userdb"]="userdb.sql"
    ["masterdb"]="masterdb.sql"
    ["profiledb"]="profiledb.sql"
    ["appointmentdb"]="appointmentdb.sql"
    ["opddb"]="opddb.sql"
    ["auditdb"]="auditdb.sql"
    ["billingdb"]="billingdb.sql"
    ["inventorydb"]="inventorydb.sql"
    ["medicalrecordsdb"]="medicalrecordsdb.sql"
    ["labdb"]="labdb.sql"
    ["ipddb"]="ipddb.sql"
    ["radiologydb"]="radiologydb.sql"
    ["pharmacydb"]="pharmacydb.sql"
    ["otdb"]="otdb.sql"
    ["notificationdb"]="notificationdb.sql"
)

# Initialize each database
for db_name in "${!DB_FILES[@]}"; do
    sql_file="${DB_FILES[$db_name]}"
    
    echo "Processing: $db_name with $sql_file"
    
    if [ -f "/docker-entrypoint-initdb.d/$sql_file" ]; then
        # Create database
        mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS $db_name;"
        
        # Execute SQL file with database context
        mysql -u root -proot -D "$db_name" < "/docker-entrypoint-initdb.d/$sql_file"
        
        if [ $? -eq 0 ]; then
            echo "✅ Successfully initialized: $db_name"
        else
            echo "❌ Failed to initialize: $db_name"
        fi
    else
        echo "⚠️  SQL file not found: $sql_file"
    fi
done

echo ""
echo "=== Database Status ==="
mysql -u root -proot -e "SHOW DATABASES;" | grep -E "(userdb|masterdb|profiledb|appointmentdb|opddb|auditdb)"

echo ""
echo "=== Sample Table Check ==="
mysql -u root -proot -e "USE userdb; SHOW TABLES;" 2>/dev/null | head -5
mysql -u root -proot -e "USE masterdb; SHOW TABLES;" 2>/dev/null | head -5