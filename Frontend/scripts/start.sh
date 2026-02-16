#!/bin/sh
# start.sh

# Replace runtime env vars and start next server
sh replace-variables.sh && nginx -g "daemon off;"
