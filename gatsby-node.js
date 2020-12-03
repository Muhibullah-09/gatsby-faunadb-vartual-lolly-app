const path = require("path");
exports.createPages = async ({ actions }) => {
  const faunadb = require("faunadb")
  const q = faunadb.query
  const client = new faunadb.Client({ secret: "fnAD7zDC_kACB1LO1oyNlYeDG7ONEoUNYtvjS6Uc" });
  const result = await client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("lollies-list"))),
      q.Lambda("lollyId", q.Get(q.Var("lollyId")))
    )
  )
  const { createPage } = actions
  result.data.forEach(lolly => {
    const data = lolly.data
    createPage({
      path: `/${data.lollyPath}/`,
      component: path.resolve(`./src/templates/Template.tsx`),
      context: {
        data,
      },
    })
  })
}