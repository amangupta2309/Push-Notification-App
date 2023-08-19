var admin = require("firebase-admin");
const path = require("path");
// console.log(__dirname)
const dotenv = require('dotenv');
console.log("Testing");

dotenv.config({path: path.join(__dirname, '../.env')});
const privateKey = {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: process.env.private_key,
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
}

admin.initializeApp({
  credential: admin.credential.cert(privateKey),
  databaseURL: process.env.DATABASE_URL
});

const db = admin.database();
const messaging = admin.messaging();
module.exports = { admin, db,messaging };

