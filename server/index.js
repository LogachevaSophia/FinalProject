const express = require('express');

const app = express();
const config_json = require('config');
const port = config_json.get('server.port');

const bodyParser = require('body-parser');


// use cors for connect back and front
const cors = require("cors")
const whitelist = config_json.get('server.whitelist');

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
let maxCount = null;
pool.query(`SELECT count(*) as count FROM POKEMONS`, (error, result) => {
    maxCount = result[0].count;
})


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

//test working server
app.get('/', (request, response) => {
    console.log(`URL: ${request.url}`);
    response.send({ message: 'Node.js and Express REST API' });
});

//get all users
app.get('/users', (request, response) => {
    try {
        pool.query('SELECT * FROM users', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    }
    catch (e) {
        console.log(e)
    }
});

app.get('/login', (request, response) => {
    try {
        pool.query(`SELECT * FROM users where name="${request.query.name}" and email="${request.query.email}"`, (error, result) => {
            if (error) throw error;
            if (result.length > 0) response.send(result);
            else {
                response.send({ id: null, name: null, email: null })
            }
            console.log(result)

        });
    }
    catch (e) {
        console.log(e)
    }
})


app.get('/getQuestion', (request, response) => {

    const min = 1;
    const rand = Math.floor(Math.random() * (maxCount - min + 1)) + min;
    console.log(`rand=${rand}`)
    try {
        pool.query(`SELECT *  FROM POKEMONS where id=${rand}`, (error, result) => {
            if (error) { console.log(error) }
            else {
                console.log(result[0])
                let question = {
                    correctAnswer: result[0].id,
                    title: result[0].name
                }
                data = []
                data.push({id: result[0].id, src: result[0].img})
                pool.query(`SELECT *  FROM POKEMONS where id!=${rand}`, (error, result) => {
                    if (error) {
                        console.log(error)
                        response.send({ status: "error", e: error })
                    }
                    else {
                        let uniqueNumbers = [];
                        // генерируем 4 уникальных случайных числа от 1 до 10
                        while (uniqueNumbers.length < 3) {
                            let randomNumber = Math.floor(Math.random() * result.length-1) + 1;
                            if (!uniqueNumbers.includes(randomNumber)) {
                                uniqueNumbers.push(randomNumber);
                            }
                        }
                        for (let i=0;i<3;i++){
                            data.push({ id: result[uniqueNumbers[i]].id, src: result[uniqueNumbers[i]].img })
                        }
                        
                        // result.forEach(element => {
                        //     data.push({ id: element.id, src: element.img })
                        // });
                        question.data = data;
                        response.send(question)
                    }
                })

            }
        })
    } catch (e) {
        response.send({ status: "error", e: e })
    }

});




console.log('Сервер стартовал!');

