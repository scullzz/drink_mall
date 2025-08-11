import {
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://api.drinkmall.ru/graphql/client",
});

const authLink = setContext((_, { headers }) => {
  const initData = window.Telegram?.WebApp?.initData ?? "";
  return {
    headers: {
      ...headers,
      auth: initData,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
