import React from "react";
import { ApolloProvider } from "@apollo/client";
import Layout from "../components/Layout";
import { client } from "./client";

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <Layout>{element}</Layout>
  </ApolloProvider>
);
