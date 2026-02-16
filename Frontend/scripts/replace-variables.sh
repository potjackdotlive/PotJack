#!/bin/sh
# replace-variables.sh

# Define a list of mandatory environment variables to check
MANDATORY_VARS="VITE_API_BASE_URL VITE_API_DEV_GRAPHQL_URI VITE_ALCHEMY_RPC_API_TOKEN"
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

# Find and replace BAKED in values with real values
find . -type f \( -name "*.js" -o -name "*.xml.body" -o -name "*.txt.body" \) |
while read file; do
    for VAR in $ALL_VARS; do
        eval value=\$$VAR
        echo "Replacing BAKED_$VAR with $value in $file"
        sed -i "s|BAKED_$VAR|$value|g" "$file"
    done
done
