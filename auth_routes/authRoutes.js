const Pool = require("pg").Pool;
// const jwt = require("jsonwebtoken");
// const bcrypt = require('bcrypt');
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

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"]; //checks the users token in the header
  if (typeof bearerHeader !== "undefined") {
    //if its not undefined then it splits the token at the first space and seperates the token from the bearer
    const bearer = bearerHeader.split(" "); // this is the split
    const bearerToken = bearer[1]; //grabs the next element in the array and sets it as the bearer token
    req.token = bearerToken; //sets the bearer token to the request
    next(); //built in function that allows the middleware to run
  } else {
    res.sendStatus(403); //sends a forbidden if there is no token
  }
}

//funciton that checks if user.password equals the hashed password in the database and returns a token if it does
// async function login(req, res) {
//   let user = {
//     email: req.body.user_email,
//     password: req.body.user_password,
//     warehouses: req.body.user_password
//   };
//   // console.log("user when login", user);
//   // console.log("LOGIN REQ", req.body);
// pool.query(
//     `SELECT * FROM users WHERE email='${user.email}'`,
//     (error, results) => {
//       if (error) {
//         return res.send("error" + error);
//       }
//       // console.log("results.rows[0]", results.rows[0]);
//       if (results.rows[0] === undefined) {
//         return res.send("error" + error);
//       }
//       let hashedPassword = results.rows[0].user_password;
//       // console.log("hashedPassword", hashedPassword)
//       // console.log ("INPUT PASSWORD", user.password)
//       bcrypt.compare(user.password, hashedPassword).then(function(result) {
//         // result == true
//         if (result === true) {
//           jwt.sign(
//             { user },
//             "secretkey",
//             { expiresIn: "1hr" },
//             (err, token) => {
//               res.json({
//                 token,
//                 user: {
//                   user_email: results.rows[0].email,
//                   user_dod_id: results.rows[0].dod_id,
//                   user_first_name: results.rows[0].first_name,
//                   user_last_name: results.rows[0].last_name,
//                   user_dod_id: results.rows[0].dod_id,
//                   USER_warehouses: results.rows[0].warehouse_access,
//                   admin_warehouses: results.rows[0].warehouse_access,
//                   admin_organization: results.rows[0].organization
//                 }
//               });
//               console.log("TOKEN", user)
//               console.log("HIT")
//             }
//             );
//           } else {
//             res.send("error" + error);
//             console.log("NO BRO YOURE NOT ALLOWED")
//           }
//           // console.log("TOOOKKKENNN", token);
//       // console.log("token in app.js", token);
//       // console.log("user app.js", user);
//       });
//     }
//   );
// }


module.exports = {
  verifyToken,
};
