import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { PropsWithChildren } from "react";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

const client = new ApolloClient({
  uri: apiUrl,
  headers: {
    Authorization: `apikey ${apiKey}`,
  },
  cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
