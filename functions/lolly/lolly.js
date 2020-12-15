const { ApolloServer, gql } = require('apollo-server-lambda')
const { default: Axios } = require('axios')
const faunadb = require('faunadb'),
  q = faunadb.query
const shortid = require('shortid')
require('dotenv').config() 

const typeDefs = gql`
  type Query {
      getLollies: [Lolly!]
      getLolly(id: String!): Lolly!
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
    createLolly(recipientName: String!, message: String!, senderName: String!, flavourTop: String!, flavourMiddle: String!,flavourBottom: String!): Lolly
  }
`

const resolvers = {
  Query: {
    getLollies: async () => {
      try { 
        const client = new faunadb.Client({ secret: "fnAD8_JCIaACB3LdEdw1u_CIgUx6EEd1oZhdsAK_"})
        const result = await client.query(
          q.Map(q.Paginate(q.Match(q.Index('Lolly_id'))),
          q.Lambda(x => q.Get(x)))
        )
        return result.data.map(d => {
          return{ 
            recipientName: d.data.recipientName,
            senderName: d.data.senderName,
            message: d.data.message,
            lollyPath: d.data.lollyPath,
            flavourTop: d.data.flavourTop,
            flavourMiddle: d.data.flavourMiddle,
            flavourBottom: d.data.flavourBottom
          }
        })
      } catch (err){
        console.log(err)
      }
    },
    getLolly: async (_,{ id }) => {
      console.log(id)
      try{
        const client = new faunadb.Client({ secret: "fnAD8_JCIaACB3LdEdw1u_CIgUx6EEd1oZhdsAK_"})
        const result = await client.query(
          q.Get(q.Match(q.Index('lolly_by_id'), id))
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
        const client = new faunadb.Client({ secret:"fnAD8_JCIaACB3LdEdw1u_CIgUx6EEd1oZhdsAK_"})
        const id = shortid.generate()
        args.lollyPath = id
        const result = await client.query(
          q.Create(q.Collection('lolly_url'), {
            data: args
          })
        )

        Axios 
        .post("https://api.netlify.com/build_hooks/5fd7d1620ce1a40fbbe570af")
        .then(res => console.log(res))
        .catch(err => console.log(err))
        return result.data
      } catch (err){
        console.log(err)
      }
    } 
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
