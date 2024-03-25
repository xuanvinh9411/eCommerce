const {  S3Client, PutObjectCommand , GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const config = {
    region : 'ap-southeast-1',
    credentials : {
        accessKeyId : process.env.AWS_BUCKET_ACCESS_KEY,
        secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY
    }
}
console.log(`console.log(process.env)`,process.env.DEV_APP_PORT)
console.log(`config`,config)
const s3 = new S3Client(config)
module.exports = {
    s3,
    PutObjectCommand,
    getSignedUrl,
    GetObjectCommand
}