#!/bin/bash

# This script runs after MySQL is fully started to ensure all databases are properly initialized
# It can be run manually or automatically

echo "=== HMS Database Initialization Check ==="
echo "Waiting for MySQL to be ready..."

# Wait for MySQL to be ready
until docker exec hms-mysql mysql -uroot -proot -e "SELECT 1" >/dev/null 2>&1; do
    echo "Waiting for MySQL..."
    sleep 2
done

echo "MySQL is ready. Running initialization check..."

# Execute the initialization script inside the container
docker exec hms-mysql bash /docker-entrypoint-initdb.d/zzz-init-databases.sh

echo "=== Initialization check completed ==="

# Test login after initialization
echo "Testing admin login..."
sleep 2
curl -X POST http://localhost:9000/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin123@gmail.com","password":"admin123"}' \
  2>/dev/null | head -c 200

echo ""
echo "=== Setup completed ==="