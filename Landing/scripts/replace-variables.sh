#!/bin/sh
# replace-variables.sh

# Define a list of mandatory environment variables to check
MANDATORY_VARS="NEXT_PUBLIC_LOTTERY_HOME_URL NEXT_PUBLIC_LOTTERY_PLAY_URL NEXT_PUBLIC_LOTTERY_ROUND_HISTORY_URL NEXT_PUBLIC_ON_CHAIN_URL"
# Define a list of optional environment variables (no check needed)
OPTIONAL_VARS=""

# Check if each variable is set
for VAR in $MANDATORY_VARS; do
    eval value=\$$VAR
    if [ -z "$value" ]; then
        echo "$VAR is not set. Please set it and rerun the script."
        exit 1
    fi
done

# Combine mandatory and optional variables for replacement
ALL_VARS="$MANDATORY_VARS $OPTIONAL_VARS"

# Find and replace BAKED values with real values
find /usr/share/nginx/html -type f \( -name "*.js" -o -name "*.html" -o -name "*.css" -o -name "*.xml.body" -o -name "*.txt.body" \) |
while read file; do
    for VAR in $ALL_VARS; do
        eval value=\$$VAR
        if [ -n "$value" ]; then
            echo "Replacing BAKED_$VAR with $value in $file"
            sed -i "s|BAKED_$VAR|$value|g" "$file"
        fi
    done
done
