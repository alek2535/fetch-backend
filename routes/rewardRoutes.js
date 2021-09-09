/****** Global Variables for Required Packages, files, and PORT address ******/
  // Brings in the express npm package.
const express = require('express');
  // Initializes the Router object from express.
const router = express.Router();
  // Brings the controllers(logic) for each route of the application.
const controllers = require('../controllers/rewardsCont');

/***** Routes for the Application *****/
  // POST route to enter in a new object with Payer, Points, and Timestamp
router.post('/rewards-entry', (req, res) => {
  // Destructures Payer and Points from the request body.
  const { payer, points } = req.body;

    // Try-Catch block for logic
    try {
      // Sets this variable to be the returned Array from the controller.
      const pointsArr = controllers.addReward(payer, points);
      // Sends back the pointsArr in JSON form as long as we get a 200 response code. 
      res.status(200).json(pointsArr) 
    } catch (err) {
      // This will send back an error message in JSON form if we get back an 404 error response code.
        res.status(404).json(err.message)
    }
    
});

  // POST route to Remove points from our Array of points that were inputted from the above route.
router.post('/rewards-removal', (req, res) => {
  // Destructures the request body object and allows us to only use points as a variable instead of req.body.points.
  const { points } = req.body;


  try {
    // Sets this variable to be the returned Array from the controller.
    const pointsArr = controllers.pointRemoval(points); 
    // Sends back the pointsArr in JSON form as long as we get a 200 response code. 
    res.status(200).json(pointsArr) 
  } catch (err) {
    // This will send back an error message in JSON form if we get back an 404 error response code.
      res.status(404).json(err)
  }
  
});

router.get('/rewards-balance', (req, res) => {
    try {
      // Sets this variable to be the returned Object from the controller.
      const rewardsObj = controllers.getRewards(); 
      // Sends back the rewardsObj in JSON form as long as we get a 200 response code. 
      res.status(200).json(rewardsObj) 
    } catch (err) {
      // This will send back an error message in JSON form if we get back an 404 error response code.
        res.status(404).json(err.message)
    }
    
});

  // Exports our router object so we can use it in other files, such as server.js.
module.exports = router;