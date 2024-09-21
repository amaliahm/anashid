import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

export const s3client = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    }
});

export const uploadFileToS3 = async (file) => {
    try {
      const upload = new Upload({
        client: s3client,
        params: {
          Bucket: process.env.BUCKET_NAME,
          Key: `${file.fieldname}-${Date.now()}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        },
      });
      const result = await upload.done();
      return result.Location; 
    } catch (err) {
      console.error("Error uploading file to S3:", err);
      throw err;
    }
  };