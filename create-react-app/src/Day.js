import React from 'react';
import './App.css';
import './Main.js';
//connect all this to SUBMIT button/page
const Day = props => (
  <div id="resultWell">
    <ul>
      <li>
        <div className="well">
          <div className="panel-body" data-value={props.sugar}>
            <h5 id="dayTotal">
              {this.sugar} + {props.sugar}
            </h5>

            <button className="btn btn-primary form-control" id="log" onClick={props.handleFormSubmit}>
              log
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
);

export default Day;
