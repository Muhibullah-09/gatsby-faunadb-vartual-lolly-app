module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Lolly",
        fieldName: "lolly",
        url: 'https://virtual-lolly-harg.netlify.app/.netlify/functions/lolly',
      },
    },
  ],
}
