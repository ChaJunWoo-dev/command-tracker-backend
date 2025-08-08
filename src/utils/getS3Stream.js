import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/s3.js";

const getS3Stream = async (bucketName, key) => {
  const { Body } = await s3.send(
    new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    })
  );

  return Body;
};

export default getS3Stream;
