//import http package provided by Node
const http = require ('http'); //require = import. import http package and store in a variable

//a method that accept a request listener (a function that will be executed)
//Es6 arrow function. Two arguments pass in by node js

const app = require('./backend/app');

const port = 3000;

app.set('port', port);

const server = http.createServer(app)

server.listen(port , () => { console.log (`server is running ${port}`)});
