const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bill = new Schema({
    brand: String,
    date: Date,
    number: Number,
    price: Number,
    user: String,
    name: String,
    slug: String,
});

module.exports = mongoose.model('bill', bill);