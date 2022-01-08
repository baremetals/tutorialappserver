import { Storage } from '@google-cloud/storage';
import path from 'path';

export const storage = new Storage({
  keyFilename: path.join(__dirname, '../../../storagedb.json'),
  projectId: process.env.PROJECT_ID,
});
export const bucketName = process.env.BUCKET_NAME;

// async function createBucket() {
//   // Creates the new bucket
//   await storage.createBucket(bucketName);
//   console.log(`Bucket ${bucketName} created.`);
// }

// createBucket().catch(console.error);


export async function uploadFile(filePath: any, destFileName: string): Promise<string>{
  await storage.bucket(bucketName as string).upload(filePath, {
    destination: destFileName,
  });

  console.log(`${filePath} uploaded to ${bucketName}`);
  return destFileName;
}

// uploadFile().catch(console.error);

// async function downloadFile() {
//   const options = {
//     destination: destFileName,
//   };

//   // Downloads the file
//   await storage.bucket(bucketName).file(fileName).download(options);

//   console.log(`gs://${bucketName}/${fileName} downloaded to ${destFileName}.`);
// }

// downloadFile().catch(console.error);
