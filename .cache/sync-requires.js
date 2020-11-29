const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/home/muhib/Muheeb/Hello/gatsby-faunadb-vartual-lolly-app/.cache/dev-404-page.js"))),
  "component---src-pages-create-new-js": hot(preferDefault(require("/home/muhib/Muheeb/Hello/gatsby-faunadb-vartual-lolly-app/src/pages/createNew.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/home/muhib/Muheeb/Hello/gatsby-faunadb-vartual-lolly-app/src/pages/index.js")))
}

