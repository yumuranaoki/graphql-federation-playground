import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFileSync } from "fs";
import db from "./db";

const typeDefs = gql(readFileSync("./review.graphql", { encoding: "utf-8" }));
const resolvers = {
  Query: {
    reviews: () => {
      return db.reviews;
    },
  },
  Review: {
    reviewer: (ref) => {
      return { id: db.reviews.find(({ id }) => id == ref.id)?.userId };
    },
    __resolveReference: (ref) => {
      return db.reviews.find((review) => review.id == ref.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});
server
  .listen({ port: 4002 })
  .then(({ url }) => {
    console.log(`🚀 Review subgraph ready at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });
