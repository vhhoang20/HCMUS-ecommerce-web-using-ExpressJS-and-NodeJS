const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
    name: {type: String, default: ""},
    description: {type: String, default: ""},
    image: {type: String, default: ""},
    brand: {type: String, default: ""},
    slug: {type: String, default: ""},
    price: {type: Number, default: 0}
});

module.exports = mongoose.model('product', product);