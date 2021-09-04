const Rewards = require('../models/Rewards');

let db = [];
// { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }, { "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" }, { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" }, { "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" }, { "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" }
let usedDB = [];
let finalDB = [];

const addReward = (payer, points) => {
    let newReward = new Rewards(payer, points);
    // console.log(newReward.getReward());
    db.push(newReward.getReward());
    return newReward.getReward();
}

const pointRemoval = (points) => {
    let total = points;
    const sortedArr = db.sort((a, b) => {
        if (a.timestamp < b.timestamp) {
            return -1;
        }
        if (a.timestamp > b.timestamp) {
            return 1;
        }
        return 0;
    });

    const mapArr = sortedArr.map(obj => {
        let newObj = {};
        newObj.payer = obj.payer;
        newObj.points = obj.points;
        return newObj;
    });
    
    const checkMap = new Map();

    for (let i = 0; i < mapArr.length; i++) {
        // console.log(checkMap.has(mapArr[i].payer));

        if (checkMap.has(mapArr[i].payer)) {
            checkMap.set(mapArr[i].payer, checkMap.get(mapArr[i].payer) + mapArr[i].points);
        } else {
            checkMap.set(mapArr[i].payer, mapArr[i].points)
        }

        if (total > 0) {
        total = total - mapArr[i].points;
        // console.log(points); 
        usedDB.push(mapArr[i]);
        } 
        if (total <= 0) {
            break;
        }
    }
    
    let addedValues = 0;

    checkMap.forEach((value, key) => {
        let newObj = {};
        let startPoint = points - value;
        console.log(startPoint);
        let newValue = startPoint - points;
        console.log(newValue);
        addedValues += value;
        console.log(addedValues, '\n***BREAK***');

        if (value > points) {
            addedValues = addedValues - value;
            startPoint = addedValues - points;
            console.log(startPoint);
            newValue = startPoint;
            console.log(newValue);

            newObj.payer = key;
            newObj.points = newValue;
            finalDB.push(newObj); 
        } else {
            // startPoint = points - value;
            // console.log(startPoint);
            // newValue = startPoint - points;
            // console.log(newValue);
            newObj.payer = key;
            newObj.points = newValue;
            finalDB.push(newObj);  
        }
    })

    // console.log(mapArr, usedDB, checkMap, finalDB);
    return finalDB;
}

const getRewards = () => {
    console.log(db);
    let newObj = {};
    db.forEach((reward) => {
        if (newObj.hasPropertyOf(reward.payer)) {
          newObj[reward.payer] = reward.points;  
        } else {
            newObj[reward.payer] = newObj.points + reward.points;
        }
        
    });
    return newObj;

}
// pointRemoval(5000);

module.exports = {
    addReward: addReward,
    getRewards: getRewards,
    pointRemoval: pointRemoval
}
