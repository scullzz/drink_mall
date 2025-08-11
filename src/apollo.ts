import {
    ApolloClient,
    InMemoryCache,
    createHttpLink
  } from "@apollo/client";
  import { setContext } from "@apollo/client/link/context";
  
  const httpLink = createHttpLink({
    uri: "http://5.35.127.196/graphql/client",
  });
  
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        auth: "98T7hcAUQE",
      },
    };
  });
  
  export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  

//   const authLink = setContext((_, { headers }) => {
//     const initData = window.Telegram?.WebApp?.initData ?? "";
//     return {
//       headers: {
//         ...headers,
//         auth: initData,
//       },
//     };
//   });