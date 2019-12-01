import ApolloClient from 'apollo-boost';
import { BASE_URL, APP_AUTH_TOKEN } from '../constants';

const client = new ApolloClient({
  uri: BASE_URL,
  request: (operation) => {
    const CORE_API_AUTH_TOKEN = localStorage.getItem(APP_AUTH_TOKEN);
    operation.setContext({
      headers: {
        "x-bearer-token": CORE_API_AUTH_TOKEN,
      }
    })
  },
  onError: (({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        if (message.includes('Sign in again.')) {
          window._history.push('/sign-in');
        } else {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        }
      });
    if (networkError) console.log(`[Network error]: ${networkError}`);
  })
});

export default client;
