import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFileSync } from "fs";
import db from "./db";

const typeDefs = gql(readFileSync("./user.graphql", { encoding: "utf-8" }));
const resolvers = {
  Query: {
    users: () => {
      return db.users;
    },
  },
  User: {
    __resolveReference: (ref) => {
      return db.users.find(({ id }) => id == ref.id);
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
