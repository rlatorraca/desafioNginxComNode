const http = require('http');
const port= 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'node_db'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)
const createTable = `CREATE PEOPLE(id int not null auto_increment, name varchar(255), primary key(id))`;
connection.query(createTable)
const insertPerson01 = `INSERT INTO PEOPLE(name) values('James Marcos')`
connection.query(insertPerson01)
const insertPerson02 = `INSERT INTO PEOPLE(name) values('Hon Minh')`
connection.query(insertPerson02)
const selectTable = `SELECT * PEOPLE`
const result = connection.query(selectTable)
connection.end()


// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set the response headers
  res.writeHead(200, { 'Content-Type': 'text/html' });

  // Send the welcome page as the response body
  res.write('<html><body><h1>Welcome to My Node.js App!</h1></body></html>');

  // End the response
  res.end();
});

// Start the server and listen on a specific port

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



