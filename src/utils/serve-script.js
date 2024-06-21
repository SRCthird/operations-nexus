require('dotenv').config();
const { exec } = require('child_process');

let serveCommand = 'serve -s build';
serveCommand += ` --listen ${process.env.PORT || "3000"}` 
if (process.env.HTTPS === 'true') {
  serveCommand += ` --ssl-cert ${process.env.SSL_CRT_FILE} --ssl-key ${process.env.SSL_KEY_FILE}`;
}

exec(serveCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});

