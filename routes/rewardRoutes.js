const express = require('express');
const router = express.Router();
const controllers = require('../controllers/rewardsCont');

router.post('/rewards-entry', (req, res) => {
  const { payer, points } = req.body;

    try {
      const pointObj = controllers.addReward(payer, points); 
      res.status(200).json(pointObj) 
    } catch (err) {
        res.status(404).json(err)
    }
    
});

router.post('/rewards-removal', (req, res) => {
  const { points } = req.body;

  try {
    const pointObj = controllers.pointRemoval(points); 
    res.status(200).json(pointObj) 
  } catch (err) {
      res.status(404).json(err)
  }
  
});

router.get('/reward', (req, res) => {
    try {
      const rewardsArr = controllers.getRewards(); 
      res.status(200).json(rewardsArr) 
    } catch (err) {
        res.status(404).json(err)
    }
    
});

module.exports = router;