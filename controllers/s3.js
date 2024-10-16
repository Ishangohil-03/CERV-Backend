const { v4: uuidv4 } = require('uuid');

const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')

const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

const bucketName = "cerv-caterer-images";
const region = "ap-south-1";
const accessKey = "AKIAYGB4FZ5V2LZM6GDN";
const secretKey = "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";

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey
    }
})

async function uploadFile(file){

    const fileName = uuidv4()

    const uploadParams = {
        Bucket: bucketName,
        Body: file.buffer,
        Key: fileName,
        ContentType: file.mimetype,
        ACL: 'public-read'
    }
    
    const command = new PutObjectCommand(uploadParams)
    await s3.send(command)

    return fileName
}
exports.uploadFile = uploadFile;

async function getFileStream(fileKey) {

    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName
    }

    const command = new GetObjectCommand(downloadParams)
    const url = await getSignedUrl(s3, command, {expiresIn: 3600})
  
    return url
  }
  exports.getFileStream = getFileStream

