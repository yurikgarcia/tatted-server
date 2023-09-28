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

async function getUsers(req, res) {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      res.send("error" + error);
    }
    res.send(results.rows);
  });
};

async function addUser(req, res) {
  let user = {
    first: req.body.users.first,
    last: req.body.users.last,
    email: req.body.users.email,
    artist: req.body.users.artistCheck
  };
  const password = await bcrypt.hash(req.body.users.password, 10);
  console.log("user", user)
  pool.query(
    `INSERT INTO users (first_name, last_name, email, password, artist)
    VALUES ('${user.first}', '${user.last}', '${user.email}', '${password}', ${user.artist})`,
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
  getUsers,
  addUser
};
