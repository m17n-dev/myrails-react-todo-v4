#!/bin/bash

echo Trying to connect to RDB host $RDS_HOSTNAME:$RDS_PORT
curl -v telnet://$RDS_HOSTNAME:$RDS_PORT
echo Bundler install...
gem install bundler
bundler install
echo Migrate to $RDS_HOSTNAME
mv ./config/credentials.yml.enc ./config/credentials_backup.yml.enc
EDITOR=vim ./bin/rails credentials:edit
rm ./config/credentials_backup.yml.enc
./bin/rails db:migrate RAILS_ENV=production
# ./bin/rails db:seed
./bin/rails server --binding=0.0.0.0
