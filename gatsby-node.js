const faunadb = require("faunadb")
const q = faunadb.query


exports.createPages = async function ({ actions}) {
    try{
        var client = new faunadb.Client({ secret:"fnAD8_JCIaACB3LdEdw1u_CIgUx6EEd1oZhdsAK_",});
        var result = await client.query(
            q.Map(q.Paginate(q.Match(q.Index("Lolly_id"))),q.Lambda("X", q.Get(q.Var("X"))))
          );
        
      }
      catch(err){
        console.log('err',err);
      }
    const {createPage} = actions
    if (result.data) {
        result.data.forEach((lolly) => {
        const data = lolly.data
          createPage({
            path: `/lolly/${data.url}/`,
            component: require.resolve(`./src/templates/LollyTemplate.tsx`),
            context: {
              data
            },
          })
        })
      }
}