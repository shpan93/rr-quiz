#!/bin/bash

### rawr
set -x
###
## pull new images
docker-compose -f docker-compose.yml pull
## start new containers
docker-compose -f docker-compose.yml up -d --force-recreate
