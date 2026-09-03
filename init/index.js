const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const mongoose = require("mongoose");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapToken = process.env.MAP_TOKEN;

if (!mapToken) {
  console.error("ERROR: MAP_TOKEN is missing or undefined in your .env file!");
  process.exit(1);
}

const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js"); // 1. IMPORT YOUR USER MODEL

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    initDB();
  })
  .catch((err) => {
    console.log("DB Connection Error:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  try {
    // 2. FIND AN EXISTING USER OR CREATE A DEMO USER
    let demoOwner = await User.findOne({});
    
    if (!demoOwner) {
      console.log("No existing user found. Make sure you register at least one user first!");
      process.exit(1);
    }

    await Listing.deleteMany({});
    console.log("Cleared existing database listings...");

    const updatedListings = await Promise.all(
      initData.data.map(async (listing) => {
        const query = `${listing.location}, ${listing.country}`;
        let geometry = { type: "Point", coordinates: [0, 0] };

        try {
          const response = await geocodingClient
            .forwardGeocode({
              query: query,
              limit: 1,
            })
            .send();

          if (response.body.features && response.body.features.length > 0) {
            geometry = response.body.features[0].geometry;
          }
        } catch (geoErr) {
          console.warn(`Geocoding failed for ${query}, using default coordinates.`);
        }

        return {
          ...listing,
          owner: demoOwner._id,
          geometry: geometry,
        };
      })
    );

    await Listing.insertMany(updatedListings);
    console.log("Database initialized successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};