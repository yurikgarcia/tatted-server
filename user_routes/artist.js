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



async function getArtist(req, res) {
  const artistID = req.params.artistID;
  pool.query(`SELECT * FROM users WHERE user_id = '${artistID}'`, (error, results) => {
    if (error) {
      res.send("error" + error);
    }
    res.send(results.rows);
  });
};
//s


module.exports = {
  getArtist,
};
