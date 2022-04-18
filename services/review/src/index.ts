const { ApolloServer, gql } from ("apollo-server");
const { buildSubgraphSchema } from ("@apollo/subgraph");
const { readFileSync } from ("fs");
import { reviews } from "./db";

const typeDefs = gql(readFileSync("./review.graphql", { encoding: "utf-8" }));
const resolvers = {
  Query: {
    reviews: () => {
      return reviews;
    },
  },
  Review: {
    __resolveReference: (ref) => {
      return reviews.find((u) => u.id == ref.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});
server
  .listen({ port: 4002 })
  .then(({ url }) => {
    console.log(`🚀 Products subgraph ready at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });
