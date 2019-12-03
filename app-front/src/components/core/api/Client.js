import ApolloClient from "apollo-boost";
import { BASE_URL, APP_AUTH_TOKEN } from "../constants";
import { signOut } from "../utils/Auth";

const client = new ApolloClient({
  uri: BASE_URL,
  request: operation => {
    const CORE_API_AUTH_TOKEN = localStorage.getItem(APP_AUTH_TOKEN);
    operation.setContext({
      headers: {
        "x-bearer-token": CORE_API_AUTH_TOKEN
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        if (["Sign in again.", "Not authenticated"].map((msg) => message.includes(msg)).find(x => x === true)) {
          signOut();
          window._history.push("/sign-in");
        } else {
          // eslint-disable-next-line no-console
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
        }
      });
    // eslint-disable-next-line no-console
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
});

export default client;
