import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export const S3Service = {
  /**
   * Upload an image to S3
   * @param fileBuffer Buffer of the image
   * @param fileName Name of the file
   * @param contentType MIME type (image/jpeg, etc.)
   */
  async uploadImage(fileBuffer: Buffer, fileName: string, contentType: string) {
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    const key = `uploads/${Date.now()}-${fileName}`;

    try {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: fileBuffer,
        ContentType: contentType,
      });

      await s3Client.send(command);
      
      // Return the public URL (or construct it)
      return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    } catch (error) {
      console.error("S3 Upload Error:", error);
      throw new Error("Failed to upload image to S3");
    }
  },

  /**
   * Generate a Presigned URL for direct frontend upload (Optimization)
   */
  async getPresignedUrl(fileName: string, contentType: string) {
    const key = `uploads/${Date.now()}-${fileName}`;
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return { url, key };
  }
};
