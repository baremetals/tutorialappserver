import { FileUpload } from 'graphql-upload';


export interface FileArgs {
  [x: string]: any;
  file: Promise<FileUpload>;
  filename: string;
  createReadStream: FileUpload['createReadStream'];
}