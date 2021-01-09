#!/bin/bash
cd ./DatabaseSetup;
DIR=$PWD;
echo $PWD;
echo $DIR;
npm install knex;
npm install pg;
HOST=$(egrep "host:.+," ./knexfile.js | cut -d "'" -f2);
USER=$(egrep "user:.+," ./knexfile.js | cut -d "'" -f2);
PASS=$(egrep "password:.+," ./knexfile.js | cut -d "'" -f2);
PORT=$(egrep "port:.+" ./knexfile.js | cut -d "'" -f2);
psql postgresql://$USER:$PASS@$HOST:$PORT -c "drop database bookdb;"
psql postgresql://$USER:$PASS@$HOST:$PORT -c "create database bookdb;"
echo "psql postgresql://$USER:$PASS@$HOST:$PORT"
MIGRATIONS=$(ls $DIR/migrations);
for i in $MIGRATIONS; do echo "running migration: $i"; npx knex migrate:up $i; done;
SEEDS=$(ls $DIR/seeds);
for i in $SEEDS; do echo "running seed:      $i"; npx knex seed:run --specific=$i; done;