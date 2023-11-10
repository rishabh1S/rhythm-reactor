import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { PropsWithChildren } from "react";

const client = new ApolloClient({
  uri: "https://harar.stepzen.net/api/iced-elk/__graphql",
  headers: {
    Authorization:
      "apikey harar::stepzen.net+1000::f0d347764f10f670fc5061e6451123a6e36ea2e943e1295ffc20c26aa7dced41",
  },
  cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
