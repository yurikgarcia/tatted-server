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

async function getFollowingUUID(req, res) {
  console.log("Hitting here")
  const usersID = req.params.userID
  pool.query(`SELECT following FROM users WHERE user_id = '${usersID}'`, (error, results) => {
    if (error) {
      res.send("error" + error);
    }
    res.send(results.rows);
  });
};

async function getArtistFollowing(req, res) {
  const artistUUID = req.params.artistUUID;
  console.log("HHELLLOO")
  pool.query(`SELECT * FROM users WHERE user_id = $1`, [artistUUID], (error, results) => {
    if (error) {
      res.status(500).send("Error: " + error);
    } else {
      res.send(results.rows);
      console.log(results.rows);
    }
  });
}


module.exports = {
  getFollowingUUID,
  getArtistFollowing
};
//sdddd