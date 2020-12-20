// const path = require("path");
// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions;

//   const result = await graphql(`
//     query MyQuery {
//       LOLLIES {
//         getLollies {
//           id
//           colorTop
//           colorMiddle
//           colorBottom
//           recipient
//           message
//           sender
//           lollyPath
//         }
//       }
//     }
//   `);

//   console.log(result);
//   result.data.LOLLIES.getLollies.map((data) => {
//     createPage({
//       path: `${data.lollyPath}`,
//       component: path.resolve("./src/Template/Template.tsx"),
//       context: {
//         data: data,
//       },
//     });
//   });
// };