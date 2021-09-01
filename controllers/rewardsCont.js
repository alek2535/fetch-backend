const Rewards = require('../models/Rewards');

let db = [];

const addReward = (payer, points) => {
    let newReward = new Rewards(payer, points);
    // console.log(newReward.getReward());
    db.push(newReward.getReward());
    return newReward.getReward()

}

const getRewards = () => {
    let newObj = {}
    db.forEach((reward) => {
        newObj[reward.payer] = reward.points;
    })
    return newObj;
    // return db.map(reward => {
    //     let newObj = {};
    //     newObj[reward.payer] = reward.points;
    //     return newObj;
    // });
}

// addReward("Dove", 1000);
// addReward("Nike", 5000);

module.exports = {
    addReward: addReward,
    getRewards: getRewards
}
