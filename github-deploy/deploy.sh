#!/bin/bash
 
WEB_PATH='/root/node/website'
# WEB_USER='lovelucydev'
# WEB_USERGROUP='lovelucydev'
 
echo "Start deployment"
cd $WEB_PATH
echo "pulling source code..."
git reset --hard origin/master
git clean -f
git pull
git checkout master
echo "Finished."