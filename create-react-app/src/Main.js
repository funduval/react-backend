import React, { Component } from 'react';
import './App.css';
import Form from './Form.js';
import Results from './Results.js';
import Saved from './Saved.js';
import Average from './Average.js';
import Chart from './Chart.js';
import Graph from './Graph.js';
import API from './API.js';
import { Modal } from 'react-bootstrap';

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
    // test query string  ==== https://api.nutritionix.com/v1_1/search/apple?results=0:20&fields=item_name,brand_name,nf_sugars&appId=5234f7f1&appKey=40a5d6ab8411eb1e9d9f23f601944842

    const currQuery = this.state.item + '?results=0:20&fields=item_name,brand_name,nf_sugars&appId=';

    API.search(currQuery)
      .then(res => {
        this.setState({ results: res.data.hits });
      })
      .catch(err => console.log(err));
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
      this.setState({
        food: [],
        sugar: [],
        item: '',
        brand: [],
        weekly: [],
        results: [],
        log: false,
        showResults: false
      });
    } else {
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
      this.searchFood('sugar');
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

  render() {
    return (
      <div className="container">
        <Modal />
        <div className="row">
          <div className="col-md-4" id="form">
            <Form
              value={this.state.value}
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmit}
              item={this.state.item}
            />
          </div>

          <div className="col-md-4" id="average">
            <Average
              results={this.state.results}
              showResults={this.state.showResults}
              handleFormSubmit={this.handleFormSubmit}
            />
          </div>
          <div className="col-md-4" id="charts">
            <Chart results={this.state.results} showResults={this.state.showResults} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4" id="resultWell">
            <div
              className="panel"
              id="results"
              style={{
                marginTop: this.state.showResults ? '-65px' : '-10px',
                borderColor: this.state.showResults ? 'lightgrey' : 'transparent'
              }}
            >
              <div className="panel-body">
                <Results
                  results={this.state.results}
                  showResults={this.state.showResults}
                  handleFormSubmit={this.handleFormSubmit}
                  handleLog={this.handleLog}
                />
              </div>
            </div>
          </div>
          <div
            className="col-md-4"
            id="graphWell"
            style={{
              marginTop: this.state.showResults ? '4px' : '-80px'
            }}
          >
            <Graph
              results={this.state.results}
              showResults={this.state.showResults}
              handleFormSubmit={this.handleFormSubmit}
            />
          </div>
          <div
            className="col-md-4"
            id="savedWell"
            style={{
              marginTop: this.state.showResults ? '-70px' : '-10px'
            }}
          >
            <Saved
              value={this.state.value}
              handleInputChange={this.handleInputChange}
              postResponse={this.postResponse}
            />
          </div>
        </div>
      </div>
    );
  }
}

export { Main as default };
