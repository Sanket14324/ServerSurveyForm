const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/survey'
mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true});


var db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

//Connecting to mongo DB
db.once('open', function(err){
    if(err) console.log("Error :",err)
    console.log("Connected");
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;