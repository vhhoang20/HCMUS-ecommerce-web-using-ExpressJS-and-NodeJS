const mongoose = require('mongoose');

async function connect()
{
    try
    {
        await mongoose.connect('mongodb+srv://shop_web:159357456258@cluster0.nasaa5r.mongodb.net/test');
    }
    
    catch (e)
    {
        console.log('Connect failed')
    }
}

module.exports = {connect}