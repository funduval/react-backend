import React from 'react';
import './App.css';
import './Main.js';

//connect all this to SUBMIT button/page
const Average = ({ results, handleFormSubmit, showResults }) => (
    <div className="well" id="averageWell">
        {results.map(result => {
            const { nf_sugars } = result.fields;

            return (
                <div key="10" className="panel">
                    <h4>Your average daily sugar intake is: </h4>
                    <div
                        className="panel-body"
                        data-value={nf_sugars}
                        style={{ display: showResults ? 'block' : 'none' }}
                    >
                        <h5>{nf_sugars * 35 / 7} Sugar grams consumed per day </h5>
                        <h5>{Math.floor(nf_sugars * 35 / 7 - 25)} Grams more than the daily allowance </h5>
                        <h5>Total of {(nf_sugars * 35 / 7 - 25) * 365 * 4} pure sugar calories per year,</h5>
                        <h5>
                            Which, if that's above your daily caloric needs,{'\n'}
                            potentially amounts to {Math.floor((nf_sugars * 35 / 7 - 25) * 365 * 4 / 3500)} pounds per
                            year!
                        </h5>
                    </div>
                </div>
            );
        })}
    </div>
);

export default Average;
