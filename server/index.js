const express = require('express');
const port = 5000;
const app = express();

const bodyParser = require('body-parser');

const cors = require("cors")
const whitelist = ["http://localhost:3000"]

const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  }
  app.use(cors(corsOptions))
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
    password: '12TKL3212tkl32',
    database: 'finalProject',
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
    try{
    pool.query('SELECT * FROM users', (error, result) => {
        if (error) throw error;
        response.send(result);
    });}
    catch(e){
        console.log(e)
    }
});

app.get('/login',(request, response)=>{
    try{
    pool.query(`SELECT * FROM users where name="${request.query.name}" and email="${request.query.email}"`, (error, result) => {
        if (error) throw error;
        if (result.length>0) response.send(result);
        else{
            response.send({id: null, name: null, email: null})
        }
        console.log(result)
        
    });}
    catch(e){
        console.log(e)
    }
} )

app.get('/question',(request, response)=>{
   console.log(request)
});

app.get('/countPokemons',(request, response)=>{
    pool.query(`SELECT count(*) as count FROM POKEMONS`, (error, result) => {
        response.send(result[0])
    })
});


console.log('Сервер стартовал!');

