// importing app
const path = require('path');
const app = require(path.join(__dirname, 'MainApp.js'));
const https = require('https');
const fs = require('fs');

const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, 'certs', '_.growplus.asia', '_.growplus.asia-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certs', '_.growplus.asia', '_.growplus.asia-crt.pem'))
};

// Start HTTPS server on port 444
https.createServer(httpsOptions, app).listen(444, () => {
    console.log("HTTPS Server with SNI support started on port 444");
})
.on('tlsClientError', (err, socket) => {
    console.error("HTTPS TLS Client Error:", err);
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
})
.on('clientError', (err, socket) => {
    console.error("HTTPS Client Error:", err);
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
})
.on('error', (err) => {
    console.error("HTTPS Server Error:", err);
});

// Keep the original server on port 3000
app.listen(88, () => {
    console.log("Original server started on port 88");
});