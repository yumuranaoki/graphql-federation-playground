import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFileSync } from "fs";
import { users } from "./db";

const typeDefs = gql(readFileSync("./user.graphql", { encoding: "utf-8" }));
const resolvers = {
  Query: {
    users: () => {
      return users;
    },
  },
  User: {
    reviews: (_ref) => {
      return [{ id: 1 }];
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});
server
  .listen({ port: 4001 })
  .then(({ url }) => {
    console.log(`🚀 Products subgraph ready at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });
