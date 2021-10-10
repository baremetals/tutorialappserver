import { IResolvers } from "apollo-server-express";
import { QueryArrayResult, QueryOneResult } from "../controllers/QuerryArrayResult"

interface EntityResult {
    messages: Array<string>;
}