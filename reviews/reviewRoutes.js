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



async function getReviews(req, res) {
  const artistUUID = req.params.artistID;
  pool.query(`SELECT * FROM reviews WHERE artist_uuid = '${artistUUID}' `, (error, results) => {
    if (error) {
      res.send("error" + error);
    }
    res.send(results.rows);
  });
};

async function addReview(req, res) {
  const userID = req.body.userID;
  const artistID = req.body.artistID;
  const review = req.body.review;
  const reviewerFirst = req.body.reviewerFirstName;
  const reviewerLast = req.body.reviewerLastName;
  const starReview = req.body.starReviews;
  pool.query(
    `INSERT INTO reviews (review, date, artist_uuid, rating, reviewer_first, reviewer_last)
    VALUES ('${review.review}', '${review.date}', '${artistID}', '${starReview}', '${reviewerFirst}', '${reviewerLast}')`,
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
//sklnlk


module.exports = {
  addReview,
  getReviews
};
