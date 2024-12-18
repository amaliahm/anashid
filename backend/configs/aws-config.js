import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

export const s3client = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    }
});

export const uploadFileToS3 = async (file, packet_name) => {
  if (!file || !file.buffer) {
    throw new Error("File is undefined or does not have a buffer");
  }
    try {
      const upload = new Upload({
        client: s3client,
        params: {
          Bucket: process.env.BUCKET_NAME,
          Key: `${packet_name}-${file.originalname}-${file.size}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        },
      });
      const result = await upload.done();
      return result.Location; 
    } catch (err) {
      throw err;
    }
  };

  export const deleteImageFromS3 = async (photoKey) => {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: photoKey,
    };
  
    try {
      const data = await s3client.send(new DeleteObjectCommand(params));
      return {message: 'photo deleted successfully'}
    } catch (error) {
      return {error: error}
    }
  };