import React, { Component } from 'react';
import './App.css';
import './Main.js';

//connect all this to SUBMIT button/page
class Chart extends Component {
	render() {
		return (
			<div className="well">
				<img src="http://chart.apis.google.com/chart?chs=400x300&amp;cht=bvg&amp;chtt=Live Preview&amp;chd=s:OUSYft,cU9UYf&amp;chco=ff69b4,98fb98&amp;chdl=sgr|prt&amp;chxl=0:|jan|feb|mar|apr|may|jun|&amp;chxt=x" />;
			</div>
		);
	}
}

export default Chart;
