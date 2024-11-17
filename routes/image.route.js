const express = require('express');
const router = express.Router();
const upload = require('../middlewares/cloudinaryUpload');
const { uploadImages } = require('../controller/image.controller');
const userAuth = require('../middlewares/authMiddleware');

router.post('/upload', userAuth, upload.array('images', 10), uploadImages);

module.exports = router;
