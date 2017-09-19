import React from 'react';
import './App.css';
import './Main.js';
import Button from './Button.js';
import API from './API.js';
//connect all this to SUBMIT button/page

//I think I have to break out the handleLog function and do it on this page
//child element needs to pass states an create an object to send to mongo

const Results = ({ results, handleFormSubmit, showResults, handleLog }) => (
  <ul className="list-group search-results" style={{ borderStyle: showResults ? 'solid' : 'none' }}>
    {results.map(result => {
      const { item_name, brand_name, nf_sugars } = result.fields;

      handleLog = event => {
        event.preventDefault();
        API.postSaved(item_name, brand_name, nf_sugars);
        alert('logged item ' + item_name + ' ' + brand_name + ' ' + nf_sugars + ' grams');
      };

      return (
        <li key={result._id} className="list-group-item" style={{ display: showResults ? 'block' : 'none' }}>
          <h5 className="contains">{item_name}</h5>

          <Button
            className="btn btn-primary"
            id="log"
            handleLog={handleLog}
            item={item_name}
            brand={brand_name}
            sugar={nf_sugars}
          />

          <h5>{brand_name}</h5>
          <h5>{nf_sugars}g sugar</h5>
        </li>
      );
    })}
  </ul>
);

export default Results;
