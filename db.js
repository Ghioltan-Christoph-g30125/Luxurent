const mongoose = require("mongoose");

function connectDB() {
    mongoose.connect('mongodb+srv://luxurent:goldensands2011@cluster0.uanbt.mongodb.net/luxurent' , { useUnifiedTopology: true, useNewUrlParser: true })

    const connection = mongoose.connection;

    connection.on('connected', () =>{
        console.log('MongoDB connection successfully!')
    })

    connection.on('error', ()=>{
         console.log('Mongo DB connection failed!')
    })
}

connectDB();

module.exports=mongoose;