const fs = require('fs');
const path = require('path');

const caCert = fs.readFileSync(path.join(__dirname, '../prod-ca-2021.crt')).toString();

const dbConfig = {
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/mdtstech_store',
  ssl: process.env.NODE_ENV === 'production' ? { ca: caCert } : false,
};

module.exports = dbConfig;
