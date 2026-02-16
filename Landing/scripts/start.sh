#!/bin/sh
sh ./scripts/replace-variables.sh && 
nginx -g "daemon off;"
