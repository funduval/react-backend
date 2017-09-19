import React from 'react';

const Button = props => (
	<button onClick={props.handleLog} id="logger">
		log
	</button>
);

export default Button;
