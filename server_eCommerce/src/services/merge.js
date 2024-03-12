const uploadImageFromLocal = async({
    path,
    folderName = 'product/8409'
}) =>{
    try {
        
            const result = await clouddinary.uploader.upload(path,{
                public_id: 'thumb',
                folder: folderName
            })

            console.log({result});
             return {
            image_url : result.secure_url,
            shopId : 8409
             }
    } catch (error) {
        console.log(`Error uploading image ::`,error)
    }
}

///

uploadFileThumb = async (req, res, next) =>{
    const { file } = req
    if(!file) throw new BadRequestError('File missingß')

    new SuccessResponse({
        message : 'upload successfully uploaded',
        metadata : await uploadImageFromLocal({
            path : file.path
        })
    })
}