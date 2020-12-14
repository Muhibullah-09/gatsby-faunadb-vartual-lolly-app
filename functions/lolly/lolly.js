require("dotenv").config()
const { ApolloServer, gql } = require("apollo-server-lambda")
const axios = require('axios')
const faunadb = require("faunadb"),
  q = faunadb.query

const typeDefs = gql`
  type Lolly {
    To: String!
    message: String!
    from: String!
    flavourTop: String!
    flavourMiddle: String!
    flavourBottom: String!
    url: String!
  }

  type Query {
    getLollyByURL(url: String!): Lolly
    getAllLolly: [Lolly!]
  }
  type Mutation {
    createLolly(
      To: String!
      message: String!
      from: String!
      flavourTop: String!
      flavourMiddle: String!
      flavourBottom: String!
      url: String!
    ): Lolly
  }
`

const resolvers = {
  Query: {
    getAllLolly: async () => {
      try {
        var client = new faunadb.Client({
          secret: "fnAD8_JCIaACB3LdEdw1u_CIgUx6EEd1oZhdsAK_",
        })
        var result = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("Lolly_id"))),
            q.Lambda("X", q.Get(q.Var("X")))
          )
        )
        return result.data.map(a => {
          return {
            id: a.ts,
            To: a.data.To,
            message: a.data.message,
            from: a.data.from,
            flavourBottom: a.data.flavourBottom,
            flavourTop: a.data.flavourTop,
            flavourMiddle: a.data.flavourMiddle,
            url: a.data.url,
          }
        })
      } catch (err) {
        console.log("err", err)
      }
    },
    getLollyByURL: async (_, { url }) => {
      try {
        var client = new faunadb.Client({
          secret: "fnAD8_JCIaACB3LdEdw1u_CIgUx6EEd1oZhdsAK_",
        })
        var result = await client.query(
          q.Get(q.Match(q.Index("Lolly_id"), url))
        )
        return result.data
      } catch (err) {
        console.log("err", err)
      }
    },
  },
  Mutation: {
    createLolly: async (_, { To, from, message, flavourTop, flavourMiddle, flavourBottom, url }) => {
      try {
        var client = new faunadb.Client({
          secret: "fnAD8_JCIaACB3LdEdw1u_CIgUx6EEd1oZhdsAK_",
        })
        var result = await client.query(
          q.Create(q.Collection("Lolly"), {
            data: {
              To,
              message,
              from,
              flavourTop,
              flavourMiddle,
              flavourBottom,
              url,
            },
          })
        )
        axios.post("https://api.netlify.com/build_hooks/5fd6a3e1ae5523a4ea51c34c")
        return result.data
      } catch (error) {
        console.log("Error: ")
        console.log(error)
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
