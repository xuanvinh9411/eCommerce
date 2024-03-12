const multer = require('multer');

const upLoadMemory = multer({
    storage: multer.upLoadMemory()
})

const upLoadDisk = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,`${Date.now()}-${file.originalname}` )
    }
  })
  
module.exports = {
    upLoadMemory,
    upLoadDisk
}