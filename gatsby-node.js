const path = require(`path`)
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query MyQuery {
      LOLLIES {
        getAllLollies {
          to 
          message
          from
          flavourTop
          flavourMiddle
          flavourBottom
          lollyPath
        }
      }
    }
  `);

  console.log(result);
  result.data.LOLLIES.getAllLollies.map((data) => {
    actions.createPage({
      path: `${data.lollyPath}`,
      component: path.resolve(`./src/templates/LollyTemplate.js`),
      context: {
        data: data,
      },
    })
  })
}