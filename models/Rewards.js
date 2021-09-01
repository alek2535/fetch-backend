class Rewards {
    constructor(payer, points) {
        this.payer = payer;
        this.points = points;
        this.timestamp = new Date()
    }
    getReward() {
        return {
            "payer": this.payer,
            "points": this.points,
            "timestamp": this.timestamp
        }
    }
}

module.exports = Rewards;