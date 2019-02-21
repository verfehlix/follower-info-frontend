import React, { Component } from 'react'
import './App.css'

import Header from './Header/Header';
import Graph from './Graph/Graph';
import DiffView from './DiffView/DiffView';
import FollowerList from './FollowerList/FollowerList';

import axios from 'axios';

const axiosGraphQL = axios.create({
  baseURL: 'http://localhost:8080/graphql',
});

const GET_FOLLOWER_INFO = `
  {
    followerInfo {
      timestamp
      followerCount
    }
  }
`;

class App extends Component {

  state = {}

  componentDidMount() {
    this.fetchFollowerInfo();
  }

  render() {

    const { followerInfo } = this.state;

    return (
      <div className="App">

        <div className="ComponentContainer">
          <Header />

          <Graph />

          <DiffView />

          <FollowerList />
        </div>

      </div>
    );
  }

  fetchFollowerInfo = () => {
    axiosGraphQL
      .get('', {
        params: {
          query: GET_FOLLOWER_INFO
        }
      })
      .then(result =>
        this.setState(() => ({
          followerInfo: result.data.followerInfo,
          errors: result.data.errors
        }))
      ).catch(err => {
        console.error(err)
      })
  };
}

export default App
