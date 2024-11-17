const Joi = require('joi');

const carValidationSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(500).required(),
    tags: Joi.string().min(2).max(50).required(),
    company: Joi.string().min(2).max(50).required(),
    dealer: Joi.number().integer().positive().required(),
    price: Joi.number().positive().precision(2).required(),
    year: Joi.number().integer().min(1886).max(new Date().getFullYear()).required(),
    mileage: Joi.number().positive().required(),
    color: Joi.string().min(3).max(30).required(),
    transmission: Joi.string().valid('Automatic', 'Manual').required(),
    fuelType: Joi.string().valid('Petrol', 'Diesel', 'Electric', 'Hybrid', 'Gasoline').required(),
    owner: Joi.string().required(),
    images: Joi.array()
        .items(Joi.string().uri().message('Each image must be a valid URL'))
        .max(10)
        .message('You can upload a maximum of 10 images.')
});

exports.validateCar = (carData) => {
    return carValidationSchema.validate(carData);
};

const updateCarValidationSchema = Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(10).max(500),
    tags: Joi.string().min(3).max(50),
    images: Joi.array()
        .items(Joi.string().uri().message('Each image must be a valid URL'))
        .max(10)
        .message('You can upload a maximum of 10 images.')
}).min(1);

exports.validateCarUpdate = (carData) => {
    return updateCarValidationSchema.validate(carData)
}
