const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4040;
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

//Connect MongoDB
async function connect(){
    try{
        await mongoose.connect(uri);
        console.log('Connect to MongoDB')
    } catch (error) {
        console.error(error);
    }
}

//connect to database
connect();

app.use('/',(req,res)=>{
    res.send('Hello Mailok');
})

app.listen(port,()=>{
    console.log(`Server start on port ${port}.`);
})