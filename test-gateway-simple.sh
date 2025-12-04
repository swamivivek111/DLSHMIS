#!/bin/bash
echo "=== Gateway Routing Test ==="

echo "1. Testing UserMS direct:"
curl -s -X POST http://localhost:8081/user/login -H "Content-Type: application/json" -d '{"email":"admin123@gmail.com","password":"admin123"}' | head -c 50

echo -e "\n\n2. Testing Gateway routing:"
curl -s -X POST http://localhost:9000/user/login -H "Content-Type: application/json" -d '{"email":"admin123@gmail.com","password":"admin123"}' | head -c 50

echo -e "\n\n3. Testing Gateway connectivity to UserMS:"
docker exec hms-gateway ping -c 1 hms-userms | grep "1 packets transmitted"

echo -e "\n4. Testing Gateway can reach UserMS port:"
docker exec hms-gateway nc -zv hms-userms 8081 2>&1 | grep "open"

echo -e "\n=== Results ==="