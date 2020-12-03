const { ApolloServer, gql } = require('apollo-server-lambda')

const faunadb = require("faunadb");
const q = faunadb.query;
const shortid = require("shortid");
//we use shortid library for genrating a
const typeDefs = gql`
  type Query {
    hello: String
    getLolly(lollyPath: String!): Lolly
  }
  type Lolly {
    recipientName: String!
    message: String!
    senderName: String!
    flavourTop: String!
    flavourMiddle: String!
    flavourBottom: String!
    lollyPath: String!
  }
  type Mutation {
    createLolly (recipientName: String!, message: String!,senderName: String!, flavourTop: String!,flavourMiddle: String!,flavourBottom: String!) : Lolly
  }
`


const resolvers = {
  Query: {
    hello: () => {
      return 'Hello, Lolly!'
    },
  },
  getLolly: async (_, args) => {
    const lollyPath = args.lollyPath
    const client = new faunadb.Client({ secret: "fnAD7zDC_kACB1LO1oyNlYeDG7ONEoUNYtvjS6Uc" });
    console.log("getting data for", lollyPath)
    const result = await client.query(
      q.Get(q.Match(q.Index("lollies_by_id"), lollyPath))
    )
    if (result.data) {
      return result.data
    }
    return null
  },
  Mutation: {
    createLolly: async (_, args) => {
      // In agrs we receive all properties which is decleared above in Mutation
      console.log("args = ", args);
      const client = new faunadb.Client({ secret: "fnAD7zDC_kACB1LO1oyNlYeDG7ONEoUNYtvjS6Uc" });
      const id = shortid.generate();
      args.lollyPath = id

      const result = await client.query(
        q.Create(q.Collection("lollies-list"), {
          data: args
        })
      );

      console.log('result', result);
      console.log('result', result.data);
      return result.data
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()