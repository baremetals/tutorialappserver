import { Request, Response } from "express";
import {PubSub} from "graphql-subscriptions";
// import { Storage } from '@google-cloud/storage';
// import path from 'path';
// import config from '../../database';


export const pubsub = new PubSub();
export interface GqlContext {
  req: Request;
  res: Response;
}

// export const storage = new Storage({
//   keyFilename: path.join(__dirname, '../../database'),
//   projectId: config.project_id,
// });

// export const bucketName = config.bucket_name;