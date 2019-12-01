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
  }
});

export default client;
