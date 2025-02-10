const getBillBasedElectricityUsage = require("../utils/electricity-usage/getBillBasedElectricityUsage");
const getElectricityUsage = require("../utils/electricity-usage/getElectricityUsage");

const calculateElectricityUsage = (req, res) => {
    try {

        const { method } = req.body;

        // appliance based
        if (method === "appliance") {
            const { appliances } = req.body;

            if (!Array.isArray(appliances) || appliances.length == 0) {
                return res.status(400).json({ error: "Please choose an appliance" });
            }

            // send this all input to util and get the calculated monthly usage
            const calculatedUsage = getElectricityUsage({ appliances });

            return res
                .status(200)
                .json({ calculatedMonthlyUsage_kwh: calculatedUsage });
        }
        // bill based 
        else if (method === "bill") {
            const { billAmount, state, unitPrice } = req.body;

            if (!billAmount) {
                return res
                    .status(400)
                    .json({ error: "Please fill the required details" });
            }

            const calculatedUsage = getBillBasedElectricityUsage({
                billAmount,
                state,
                unitPrice,
            });

            return res
                .status(400)
                .json({ estimatedMonthlyUsage_kwh: calculatedUsage });
        }

        return res.status(400).json({ error: "Invalid selection" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = calculateElectricityUsage;
