require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server-lambda');
const axios = require('axios');
const faunadb = require('faunadb');
const q = faunadb.query;
const shortid = require('shortid');

const typeDefs = gql`
  type Query {
      getLollies: [Lolly!]
      getLollyByPath(lollyPath: String!): Lolly
  }
  type Lolly {
    to: String!
    message: String!
    from: String!
    flavourTop: String!
    flavourMiddle: String!
    flavourBottom: String!
    lollyPath: String!
  } 
  type Mutation {
    createLolly(
      to: String!
      message: String!
      from: String!
      flavourTop: String!
      flavourMiddle: String!
      flavourBottom: String!): Lolly
  }
`

const resolvers = {
  Query: {
    getLollies: async () => {
      try {
        const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });
        const result = await client.query(
          q.Map(q.Paginate(q.Match(q.Index('lollies-list'))),
            q.Lambda(x => q.Get(x)))
        )
        return result.data.map(d => {
          return {
            to: d.data.to,
            from: d.data.from,
            message: d.data.message,
            lollyPath: d.data.lollyPath,
            flavourTop: d.data.flavourTop,
            flavourMiddle: d.data.flavourMiddle,
            flavourBottom: d.data.flavourBottom
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    getLollyByPath: async (_, args) => {
      try {
        const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });
        const result = await client.query(
          q.Get(q.Match(q.Index('lollies-list'), args.lollyPath))
        )
        return result.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  Mutation: {
    createLolly: async (_, args) => {
      try {
        const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET })
        // const id = shortid.generate()
        // args.lollyPath = id
        const result = await client.query(
          q.Create(q.Collection('lollies'), {
            data: args
          })
        )
        axios.post(process.env.BUILD_HOOK_NETLIFY)
          .then(res => console.log(res))
          .catch(err => console.log(err))
        return result.data
      } catch (err) {
        console.log(err)
      }
    }
  }
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler();