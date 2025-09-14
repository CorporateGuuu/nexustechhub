#!/bin/bash

# Navigate to the project directory
cd mdtstech-store_20250508_001551

# Install dependencies
npm install

# Build the Next.js application
npm run build

# Copy the .next directory to the publish directory
cp -r .next ../
