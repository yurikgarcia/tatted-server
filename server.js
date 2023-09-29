const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const path = require('path');
const Pool = require("pg").Pool;
// const jwt = require("jsonwebtoken");
const { getUsers, addUser } = require('./user_routes/userRoutes'); 
const { getFollowingUUID, getArtistFollowing } = require('./user_routes/following');
const { verifyToken, login } = require('./auth_routes/authRoutes');

app.get('/', (req, res) => {
  res.send('Welcome To The Tatted Server!');
});

app.listen(5000, () => console.log(`Server running on port ${PORT}!`));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());


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

//--------------------------------FOLLOWING----------------------------------------------------------------------------------------------------------------
app.get('/following/:userID', getFollowingUUID)
app.get('/artistFollowing/:artistUUID', getArtistFollowing)

//--------------------------------USERS TABLE----------------------------------------------------------------------------------------------------------------
app.get('/users', getUsers)
app.post('/users', addUser)

//--------------------------------LOGIN AUTH----------------------------------------------------------------------------------------------------------------
app.post('/login', login)