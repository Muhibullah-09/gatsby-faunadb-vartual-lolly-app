const path = require(`path`);

exports.createPages = async ({ actions, graphql }) => {
    const { data } = await graphql(`
    query MyQuery {
      LOLLIES {
        getLollies {
          lollyPath
      }
    }
}`)

console.log(data);
data.LOLLIES.getLollies.forEach(({ lollyPath }) => {
    actions.createPage({
        path: `lollies/${lollyPath}`,
        component: path.resolve(`./src/templates/LollyTemplate.js`),
        context: {
            lollyPath: lollyPath,
        },
    })
})};