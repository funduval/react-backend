import React, { Component } from 'react';
import logo from './sugar-evil.jpg';
import './App.css';
import Main from './Main.js';

class App extends Component {
  state = { users: [], showUsers: false };

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 id="titleBar">Sugr Trackr</h2>
        </div>
        <div className="App-intro">
          <panel id="userDiv" style={{ display: this.state.showUsers ? 'block' : 'none' }}>
            <h1>Users</h1>
            {this.state.users.map(user => <div key={user.id}>{user.username}</div>)}
          </panel>
          <Main />
        </div>
      </div>
    );
  }
}

export default App;
