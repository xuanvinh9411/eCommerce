"use strict";
const cloudinary = require(`../configs/clouddinary.config`)

const upLoadImageFormUrl = async ({urlImage,fileName}) =>{
    try {
        const urlImage = 'https://photo.znews.vn/w960/Uploaded/ygtmvd/2024_03_11/Xc7Z6yZXqFSNZcPXt2b2cG_1200_80.j.jpg'
        const folderName = 'product/shopId'
        // , fileName  = 'demo_auto'

        const result = await cloudinary.uploader.upload(urlImage, {quality:"auto",overwrite: true,public_id: newFileName,folder: folderName});
        // const result2 = await cloudinary.image("demo_auto.jpg", {quality: "auto"});
        // console.log({result}); 
        // console.log({result2}); 
        return result
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { upLoadImageFormUrl }