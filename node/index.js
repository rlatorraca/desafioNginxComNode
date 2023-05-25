const express = require('express');
const app = express();
const path = require('path');
//const cors = require('cors');
const port= 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'node_db'
};

const mysql = require('mysql');

const createTable = `CREATE TABLE PEOPLE(id int not null auto_increment, name varchar(255), primary key(id))`;
//connection.query(createTable)


const checkTableExistsQuery = `
  SELECT 1 FROM information_schema.tables
  WHERE table_schema = DATABASE()
  AND table_name = 'people'
  LIMIT 1
`;

const connection = mysql.createConnection(config);
const insertPerson01 = `INSERT INTO PEOPLE(name) values('James Marcos')`;
const insertPerson02 = `INSERT INTO PEOPLE(name) values('Hon Minh')`;
const selectTable = `SELECT * FROM PEOPLE`;
let error = 0;
let results ='';

connection.query(checkTableExistsQuery, (error, results) => {
  if (error) {
    console.error('Error checking table existence:', error);    
    return;
  }

  if (results.length === 0) {
    // Table doesn't exist, so create it
    connection.query(createTable, (createError) => {
      if (createError) {
        console.error('Error creating table:', createError);
        error = 1;        
        return;
      }
      console.log('Table created successfully!');            
    });
  } else {
    console.log('Table already exists.');
  }

  connection.query(insertPerson01)      
  connection.query(insertPerson02)      
  connection.query(selectTable, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      error = 1;      
      return;
    }
  });

});

//const result = connection.query(selectTable)


//app.use(cors());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get('/', (req,res) => {
   res.statusCode = 200;
   //res.setHeader('Content-Type', 'text/plain');
    
  connection.query(selectTable, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    res.render('index', { data: results });
  });
   
})


// Start the server and listen on a specific port

app.listen(port, () => {
 console.log('Running on port: ' + port);
});
