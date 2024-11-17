const mongoose = require("mongoose");
const User = require('./User.modal.js');

const carSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: String, required: true },
    company: { type: String, required: true },
    dealer: { type: Number, required: true },
    price: { type: Number, required: true },
    year: { type: Number, required: true },
    mileage: { type: Number, required: true },
    color: { type: String, required: true },
    transmission: { type: String, required: true, enum: ['Automatic', 'Manual'] },
    fuelType: { type: String, required: true, enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Gasoline'] },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'UserData', required: true, index: true },
    images: [{ type: String }],
}, { timestamps: true });

const Car = mongoose.model('CarData', carSchema);

module.exports = Car;
