/****** This creates a class of Rewards that will be Model for this application. *****/
class Rewards {
    // The model takes in two arguments: payer and points.
    constructor(payer, points) {
        // The payer arugment will be assigned to the payer property.
        this.payer = payer;
        // The points argument will be assigned to the points property.
        this.points = points;
        // The timestamp property will be created by initializing a new Date object that provides the time at which the Rewards object is created.
        this.timestamp = new Date()
    }

    /***** Methods for the Rewards object *****/
        // Created getReward method that will return just an object literal with all the properties of the new Rewards object.
    getReward() {
        return {
            "payer": this.payer,
            "points": this.points,
            "timestamp": this.timestamp
        }
    }
}

// Exports the Rewards class so it can be used in other places of the application.
module.exports = Rewards;