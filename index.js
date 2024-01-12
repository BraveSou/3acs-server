// this file contains the server code

const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');
// above we import all the required libraries

const app = express();//this is the server instantiation line

app.use(cors());

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Include routes
app.use('/api', routes);

// ... Other application setup ...

const PORT = process.env.PORT || 3000;//this is the port through which the server will run, basically it is set in the .env file and it will run on port 3000 if port 80 is not available

// the code below is for starting the server and listening to the requests made
// to run the server, we can use node index, or npm run or nodemon index

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
