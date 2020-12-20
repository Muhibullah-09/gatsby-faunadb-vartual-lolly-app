import React from "react";
import { ApolloProvider } from "@apollo/client";
import Layout from "./src/components/Layout";
import { client } from "./src/apollo/client";

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <Layout>{element}</Layout>
  </ApolloProvider>
);
