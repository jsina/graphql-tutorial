import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider
} from 'react-apollo';
import {
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { typeDefs } from './schema';

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });
const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });

const ChannelList = ({ data: { loading, error, channels } }) => {
  if (loading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  return (
    <ul className="Item-list">
      {channels.map(ch => <li key={ch.id}>{ch.name}</li>)}
    </ul>
  )

}

const client = new ApolloClient({
  networkInterface: mockNetworkInterface,
});

const channelListQuery = gql`
  query channelListQury {
    channels {
      id
      name
    }
  }
`;


const channelListWithData = graphql(channelListQuery)(ChannelList);


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Apollo</h2>
          </div>
          <channelListWithData />
        </div>
      </ApolloProvider>
    );
  }
}


export default App;
