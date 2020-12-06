import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Main from './components/Main';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import backendServer from './config';

const client = new ApolloClient({
  uri: `${backendServer}/graphql`,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}
export default App;
