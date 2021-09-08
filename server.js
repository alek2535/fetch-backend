/****** Global Variables for Required Packages, files, and PORT address ******/

    // Brings in the express npm package.
const express = require('express'); 

    // Initializes the express application.
const app = express(); 

    // Global variable for the PORT address.
const PORT = process.env.PORT || 3001; 

    // Brings in the endpoints/routes for the application.
const routes = require('./routes/rewardRoutes');

/***** Middleware for the Application  *****/ 
    // Allows the application to parse requests with urlencoded payloads.
app.use(express.urlencoded({extended: true}));
    // Allows the application to parse requests with JSON payloads.
app.use(express.json());
    // Allows the application to use the middleware that is being passed in from the routes variable. It also sets up the path /api in front of the paths created in the routes middleware.
app.use('/api', routes);

    // This tells the application to listen for the host and port that the application is running on. We passed in PORT that we defined to have the address 3001 at the top of our page.
app.listen(PORT, () => console.log(`Your Server is Running on PORT: ${PORT}`));
