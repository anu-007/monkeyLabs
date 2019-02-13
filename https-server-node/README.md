# Node https server
### how to use ?

1. clone this repo
2. cd into the folder
3. create a self signed certificate `openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -nodes`
4. run the script `node server.js`
5. open the link in the browser `https://localhost` (you will get a warning due to certificate being self signed)
6. in advance option select proceed anyway
7. enjoy!