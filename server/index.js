const express = require('express');
const port = 5000;
const app = express();

const bodyParser = require('body-parser');
// Use Node.js body parsing middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

const mysql = require('mysql');
// Set database connection credentials 
const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'FinalProject',
};
const pool = mysql.createPool(config);




app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

//test working server
app.get('/', (request, response) => {
    console.log(`URL: ${request.url}`);
    response.send({message: 'Node.js and Express REST API'});
});

//get all users
app.get('/users', (request, response) => {
    pool.query('SELECT * FROM users', (error, result) => {
        if (error) throw error;
        response.send(result);
    });
});

app.get('/login',(request, response)=>{
    console.log(request)
    console.log(`SELECT * FROM users where name="${request.query.name}" and email="${request.query.email}"`)
    pool.query(`SELECT * FROM users where name="${request.query.name}" and email="${request.query.email}"`, (error, result) => {
        if (error) throw error;
        if (result.length>0) response.send(result);
        else{
            response.send({id: null, name: null, email: null})
        }
        console.log(result)
        
    });
} )

console.log('Сервер стартовал!');

