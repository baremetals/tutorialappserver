import express from "express";
import session from "express-session";
import { createConnection } from "typeorm";
// import { ApolloServer } from "apollo-server-express";
// import { buildSchema } from "type-graphql";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import cors from "cors";
import { register } from "./controllers/UserController"



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

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );
  app.use(
    session({
      store: redisStore,
      name: process.env.COOKIE_NAME,
      sameSite: "Strict",
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
      },
    } as any)
  );

  // const apolloServer = new ApolloServer({
  //   schema: await buildSchema({
  //     resolvers: [],
  //     validate: false,
  //   }),
  // });

  // apolloServer.applyMiddleware({ app });
    
  app.post("/register", async (req, res, next) => {
    console.log("isit here?");
    try {
      console.log("params", req.body);
      const userResult = await register(
        req.body.email,
        req.body.userName,
        req.body.fullName,
        req.body.password
      );
      if (userResult && userResult.user) {
        res.send(`new user created, userId: ${userResult.user.id}`);
      } else if (userResult && userResult.messages) {
        res.send(userResult.messages[0]);
      } else {
        next();
      }
    } catch (ex) {
      console.log(ex)
      res.send(ex.message);
    }
  });

  // app.post("/login", async (req, res, next) => {

  //   try {

  //     const userResult = await login(
  //       req.body.userName,
  //       req.body.password
  //     );

  //     if (userResult && userResult.user) {

  //       req.session.userId = userResult.user?.id;
  //       res.send(`user logged in, userId: ${req.session!.id}`);
  //     } else if (userResult && userResult.messages) {

  //       res.send(userResult.messages[0]);
  //     } else {
  //       next();
  //     }
  //   } catch (ex) {
  //     // console.log(ex);
  //     res.send(ex.message);
  //   }
  // });

  app.listen({ port: process.env.SERVER_PORT }, () => {
    console.log(`Server ready on port ${process.env.SERVER_PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
