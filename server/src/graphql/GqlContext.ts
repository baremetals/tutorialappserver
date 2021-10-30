import { Request, Response } from "express";
import {PubSub} from "graphql-subscriptions";


export const pubsub = new PubSub();

export interface GqlContext {
  req: Request;
  res: Response;
}
