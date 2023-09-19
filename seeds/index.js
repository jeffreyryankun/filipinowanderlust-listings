const express = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Listing = require('../models/listing');
const { default: mongoose } = require('mongoose');

mongoose.connect('mongodb://localhost:27017/listing');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error..."));
db.once("open", () => {
    console.log("Database connected...");

})

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Listing.deleteMany({});
    for (let i =0; i <=50; i++){
        
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() *10000) +10;
        const list = new Listing({
            location: `${cities[random1000].city}, ${cities[random1000].admin_name}`,
            name: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://picsum.photos',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            price: price

            
        
        });
        await list.save();

    }
}

seedDB().then(() => {
    mongoose.connection.close();


});

