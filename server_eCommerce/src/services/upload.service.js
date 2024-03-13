"use strict";
const cloudinary = require(`../configs/clouddinary.config`)

const upLoadImageFormUrl = async ({urlImage,fileName}) =>{
    try {
        // const urlImage = 'https://photo.znews.vn/w960/Uploaded/ygtmvd/2024_03_11/Xc7Z6yZXqFSNZcPXt2b2cG_1200_80.j.jpg'
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

const uploadImageFromLocal = async({
    path,
    folderName = 'product/8409'
}) =>{
    try {
        
            const result = await cloudinary.uploader.upload(path,{
                public_id: 'thumb',
                folder: folderName
            })
            
            const thumb_url = await cloudinary.url(result.public_id,{
                height: 100,
                width: 100,
                format : 'jpg'
            }) 
            console.log({thumb_url});
             return {
                                image_url : result.secure_url,
                                shopId : 8409,
                                thumb_url : thumb_url
                        }
    } catch (error) {
        console.log(`Error uploading image ::`,error)
    }
}

const uploadImageFromLocalFiles = async({
    files,
    folderName = 'product/8409'
}) =>{
    try {

        console.log(`files::: `,files,folderName)
        if(!files.length) return 
        
        const uploadedUrl = []
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path,{
                folder: folderName
            });
            console.log(`result`,result)
            uploadedUrl.push({
                image_url : result.secure_url,
                shopId : 8409,
                thumb_url : await cloudinary.url(result.public_id,{
                                height: 100,
                                width: 100,
                                format : 'jpg'
                            }) 
            })
        }
            
        return uploadedUrl

    } catch (error) {
        console.log(`Error uploading image ::`,error)
    }
}

module.exports = { 
                    upLoadImageFormUrl,
                    uploadImageFromLocal,
                    uploadImageFromLocalFiles 
                }