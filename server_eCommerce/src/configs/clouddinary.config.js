'use strict';
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name : 'shopdev-cdn',
    api_key : '375885577656718',
    api_secret : "NKIr4M_FC_h4vIBIeu1T0z5jZxU"
})

console.log(cloudinary.config())


module.exports = cloudinary