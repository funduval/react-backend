import React from 'react';
import './App.css';
import './Main.js';

//connect all this to SUBMIT button/page
const Graph = ({ results, handleFormSubmit, showResults }) => ({
	render() {
		return (
			<div id="pieChart">
				<img
					src="http://chart.apis.google.com/chart?chs=240x240&amp;cht=p&amp;chtt=Live Preview&amp;chd=s:TcZhq9,Rckvqy&amp;chco=ffb347,dda0dd&amp;chdl=sgr|prt&amp;chxl=0:|mon|tues|wed|thurs|fri|sat|sun|&amp;chxt=x"
					alt="pie chart"
				/>
			</div>
		);
	}
});

export default Graph;
