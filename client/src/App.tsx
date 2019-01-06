import * as React from 'react';
import Navigation from './ui/shared/Navigation';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient, InMemoryCache } from 'apollo-boost';

// Create an http link:
const httpLink = new HttpLink({
  uri: 'http://localhost:4000'
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const kind = getMainDefinition(query).kind;
    const operation = (getMainDefinition(query) as any).operation;
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({addTypename: false})
});

export default class App extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <Navigation />
        </ApolloProvider>
    );
  }
}