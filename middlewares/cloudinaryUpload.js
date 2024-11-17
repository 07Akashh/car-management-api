const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'car_images',
        allowed_formats: ['jpeg', 'jpg', 'png', 'webp'],
    },
});

const upload = multer({ storage });

module.exports = upload;
