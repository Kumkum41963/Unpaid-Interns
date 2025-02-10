const applianceRatings = require('../../data/applianceRatings')

// Calculate electricity usage based on the appliances
// Where appliances consists of user inputs : from frontend
const getElectricityUsage = ({ appliances }) => {
    let estimatedUsage_kwh = 0

    appliances.forEach(appliance => {
        const power = applianceRatings[appliance.name] || 0;
        const { quantity, hoursPerDay } = appliance;

        if (quantity > 0 && hoursPerDay > 0) {
            const dailyConsumption = (power * quantity * hoursPerDay) / 1000
            const monthlyConsumption = dailyConsumption * 30
            estimatedUsage_kwh += monthlyConsumption
        }
    });

    return estimatedUsage_kwh.toFixed(2);

}

module.exports = getElectricityUsage;