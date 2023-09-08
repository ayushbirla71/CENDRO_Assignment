const aws = require("aws-sdk");
require('dotenv').config();

aws.config.update({
    accessKeyId: process.env.AWS_ACCESSKEY_ID,
    secretAccessKey: process.env.AWS_SECRETACCESSKEY,
    region: "ap-south-1"
})

let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
      
        let s3 = new aws.S3({ apiVersion: '2006-03-01' }); 

        var uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",  
            Key: "CENDRO_01/" + file.originalname,  
            Body: file.buffer
        }

        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }
            console.log("file uploaded succesfully")
            return resolve(data.Location)
        })
    })
}

const getImage = async function (files) {

    try {
            let uploadedFileURL = await uploadFile(files[0])
            return uploadedFileURL
    }
    catch (err) {
       return  err.message 
    }
}

module.exports = { getImage };