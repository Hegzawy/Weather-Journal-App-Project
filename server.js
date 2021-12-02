// Setup empty JS object to act as endpoint for all routes
projectData = {};


// Require Express to run server and routes
const express =require('express');
// Start up an instance of app
const app =express();
/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 5000;
app.listen(port, err => {
  if (err) {
    return console.log('error', err)
  }
  console.log(`server is running @ port:${port} on http://localhost:${port}`);
});

// Initialize all route with a callback function
app.get('/getProjectData', (req, res,) => {
  res.send(projectData);
});

// Post Route

app.post ('/postProjectData', (req, res) => {
  projectData = {...req.body};
  console.log(projectData);
  res.end();
})
