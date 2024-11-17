const { default: mongoose } = require("mongoose");
const Car = require("../modals/Car.modal.js");
const { validateCar, validateCarUpdate } = require('../validations/carValidation.js')

exports.createCar = async (req, res) => {
    try {
        const { error } = validateCar({
            ...req.body,
            owner: req.user.userId
        });
        if (error) return res.status(400).send({
            Success: false,
            message: 'Car Cannot be Added',
            error: error.details[0].message
        });

        const createdData = await Car.create({
            ...req.body,
            owner: req.user.userId
        });

        return res.status(200).send({
            Success: true,
            message: 'Car Added Successfully',
            data: createdData
        });

    } catch (error) {
        console.log(error)
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).send({
                Success: false,
                message: `Car Cannot be Added. The ${field} is already in use.`,
                error: error.keyValue
            });
        }

        return res.status(500).send({
            Success: false,
            message: 'Car Cannot be Created',
            error: error.message
        });
    }
}


exports.updateCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCarData = req.body;
        const { error } = validateCarUpdate(updatedCarData);

        if (error) {
            return res.status(400).json({
                Success: false,
                message: 'Invalid car data for update',
                error: error.details[0].message,
            });
        }

        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({
                Success: false,
                message: 'Car not found',
            });
        }

        if (car.owner.toString() !== req.user.userId.toString()) {
            return res.status(403).json({
                Success: false,
                message: 'You are not authorized to update this car',
            });
        }

        const updatedCar = await Car.findByIdAndUpdate(id, updatedCarData, { new: true });
        if (!updatedCar) {
            return res.status(404).json({
                Success: false,
                message: 'Car not found',
            });
        }

        res.status(200).send({
            Success: true,
            message: 'Car Updated Successfully',
            data: updatedCar
        })
    } catch (error) {
        res.status(404).send({
            Success: false,
            message: 'Car cannot be Updated',
            error: error
        })
    }
}

exports.deleteCarById = async (req, res) => {
    const carId = req.params.id;
    try {

        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({
                Success: false,
                message: 'Car not found',
            });
        }

        if (car.owner.toString() !== req.user.userId.toString()) {
            return res.status(403).json({
                Success: false,
                message: 'You are not authorized to update this car',
            });
        }

        const deletedCar = await Car.findByIdAndDelete(carId);
        return res.status(200).send({
            Success: true,
            message: 'Car Deleted Successfully',
            data: deletedCar
        });
    } catch (error) {
        return res.status(404).send({
            Success: false,
            message: 'Car Cannot be Deleted',
            error: error
        })
    }
}

exports.getCarList = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;

        const skip = (page - 1) * limit;

        const cars = await Car.find({})
            .skip(skip)
            .limit(limit);

        const totalCars = await Car.countDocuments({});

        const totalPages = Math.ceil(totalCars / limit);

        return res.status(200).send({
            Success: true,
            message: 'Car list fetched successfully',
            data: cars,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalCars: totalCars,
                limit: limit
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            Success: false,
            message: 'Error fetching car list',
            error: error.message
        });
    }
};


exports.getUserCarList = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;

        const skip = (page - 1) * limit;
        const owner = req.user.userId;
        if (!mongoose.isValidObjectId(owner)) {
            return res.status(400).send({ Success: false, message: 'Invalid user ID' });
        }

        const cars = await Car.find({ owner: owner })
            .skip(skip)
            .limit(limit);

        const totalCars = await Car.countDocuments({ owner: owner });

        const totalPages = Math.ceil(totalCars / limit);

        return res.status(200).send({
            Success: true,
            message: 'Use Car list fetched successfully',
            data: cars,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalCars: totalCars,
                limit: limit
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            Success: false,
            message: 'Error fetching car list',
            error: error.message
        });
    }
};



exports.getCarById = async (req, res) => {
    const id = req.params.id;
    try {
        const car = await Car.findById(id).populate('owner', 'firstName lastName email')
            .exec();
        return res.status(200).send({
            Success: true,
            message: 'Car Fetched Successfully',
            data: car
        });
    } catch (error) {
        console.log(error)
        return res.status(404).send({
            Success: false,
            message: 'User Cannot be Fetched',
            error: error
        });
    }
}

exports.searchCars = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                Success: false,
                message: 'Search query is required'
            });
        }

        const results = await Car.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { tags: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });

        if (results.length === 0) {
            return res.status(404).json({
                Success: false,
                message: 'No cars found matching the search criteria'
            });
        }

        res.status(200).json({
            Success: true,
            message: "Search Cars Result",
            data: results
        });
    } catch (error) {
        console.error('Error searching cars:', error);
        res.status(500).json({
            Success: false,
            message: 'Internal server error',
            error
        });
    }
};

exports.deleteAllCars = async (req, res) => {
    try {
        const cars = await Car.deleteMany();
        return res.status(200).send({
            Success: true,
            message: 'Cars Deleted Successfully',
            data: cars
        });
    } catch (error) {
        return res.status(404).send({
            Success: false,
            message: 'Cars Cannot be Deleted',
            error: error
        });
    }
}