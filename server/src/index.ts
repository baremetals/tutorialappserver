import express from "express";
import session from "express-session";

import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import {
  makeExecutableSchema,
} from "@graphql-tools/schema";

import typeDefs from "./graphql/typeDefs"
import PostResolver from "./graphql/resolvers/postResolver";
import userResolver from "./graphql/resolvers/userResolver";
import commentResolver from "./graphql/resolvers/commentResolver";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import cors from "cors";

// import creatGroup from "./controllers/GroupController"

// This is requied to extend the  express-session type.
declare module "express-session" {
  interface Session {
    userId: string;
    userName: string;
  }
}

// console.log("stuffs")
require("dotenv").config();

const main = async () => {
  
  const app = express();
  
  await createConnection();
  const redis = new Redis({
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    // password: process.env.REDIS_PASSWORD,
  });
  const RedisStore = connectRedis(session);
  const redisStore = new RedisStore({
    client: redis,
  });

  
  app.use(
    cors({
      origin: "*", //"http://localhost:3000",
      credentials: true,
    })
  );
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use(
    session({
      store: redisStore,
      name: process.env.COOKIE_NAME,
      sameSite: "Strict",
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        // path: "/",
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24, // 24 hrs
      },
    } as any)
  );
  

  
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: [PostResolver, userResolver, commentResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
    
  });
  

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });
  
  // creatGroup(12);
  app.listen({ port: process.env.SERVER_PORT }, () => {
    console.log(
      `Server ready on port ${process.env.SERVER_PORT}${apolloServer.graphqlPath}`
    );
  });
};

main().catch((err) => {
  console.error(err);
});
