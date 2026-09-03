const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utilities/wrapAsync.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");


// 1.Adding Reviews for a Listing using this route :
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// 2.Delete Route for Reviews : to delete a review.
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;


