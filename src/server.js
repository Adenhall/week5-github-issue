const http = require('http');
const request = require('request');
require('dotenv').config();

const clientId = `208bd684988074b62c9e`;
const secretKey = `b0682a2b38b3b39da835461812007c6966281b36`; 

console.log('started server on port 5000');

http.createServer((req, res) => {
  var code = req.url.split("=")[1];
  if (code) {
    request.post('https://github.com/login/oauth/access_token', {
      form: {
        client_id: clientId,
        client_secret: secretKey,
        code: code
      }
    }, (err, r, body) => {
      res.writeHead(301, {
        'Location': 'http://localhost:3000?' + body
      });
      res.end();
    })
    
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(5000);