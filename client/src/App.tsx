import * as React from 'react';
import Navigation from './ui/shared/Navigation';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
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