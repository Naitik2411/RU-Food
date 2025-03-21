import Menu from "../models/diningModels.js";

const getMenusFromLocation = async (req, res) => {
    try {
        const { location, mealType, date } = req.params;

        if (!location || !mealType || !date) {
            return res.status(400).json({ message: "Missing required parameters" });
        }
        const locations = location.split(",");
        const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999);

        // Fetch menu for the given location, mealType, and date
        const menus = await Menu.findOne(
            { 
                location: { $in: locations.map(loc => loc.trim()) }, 
                mealType: mealType.trim(), 
                date: {$gte: startOfDay, $lte: endOfDay}
            },
            { "menu.subcategoryName": 1, "menu.items": 1, date: 1, _id: 0 } // Keep full items array
        );

        if (!menus) {
            return res.status(404).json({ message: "No menus found for this location and meal type on this date" });
        }

        res.status(200).json({ menus });
    } catch (error) {
        console.error("Error fetching menus:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default { getMenusFromLocation };