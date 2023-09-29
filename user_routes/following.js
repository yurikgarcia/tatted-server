const Pool = require("pg").Pool;
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../auth_routes/authRoutes");
const bcrypt = require('bcrypt');
// require("dotenv").config();

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

async function getFollowing(req, res) {
  const usersID = req.params.userID
  console.log ("HELLLOOO",usersID)
  pool.query(`SELECT following FROM users WHERE user_id = '${usersID}'`, (error, results) => {
    if (error) {
      res.send("error" + error);
    }
    res.send(results.rows);
  });
};

module.exports = {
  getFollowing,
};
//s