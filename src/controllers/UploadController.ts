import { UserInputError } from 'apollo-server-express';
import {
  checkFileSize,
  generateUniqueFilename,
  uploadToGoogleCloud,
} from '../lib/files';
import { FileArgs } from '../lib/files/types';

export const upload = async (promise: FileArgs): Promise<string> => {
  const { filename, createReadStream }: FileArgs = promise;

  // console.log(filename);
  try {
    const oneGb: number = 1000000000;
    await checkFileSize(createReadStream, oneGb);
  } catch (ex) {
    if (typeof ex === 'number') {
      throw new UserInputError('Maximum file size is 1GB');
    }
    throw ex;
  }
  // generate a scrubbed unique filename
  const uniqueFilename = generateUniqueFilename(filename);
  console.log(uniqueFilename);
  // upload to Google Cloud Storage
  try {
    await uploadToGoogleCloud(createReadStream, uniqueFilename);
  } catch (ex) {
    console.log(ex)
    throw new UserInputError('Error with uploading to Google Cloud');
  }

  return uniqueFilename;
};
