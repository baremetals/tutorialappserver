import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";

export const createClient = (ctx: NextPageContext) => 
  new ApolloClient({
    uri: "http://localhost:8000/graphql",
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache({ resultCaching: false }),
  });


export const withApollo = createWithApollo(createClient);
