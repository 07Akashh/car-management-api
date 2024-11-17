const express = require('express');

exports.uploadImages = (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'No images uploaded',
            });
        }
        const imageUrls = req.files.map((file) => file.path);

        res.status(200).send({
            success: true,
            message: 'Images uploaded successfully',
            images: imageUrls,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Image upload failed',
            error: error.message,
        });
    }
};

