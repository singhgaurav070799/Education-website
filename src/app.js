const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/contactEducation', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});
const port = 3000;


// mongoose schema
const educationSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String
  });

 const Contact = mongoose.model('Contact',  educationSchema);

//path for public folder
const static_path = path.join(__dirname , "../public"); 
app.use(express.static(static_path ))
// // ENDPOINTS
app.get('/', (req, res)=>{
    res.send("Hello from the gaurav singh")

})
app.post('/', (req, res) =>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
        }).catch(()=>{
        res.status(400).send("item was not saved to the databse")
        })
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});