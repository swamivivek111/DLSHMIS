#!/bin/bash

# Database initialization script
# This script runs every time MySQL starts and checks if databases/tables/data exist
# If not, it executes the corresponding SQL file

echo "Starting database initialization check..."

# Function to check if database exists
check_database() {
    local db_name=$1
    mysql -uroot -proot -e "USE $db_name;" 2>/dev/null
    return $?
}

# Function to check if table exists in database
check_table() {
    local db_name=$1
    local table_name=$2
    mysql -uroot -proot -e "USE $db_name; DESCRIBE $table_name;" 2>/dev/null
    return $?
}

# Function to check if table has data
check_data() {
    local db_name=$1
    local table_name=$2
    local count=$(mysql -uroot -proot -se "USE $db_name; SELECT COUNT(*) FROM $table_name;" 2>/dev/null)
    if [ "$count" -gt 0 ]; then
        return 0  # Has data
    else
        return 1  # No data
    fi
}

# Function to execute SQL file
execute_sql() {
    local sql_file=$1
    echo "Executing $sql_file..."
    mysql -uroot -proot < /docker-entrypoint-initdb.d/$sql_file
    if [ $? -eq 0 ]; then
        echo "✓ Successfully executed $sql_file"
    else
        echo "✗ Failed to execute $sql_file"
    fi
}

# Check and initialize each database
databases=(
    "userdb:userdb.sql:user"
    "profiledb:profiledb.sql:admin_profiles"
    "appointmentdb:appointmentdb.sql:appointment"
    "masterdb:masterdb.sql:country"
    "opddb:opddb.sql:opd_visits"
    "auditdb:auditdb.sql:audit_logs"
    "billingdb:billingdb.sql:invoices"
    "inventorydb:inventorydb.sql:medicines"
    "ipddb:ipddb.sql:admissions"
    "labdb:labdb.sql:lab_orders"
    "medicalrecordsdb:medicalrecordsdb.sql:medical_records"
    "notificationdb:notificationdb.sql:notifications"
    "otdb:otdb.sql:rooms"
    "pharmacydb:pharmacydb.sql:medicines"
    "radiologydb:radiologydb.sql:reports"
)

for db_info in "${databases[@]}"; do
    IFS=':' read -r db_name sql_file check_table <<< "$db_info"
    
    echo "Checking database: $db_name"
    
    # Check if database exists
    if ! check_database "$db_name"; then
        echo "Database $db_name does not exist. Creating and initializing..."
        execute_sql "$sql_file"
        continue
    fi
    
    # Check if main table exists
    if ! check_table "$db_name" "$check_table"; then
        echo "Table $check_table does not exist in $db_name. Initializing..."
        execute_sql "$sql_file"
        continue
    fi
    
    # For critical tables, check if they have essential data
    case "$db_name" in
        "userdb")
            if ! check_data "$db_name" "user"; then
                echo "No users found in userdb. Re-initializing..."
                execute_sql "$sql_file"
            else
                echo "✓ Database $db_name is properly initialized"
            fi
            ;;
        "masterdb")
            if ! check_data "$db_name" "country"; then
                echo "No master data found in masterdb. Re-initializing..."
                execute_sql "$sql_file"
            else
                echo "✓ Database $db_name is properly initialized"
            fi
            ;;
        *)
            echo "✓ Database $db_name exists and is initialized"
            ;;
    esac
done

echo "Database initialization check completed!"