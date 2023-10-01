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


async function addToFavs(req, res) {
  const userID = req.body.userID;
  const artistID = req.body.artistID;
  pool.query(
    `UPDATE users
    SET following = (
        SELECT COALESCE(following, '[]'::jsonb) || '["${artistID}"]'::jsonb
    )
    WHERE user_id = '${userID}'`,
    (error, results) => {
      if (error) {
        return res.send("error" + error);
      }
      console.log("Added User to Database");
      res.status(200);
      res.send("Success");
    }
  );
};

async function unFollowArtist(req, res) {
  const userID = req.body.userID;
  const artistID = req.body.artistID;
  pool.query(
    `UPDATE users
    SET following = following - '"${artistID}"'
    WHERE user_id = '${userID}';`,
    (error, results) => {
      if (error) {
        return res.send("error" + error);
      }
      console.log("Added User to Database");
      res.status(200);
      res.send("Success");
    }
  );
};


module.exports = {
  addToFavs,
  unFollowArtist
};

//ffddssssccssssddssssssssssssddssfffssdddsssdddsssss