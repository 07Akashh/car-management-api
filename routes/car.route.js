const express = require('express');
const userAuth = require('../middlewares/authMiddleware');
const { createCar, updateCarById, deleteCarById, getCarList, getCarById, deleteAllCars, getUserCarList, searchCars } = require('../controller/car.controller');
const router = express();


router.get('/', getCarList);
router.get('/search', searchCars);
router.get('/user', userAuth, getUserCarList);
router.get('/:id', getCarById);
router.delete('/delete', deleteAllCars);

router.post('/', userAuth, createCar);
router.put('/:id', userAuth, updateCarById);
router.delete('/:id', userAuth, deleteCarById);

module.exports = router;