import React, { Component } from 'react';
import './App.css';
import Form from './Form.js';
import Results from './Results.js';
import Saved from './Saved.js';
import Average from './Average.js';
import API from './API.js';

class Main extends Component {
  state = {
    food: [],
    sugar: [],
    item: '',
    brand: [],
    weekly: [],
    results: [],
    log: false,
    savedFoods: '',
    showResults: false
  };

  componentDidMount() {
    this.searchFood();
  }

  searchFood = () => {
    // test query string  ==== https://api.nutritionix.com/v1_1/search/apple?results=0:20&fields=item_name,brand_name,nf_sugars&appId=5234f7f1&appKey=c6da7cb3302759d1e20f3793daa4b711

    const currQuery = this.state.item + '?results=0:20&fields=item_name,brand_name,nf_sugars&appId=';

    API.search(currQuery)
      .then(res => {
        this.setState({ results: res.data.hits });
      })
      .catch(err => console.log(err));
  };

  logFood = () => {
    //=======call post route to Mongo==========//
    API.log();
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value,
      showResults: false
    });
  };

  handleFormSubmit = event => {
    //Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    //validation checks inside the event istener
    if (this.state.item === '') {
      alert('No food item was entered');
      this.searchFood();
    } else {
      this.searchFood();
      alert(`Searching food item: ${this.state.item}`);
    }

    this.setState({
      food: [],
      sugar: [],
      item: '',
      brand: [],
      weekly: [],
      results: [],
      log: false,
      showResults: true
    });
  };

  handleLog = event => {
    event.preventDefault();

    this.logFood();

    this.setState({
      food: [],
      sugar: [],
      item: '',
      brand: [],
      weekly: [],
      results: [],
      log: true
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4" id="form">
            <Form
              value={this.state.value}
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmit}
              item={this.state.item}
            />
          </div>

          <div className="col-md-6" id="average">
            <Average results={this.state.results} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4" id="resultWell">
            <div className="panel" id="results">
              <div className="panel-body">
                <Results
                  results={this.state.results}
                  showResults={this.state.showResults}
                  handleFormSubmit={this.handleFormSubmit}
                />
              </div>
            </div>
          </div>

          <div className="col-md-6" id="resultWell">
            <Saved
              value={this.state.value}
              handleInputChange={this.handleInputChange}
              handleLog={this.handleLog}
              postResponse={this.postResponse}
            />
          </div>
        </div>
      </div>
    );
  }
}

export { Main as default };
