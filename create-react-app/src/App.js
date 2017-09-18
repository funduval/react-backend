import React, { Component } from 'react';
import './App.css';
import Main from './Main.js';

class App extends Component {
  state = { users: [], showUsers: true };

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2 id="titleBar">Sugr Trackr</h2>
        </div>
        <div className="App-intro">
          <panel id="userDiv" style={{ display: this.state.showUsers ? 'block' : 'none' }}>
            <ul id="userList">
              <h3 id="userTag">Users:</h3>
              {this.state.users.map(user => (
                <li className="userItems" key={user.id}>
                  {'\n\n'}
                  {user.username}
                  {'\n\n'}
                </li>
              ))}
            </ul>
          </panel>
          <Main />
        </div>
      </div>
    );
  }
}

export default App;
