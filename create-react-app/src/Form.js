import React from 'react';

const Form = props => (
  <div className="form-group">
    <h3>Enter A Search:</h3>

    <label htmlFor="search">Search:</label>
    <form className="form">
      <input onChange={props.handleInputChange} value={props.item} name="item" type="text" placeholder="Food Item" />
      <button onClick={props.handleFormSubmit} id="submitter">
        Submit
      </button>
    </form>
    <h3>Then select a brand name below:</h3>
  </div>
);

export default Form;
