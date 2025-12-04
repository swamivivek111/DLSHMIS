#!/bin/bash

# Database reinitializer - checks for missing DBs/tables and reinitializes if needed
echo "=== Database Reinitializer ==="

# Required databases
REQUIRED_DBS=("userdb" "masterdb" "profiledb" "appointmentdb" "opddb" "auditdb" "billingdb" "inventorydb" "medicalrecordsdb" "labdb" "ipddb" "radiologydb" "pharmacydb" "otdb" "notificationdb" "reportdb")

# Check if any database is missing
MISSING_DB=false
echo "Checking for missing databases..."

for db in "${REQUIRED_DBS[@]}"; do
    DB_EXISTS=$(mysql -u root -proot -e "SHOW DATABASES LIKE '$db';" 2>/dev/null | grep -c "$db")
    if [ "$DB_EXISTS" -eq 0 ]; then
        echo "❌ Missing database: $db"
        MISSING_DB=true
    else
        echo "✅ Found database: $db"
    fi
done

# Check critical tables in existing databases
echo "Checking for critical tables..."
MISSING_TABLE=false

# Check userdb tables
if mysql -u root -proot -e "USE userdb; SHOW TABLES;" 2>/dev/null | grep -q "users"; then
    echo "✅ Found users table"
else
    echo "❌ Missing users table"
    MISSING_TABLE=true
fi

# Check masterdb tables
if mysql -u root -proot -e "USE masterdb; SHOW TABLES;" 2>/dev/null | grep -q "countries"; then
    echo "✅ Found countries table"
else
    echo "❌ Missing countries table"
    MISSING_TABLE=true
fi

# If any database or critical table is missing, reinitialize
if [ "$MISSING_DB" = true ] || [ "$MISSING_TABLE" = true ]; then
    echo ""
    echo "🔄 Missing databases/tables detected. Reinitializing all databases..."
    
    # Drop all HMS databases
    echo "Dropping existing HMS databases..."
    for db in "${REQUIRED_DBS[@]}"; do
        mysql -u root -proot -e "DROP DATABASE IF EXISTS $db;" 2>/dev/null
        echo "Dropped: $db"
    done
    
    # Execute all SQL files in order
    echo ""
    echo "Executing SQL initialization files..."
    
    SQL_FILES=(
        "userdb.sql"
        "masterdb.sql" 
        "profiledb.sql"
        "appointmentdb.sql"
        "opddb.sql"
        "auditdb.sql"
        "billingdb.sql"
        "inventorydb.sql"
        "medicalrecordsdb.sql"
        "labdb.sql"
        "ipddb.sql"
        "radiologydb.sql"
        "pharmacydb.sql"
        "otdb.sql"
        "notificationdb.sql"
        "reportdb.sql"
    )
    
    for sql_file in "${SQL_FILES[@]}"; do
        if [ -f "/docker-entrypoint-initdb.d/$sql_file" ]; then
            echo "Executing: $sql_file"
            mysql -u root -proot < "/docker-entrypoint-initdb.d/$sql_file"
            if [ $? -eq 0 ]; then
                echo "✅ Successfully executed: $sql_file"
            else
                echo "❌ Failed to execute: $sql_file"
            fi
        else
            echo "⚠️  File not found: $sql_file"
        fi
    done
    
    echo ""
    echo "🎉 Database reinitialization completed!"
    
else
    echo ""
    echo "✅ All databases and tables are present. No reinitialization needed."
fi

echo ""
echo "=== Final Database Status ==="
mysql -u root -proot -e "SHOW DATABASES;" | grep -E "(userdb|masterdb|profiledb|appointmentdb|opddb|auditdb)"