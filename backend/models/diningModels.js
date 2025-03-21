import mongoose from 'mongoose';

const { Schema } = mongoose;

const diningHallSchema = new Schema({
    location: { type: String, required: true },
    date: { type: Date, required: true },  
    mealType: { type: String, required: true },
    menu: [
        {
            subcategoryName: { type: String, required: true },
            items: [{ itemName: { type: String, required: true } }],
        },
    ],
}, { timestamps: true }); // Adds `createdAt` & `updatedAt` //seems useful

// Unique indexing
diningHallSchema.index({ location: 1, date: 1, mealType: 1 }, { unique: true });

const DiningHall = mongoose.model('DiningHall', diningHallSchema, 'menus');
export default DiningHall;
