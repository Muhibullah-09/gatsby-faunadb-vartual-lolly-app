require('dotenv').config()
const { ApolloServer, gql } = require("apollo-server-lambda");
const axios = require("axios");
const faunadb = require("faunadb");
const query = faunadb.query;

const typeDefs = gql`
  type Lolly {
    id: ID!
    colorTop: String!
    colorMiddle: String!
    colorBottom: String!
    recipient: String!
    message: String!
    sender: String!
    lollyPath: String!
  }

  type Query {
    getLollies: [Lolly!]
  }

  type Mutation {
    addLolly(
      colorTop: String!
      colorMiddle: String!
      colorBottom: String!
      recipient: String!
      message: String!
      sender: String!
      lollyPath: String!
    ): Lolly
  }
`;

const resolvers = {
  Query: {
    getLollies: async (root, args, context) => {
      try {
        const client = new faunadb.Client({
          secret: process.env.FAUNADB_SECRET,
        });

        const result = await client.query(
          query.Map(
            query.Paginate(query.Match(query.Index("lollies-list"))),
            query.Lambda("x", query.Get(query.Var("x")))
          )
        );

        return result.data.map((d) => {
          return {
            id: d.ref.id,
            colorTop: d.data.colorTop,
            colorMiddle: d.data.colorMiddle,
            colorBottom: d.data.colorBottom,
            recipient: d.data.recipient,
            message: d.data.message,
            sender: d.data.sender,
            lollyPath: d.data.lollyPath,
          };
        });
      } catch (error) {
        console.log("Error in fetching Data : ", error);
      }
    },
  },

  Mutation: {
    addLolly: async (
      _,
      {
        colorTop,
        colorMiddle,
        colorBottom,
        recipient,
        message,
        sender,
        lollyPath,
      }
    ) => {
      try {
        const client = new faunadb.Client({
          secret: process.env.FAUNADB_SECRET,
        });

        const result = await client.query(
          query.Create(query.Collection("lollies"), {
            data: {
              colorTop: colorTop,
              colorMiddle: colorMiddle,
              colorBottom: colorBottom,
              recipient: recipient,
              message: message,
              sender: sender,
              lollyPath: lollyPath,
            },
          })
        );

        // axios
        //   .post("https://api.netlify.com/build_hooks/5fd7d1620ce1a40fbbe570af")
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.error(error);
        //   });

        return {
          id: result.ref.id,
          colorTop: result.data.colorTop,
          colorMiddle: result.data.colorMiddle,
          colorBottom: result.data.colorBottom,
          recipient: result.data.recipient,
          message: result.data.message,
          sender: result.data.sender,
          lollyPath: result.data.lollyPath,
        };
      } catch (error) {
        console.log("Error in Adding Data : ", error);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler();

module.exports = { handler };