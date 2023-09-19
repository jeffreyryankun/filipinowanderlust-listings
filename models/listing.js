const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({

    name: String,
    image: String,
    price: String,
    description: String,
    location: String,
    username: String,
    date: String,
    review: String

})

module.exports = mongoose.model('Listing', listingSchema);
