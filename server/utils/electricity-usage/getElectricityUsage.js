const applianceRatings = require('../../data/applianceRatings');

// Calculate electricity usage based on the appliances
const getElectricityUsage = ({ appliances }) => {
    let estimatedUsage_kwh = 0;

    console.log("Received Appliances:", JSON.stringify(appliances, null, 2)); // Debug log

    appliances.forEach(appliance => {
        const power = applianceRatings[appliance.name] || 0;
        const { quantity, hours } = appliance; // Ensure correct key names

        console.log(`🔍 Checking: ${appliance.name} | Power: ${power}W | Quantity: ${quantity} | Hours: ${hours}`);

        if (quantity > 0 && hours > 0) {
            const dailyConsumption = (power * quantity * hours) / 1000;
            const monthlyConsumption = dailyConsumption * 30;
            estimatedUsage_kwh += monthlyConsumption;

            console.log(`Daily: ${dailyConsumption.toFixed(2)} kWh | Monthly: ${monthlyConsumption.toFixed(2)} kWh`);
        } else {
            console.log("Invalid values: Skipping calculation for", appliance.name);
        }
    });

    console.log("Total Estimated Usage:", estimatedUsage_kwh.toFixed(2), "kWh");
    return estimatedUsage_kwh.toFixed(2);
};

module.exports = getElectricityUsage;
