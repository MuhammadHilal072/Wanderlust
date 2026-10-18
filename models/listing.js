const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        filename: {
            type: String,
            // default: "listingimage",
        },
        url: {
            type: String,
            // default: "https://images.unsplash.com/photo-1775840532502-59540d252c54?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8fA%3D%3D",
            // set: (v) => (v === "" ? "https://images.unsplash.com/photo-1775840532502-59540d252c54?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8fA%3D%3D" : v),
        },
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    category: {
        type: String,
        enum: [
            "Trending",
            "Rooms",
            "Iconic Cities",
            "Mountain",
            "Castels",
            "Amazing Pools",
            "Camping",
            "Farms",
            "Arctic",
            "Domes",
            "Boats"
        ],
        required: true,
    },
}); 

// Mongoose Middleware for Deleting a Listing as well as delete that listing reviews from database.
listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

// create first model/colletion/table in DB:
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;


