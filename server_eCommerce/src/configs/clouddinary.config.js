'use strict';
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name : '',
    api_key : '',
    api_secret : ""
})

console.log(cloudinary.config())


module.exports = cloudinary