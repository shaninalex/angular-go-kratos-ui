#!/bin/bash

# NOTE:
# This script run locally installed Kratos and Oathkeeper.
# It's easier to debug, handle links and redirects between services etc.
# Developer only thing!

path=$(pwd)
echo "$path";

# Exit immediately if any command fails
set -e

# Export all environment variables from .env
# shellcheck disable=SC2046
export $(grep -v '^#' .env | xargs)

# Function to stop the services on script exit
cleanup() {
    echo "Stopping services..."

    for pid in "$OATHKEEPER_PID" "$KRATOS_PID"; do
        if [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null; then
            kill "$pid"
            # Give it up to 5 seconds to exit
            for i in {1..5}; do
                if kill -0 "$pid" 2>/dev/null; then
                    sleep 1
                else
                    break
                fi
            done
            # Force kill if still alive
            if kill -0 "$pid" 2>/dev/null; then
                echo "Process $pid did not exit, killing..."
                kill -9 "$pid"
            fi
            wait "$pid" 2>/dev/null
        fi
    done

    echo "Services stopped."
}

# Trap the EXIT signal to run the cleanup function when the script is terminated
trap cleanup EXIT

# apply migrations to kratos database
kratos migrate sql -c "$path/dev/local/config/kratos/kratos.yml" -e --yes

# Start oathkeeper in the background
echo "Starting Oathkeeper..."
oathkeeper serve proxy -c "$path/dev/local/config/oathkeeper/oathkeeper.yml" &
OATHKEEPER_PID=$!

# Start kratos in the background
echo "Starting Kratos..."
kratos serve -c "$path/dev/local/config/kratos/kratos.yml" --dev --watch-courier &
KRATOS_PID=$!

# Wait for both processes to finish (or until the script is terminated)
wait
