const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const user = new Schema({
    admin: {type: Boolean, default: false},
    account: {type: String, default: ""},
    password: {type: String, default: ""},
    email: {type: String, default: ""},
    phone: {type: String, default: ""},
    address:{type: String, default: ""},
    name: {type: String, default: ""},
    slug: {type: String, default: ""},
});

user.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', user);