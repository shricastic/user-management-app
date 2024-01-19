const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/demo');
        console.log('Connected to MongoDb');
    } catch(error){
        console.error('MongoDB connection error', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;