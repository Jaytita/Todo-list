const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4040;
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

app.use(express.json());

//Connect MongoDB
async function connect(){
    try{
        await mongoose.connect(uri);
        console.log('Connect to MongoDB')
    } catch (error) {
        console.error(error);
    }
}
connect();

//Database Router
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.use('/',(req,res)=>{
    res.send('Hello Mailok');
})

app.listen(port,()=>{
    console.log(`Server start on port ${port}.`);
})

// Export the Express API
module.exports = app;