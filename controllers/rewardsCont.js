/****** Global Variables for Required Packages, files, and PORT address ******/
    // Brings in the Model for the applications Reward object creation.
const Rewards = require('../models/Rewards');
    // Initial Database storage. Rewards that are created will go into this array.
let db = [];
    // Array that will hold only the objects that will be used for points to be taken away.
let usedDB = [];
    // Array that will hold the objects that tells the user what what payer had points taken away and how many points the payer had taken away.
let finalDB = [];

/***** Logic/Controller for the Application's Routes *****/
    // Controller for Adding a Rewards object with the keys Payer, Points, and Timestamp.
const addReward = (payer, points) => {
    // The function takes in two arguments payer and points that will be passed into the Rewards model. This variable will hold the new Rewards object that is created.
    let newReward = new Rewards(payer, points);
    // newRecord will now be stored in the db array. I use the .getReward() method to get just an object back to be stored in the array.
    db.push(newReward.getReward());
    // I then return this object so the user can see what object was created and entered into db.
    return newReward.getReward();
}

    // Controller for Removing Points from different payers based on oldest Timestamp and not having negative points.
const pointRemoval = (points) => {
    // The function takes in an argument that is the points to be removed from the payers.

    // This creates a variable that will now represent the points and can be manipulated so the actual points number does not change.
    let total = points;

        // This variable will contain a new array that is sorted by Timestamp so the oldest Reward object is at index 0 of the array and the newest object will be at the end of the array.
    const sortedArr = db.sort((a, b) => {
        // If statement that says if the first objects timestamp is less than the next object, return -1.
        if (a.timestamp < b.timestamp) {
            return -1;
        }
        // If statement that says if the first objects timestamp is greater than the next object, return 1.
        if (a.timestamp > b.timestamp) {
            return 1;
        }
        // If neither of these statements are true, return 0.
        return 0;

        // This is how the sort array method works. For further information look at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    });
    
        // Creates a variable that will be a "Dictionary" or "Library" for Payer names.
    const checkMap = new Map();

        // This for loop will run until the objects in the sorted array have enough points to be removed.
    for (let i = 0; i < sortedArr.length; i++) {

        // If statement to check if checkMap has a payer name as a key already from the sortedArr objects.
        if (checkMap.has(sortedArr[i].payer)) {
            // If it does, then the function will add the points from the new object in the sortedArr with the same name to the checkMap points associated to that payer key.
            checkMap.set(sortedArr[i].payer, checkMap.get(sortedArr[i].payer) + sortedArr[i].points);
        } else {
            // If there is no payer as the key in the checkMap, then the points from the object in the sortedArr will now become the points for the payer in the checkMap.
            checkMap.set(sortedArr[i].payer, sortedArr[i].points)
        }

        // This if statement checks if the total/points is greater than 0.
        if (total > 0) {
            // If this is true, the for loop will keep subtracting the points from the object in the sortedArr from the total variable and set that as the value of total.
        total = total - sortedArr[i].points;
            // After the points are taken away, the object in the sortedArr will be pushed into the usedDB array.
        usedDB.push(sortedArr[i]);
        } 

        // This if statement checks to see if the total is less than or equal to 0.
        if (total <= 0) {
            // Once this statement is true, the for loop will break and the usedDB will hold only the objects with the proper amount of points.
            break;
        }
    }
    
    // This variable is set to 0, but will increase with the points that are being taken from the payer.
    let addedValues = 0;

        // This is a forEach method (Equivalent to a for loop) to cycle through each key and value in the checkMap.
    checkMap.forEach((value, key) => {
        // Creates a new object that will store the payer name and the points that were removed from it.
        let newObj = {};
        // Variable that starts with the points argument and subracts the value from the key in checkMap to get its value.
        let startPoint = points - value;
        // Variable that takes the startPoint variable and subtracts the points argument from it to get its value.
        let newValue = startPoint - points;
        
        /***** The above variables allow the newObj to be assigned the correct amount of negative points instead of a positive value. *****/


        // After each loop, the addedValues will increase by the value of the key in the loop.
        addedValues += value;

        // If statement that checks if the value of the key is less than the points argument.
        if (value > points) {
            // If that is true, the addedValues will now start with the previous addedValues and subtract the value of the key.
            addedValues = addedValues - value;
            // The startPoint will now take the new addedValues and subtracts the points argument from it to get its value.
            startPoint = addedValues - points;
            // The newValue now becomes just the startValue. It now longer subtracts the points argument from it to get its value.
            newValue = startPoint;

            /***** The above variables allow the newObj to be assigned the correct amount of negative points since the value was bigger than the total amount of points to be taken. Without the math above, you will not get the amount that was actually taken from the payer. *****/

            // Once the above variables have gotten there values, they will now be assigned to the object that was created above. The key of the checkMap will be assigned to the newObj as the payer property.
            newObj.payer = key;
            // The newObj points property will be assigned the newValue.
            newObj.points = newValue;
            // Once the properties have been created and assigned a value, the newObj will be pushed into the finalDB.
            finalDB.push(newObj); 
        } else {
            // If the above statement is not true, the newObj will be assigned the key from the checkMap to the payer property.
            newObj.payer = key;
            // The newObj property of points will be assigned the newValue that was created at the top of the forEach method.
            newObj.points = newValue;
            // This will also be pushed into the finalDB to be stored.
            finalDB.push(newObj);  
        }
    })

    // This pointsRemoval function will finally return the finalDB after the above functions have been completed to show what payer had points taken away and how many points were taken away.
    return finalDB;
}

    // Controller for returning an object that shows all the payers and their total points after points were removed.
const getRewards = () => {
    // Creates a new empty object that will store the payers and the total amount of points they have after points were removed.
    const finalObj = {};
    // Creates a variable that will be a "Dictionary" or "Library" for Payer names.
    const checkMap = new Map();

        // This for loop will cycle through all the objects in the db array.
    for (let i = 0; i < db.length; i++) {
        // If statement to check if checkMap has a payer name as a key already from the db objects.
        if (checkMap.has(db[i].payer)) {
            // If it does, then the function will add the points from the new object in db with the same name to the checkMap points associated to that payer key.
            checkMap.set(db[i].payer, checkMap.get(db[i].payer) + db[i].points);
        } else {
            // If there is no payer as a key in the checkMap, then the points from the object in db will now become the points for the payer in the checkMap.
            checkMap.set(db[i].payer, db[i].points)
        }
    }

        // This for loop will cycle through all the objects in the db array.
    for (let i = 0; i < finalDB.length; i++) {
        // If statement to check if checkMap has a payer name as a key already from the finalDB objects.
        if (checkMap.has(finalDB[i].payer)) {
            // If it does, then the function will add the points from the new object in finalDB with the same name to the checkMap points associated to that payer key.
            checkMap.set(finalDB[i].payer, checkMap.get(finalDB[i].payer) + finalDB[i].points);
        } else {
             // If there is no payer as a key in the checkMap, then the points from the object in finalDB will now become the points for the payer in the checkMap.
            checkMap.set(finalDB[i].payer, finalDB[i].points)
        }
    }

    // This is a forEach method (Equivalent to a for loop) to cycle through each key and value in the checkMap.
    checkMap.forEach((value, key) => {
        // As we cycle through each key and value, we will assign the finalObj to have a property of each key in checkMap. The value of that key will be assigned as the value of the new property in the finalObj.
        finalObj[key] = value;
    });

    // Lastly, the function will return the finalObj so the user can see all the payers and their total number of points.
    return finalObj;
}

// Exports an object with all of the above functions so they can be used in other places of the application.
module.exports = {
    addReward: addReward,
    getRewards: getRewards,
    pointRemoval: pointRemoval
}
