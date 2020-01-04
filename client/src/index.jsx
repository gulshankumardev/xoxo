import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import './styles/main.scss';
import client from './apollo';
import resetUserInfo from './utils';

const userInfo = resetUserInfo();
client.writeData({
  data: userInfo,
});

const mountNode = document.getElementById('app');
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  mountNode,
);
