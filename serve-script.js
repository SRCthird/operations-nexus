// serve.js
require('dotenv').config();
const { exec } = require('child_process');

// Construct the serve command with SSL options if needed
let serveCommand = 'serve -s build';
serveCommand += ` --listen ${process.env.PORT || "8080"}` 
if (process.env.HTTPS === 'true') {
  serveCommand += ` --ssl-cert ${process.env.SSL_CERT_PATH} --ssl-key ${process.env.SSL_KEY_PATH}`;
}

// Execute the serve command
exec(serveCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});

