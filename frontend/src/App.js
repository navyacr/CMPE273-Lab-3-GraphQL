import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Main from './components/Main';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
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
// Export the App component so that it can be used in index.js
export default App;
