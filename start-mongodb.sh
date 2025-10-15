#!/bin/bash

# Create data directory if it doesn't exist
mkdir -p ~/data/db

# Start MongoDB
/usr/local/mongodb/bin/mongod --dbpath ~/data/db --fork --logpath ~/data/mongodb.log

echo "MongoDB started successfully!"
echo "Data directory: ~/data/db"
echo "Log file: ~/data/mongodb.log"
