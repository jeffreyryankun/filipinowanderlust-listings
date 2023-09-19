const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const Listing = require('./models/listing');



mongoose.connect('mongodb://localhost:27017/listing');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error..."));
db.once("open", () => {
    console.log("Database connected...");

})

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


// dummy route
app.get('/', (req, res) => {
    res.render('home');
})

//form to create new listing

app.get('/listings/new', (req, res) => {
    res.render('listings/new');
})



//create new Listing
app.post('/listings', async(req, res) => {
    const listing = new Listing(req.body.listing);
    console.log(req.body);
    await listing.save();
    res.redirect(`/listings/${listing._id}`);


})

//form to update listing
app.get('/listings/:id/edit', async (req, res) => {

    const listing = await Listing.findById(req.params.id);
    res.render('listings/edit', {listing});
})


//update listing
app.put('/listings/:id', async (req, res) => {

    const {id} = req.params;
    const listing = await Listing.findByIdAndUpdate(id, {...req.body.listing})
    res.redirect(`/listings/${listing._id}`);

})


//delete a listing
app.delete('/listings/:id', async (req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
    

})

//view all listings
app.get('/listings', async (req, res) => {

    const listings = await Listing.find({});
    res.render('listings/index', {listings});
})

//view specific listing
app.get('/listings/:id', async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render('listings/show', {listing});


})



app.listen(3000, () => {
    console.log("Listening on port 3000.");
})