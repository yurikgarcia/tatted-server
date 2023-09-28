const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const path = require('path');
const Pool = require("pg").Pool;
// const jwt = require("jsonwebtoken");
const { getUsers } = require('./user_routes/userRoutes'); 

app.get('/', (req, res) => {
  res.send('Hello World!!!!');
});

app.listen(5000, () => console.log('Server running on port 5000'));


const pool = new Pool({
  user: "ofzkohty",
  host: "peanut.db.elephantsql.com",
  database: "ofzkohty",
  password: "NCe6N9GCqlOeg7oWs3UFQGD6AOZF6dID",
  port: "5432",
  ssl: {
    rejectUnauthorized: false,
  },
});

//--------------------------------USERS TABLE----------------------------------------------------------------------------------------------------------------

app.get('/users', getUsers)