const express = require('express');
const router = express.Router();
const controllers = require('../controllers/rewardsCont');

router.post('/reward', (req, res) => {
    try {
      const pointObj = controllers.addReward(req.body.payer, req.body.points); 
      res.status(200).json(pointObj) 
    } catch (err) {
        res.status(404).json(err.message)
    }
    
});

router.get('/reward', (req, res) => {
    try {
      const rewardsArr = controllers.getRewards(); 
      res.status(200).json(rewardsArr) 
    } catch (err) {
        res.status(404).json(err.message)
    }
    
});

module.exports = router;