const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilities/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

const listingController = require("../controllers/listings.js");


// 1.Main Route/Index Route: to show all the Listings, 2.Create Route/Add Route : to add the new created listing into DB.
router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, validateListing, upload.single('listing[image][url]'), wrapAsync(listingController.createListing));
 
// 1.New Route/Create Route: to create a new Listing.
router.get("/new", isLoggedIn, listingController.renderNewForm);

// 1.Show Route/Read Route : to Read a Specific Listing in detail, 2.Update Route : to Update that edited Listing in DB, 3.Delete Route : to delete a Listing.
router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn, isOwner, validateListing, upload.single('listing[image][url]'), wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// 1.Edit Route : to edit the deatils of a Listing. 
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));
 
module.exports = router;
