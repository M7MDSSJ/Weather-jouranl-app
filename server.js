// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors =require('cors');
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3333;
const server = app.listen(port , () => {
    // console a message for debug
    console.log("server rinning");
    console.log(`running on http://localhost:${port}`);
});

// set Get route
app.get('/allData' , (req,res) => {
res.send(projectData);
});

// set Post route
app.post('/post' , (req,res) => {
    return projectData=req.body;
});
