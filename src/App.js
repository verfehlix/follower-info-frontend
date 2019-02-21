import React, { Component } from 'react'
import './App.css'

import Header from './Header/Header';
import Graph from './Graph/Graph';
import DiffView from './DiffView/DiffView';
import FollowerList from './FollowerList/FollowerList';

import axios from 'axios';

const axiosGraphQL = axios.create({
  baseURL: 'http://192.168.2.112:8080/graphql',
});

const GET_FOLLOWER_INFO = `
  {
    followerInfo(
      startTimestamp: "2019-01-01 00:00:00",
      endTimestamp: "2019-02-21 23:59:59"
    ) {
      timestamp
      followerCount
      followerList
    }
  }
`;

class App extends Component {

  state = {}

  componentDidMount() {
    this.fetchFollowerInfo();
  }

  render() {

    return (
      <div className="App">
        <div className="ComponentContainer">
          <Header />

          <Graph data={this.state.followerInfo} />

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
          followerInfo: result.data.data.followerInfo.reverse(),
          errors: result.data.data.errors
        }))
      ).catch(err => {
        console.error(err)
      })
  };
}

export default App
