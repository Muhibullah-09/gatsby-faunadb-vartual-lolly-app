module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "muhib",
        fieldName: "muhib",
        url: 'https://muhiblollygift.netlify.app/.netlify/functions/vartual_lolly',
      },
    },
  ],
}
