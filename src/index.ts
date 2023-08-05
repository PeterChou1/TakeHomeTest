import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import cookieParser from 'cookie-parser';
import { typeDefs } from './schema';
import { authDirective } from './auth';
import { resolvers } from './resolvers';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from './env';

const getUserFromToken = (token : string) => {
  try {
    if (token) {
      return jwt.verify(token, JWT_SECRET_KEY);
    }
    return null;
  } catch (error) {
    return null;
  }
};


const { authDirectiveTypeDefs, authDirectiveTransformer } = authDirective();
const app = express();
app.use(cookieParser());

let schema = makeExecutableSchema({
  typeDefs: [authDirectiveTypeDefs, typeDefs],
  resolvers,
});

schema = authDirectiveTransformer(schema);

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => {
    const token = req.headers.authorization || '';
    const user = getUserFromToken(token);
    return { req, res, user };
  },
});

server.start().then(() => {
  server.applyMiddleware({ app });
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
})

