#!/bin/bash
set -e

host="$1"
shift
cmd="$@"

until mysql -h"$host" -uroot -proot -e 'SELECT 1' >/dev/null 2>&1; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 5
done

>&2 echo "MySQL is up - executing command"
exec $cmd