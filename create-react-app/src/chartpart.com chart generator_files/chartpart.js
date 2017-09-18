// All code (c) 2008 Bernie Thompson unless otherwise noted
// Feel free to use this code, as long as a credit linkback to 
// http://chartpart.com/ is visible on the page

var chartpart = function () {

	var simpleEncoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	
	// private attributes and methods
	
	// simpleEncode modified from Google Chart API example code
	function simpleEncode(values,maxValue) {
		var chartData = [];
		for (var i = 0; i < values.length; i++) {
			var currentValue = values[i];
			if (!isNaN(currentValue) && currentValue >= 0) {
				chartData.push(simpleEncoding.charAt(Math.round((simpleEncoding.length-1) * currentValue / maxValue)));
			} else {
				chartData.push('_');
			}
		}
		return chartData.join('');
	}
	
	// returns 2-dimentional array of axis labels
	function parseAxisLabels(elems) {
		return elems.map(function (e) {
			var axis = $A(e.getValue().split(',')).map(function (x) {
				var l = x.strip();
				if (l.length > 0) {
					return l;
				}
			}).compact();
			
			if (axis.length > 0) {
				return axis;
			}
		}).compact();
	}
	
	// returns 1-dimentional array of axis types
	function parseAxisTypes(elems) {
		return elems.map(function (e) {
			var t = e.getValue();
			if (t.length > 0) {
				return t;
			}
		}).compact();		
	}
	
	function parseData(dataArray) {
		var result = {categories:new Array,colors:new Array,legends:new Array,series:new Array};
		var header=true;
		dataArray.each(function(series_txt) {
			var data = $A(series_txt.split(",").compact().without(''));
			if (data.length == 0){
				return;
			}
			if (header) {
				var headings = data.map(function(item) {
					var x = parseInt(item);
					if (isNaN(x)) {
						return true;
					}
					return false;
				});
				if ((headings.without(true).size() == 0) //if no integers
					|| (headings.without(false).size() > 2)) { // or > 2 non-integers
					// consider this first row to be a header
					result.categories = data.map(function (x) {
						return x.strip();
					}).compact();
					header = false;
					return;
				}
				header = false;
			}
			var legend = "";
			var color = "";
			var series = data.map(function(series_item) {
				var x = parseInt(series_item);
				if (!isNaN(x)) {
					return x;
				} else if ((series_item.charAt(0) == '#') && (color.length == 0)) {
					color = series_item.slice(1,7);
					return;
				} else if (legend.length == 0) {
					legend = series_item;
					return;
				}
			});
			result.colors.push(color);
			result.legends.push(legend);
			result.series.push(series.compact());
		});
		return result;
	}
	
	function setOptArray(outHash, inArray, key, separator) {
		var x = inArray.compact().without('');
		if (x.length > 0) {
			outHash.set(key, x.join(separator));
		}
	}
	
	function encodeAxes(labels, types) {
		var i = 0;
		var chxl = [];
		var chxt = [];
		var result = {};
		labels.each(function (l) {
			if (types[i] && types[i].length > 0) {
				chxl.push(i + ':|' + l.join("|") + '|');
				chxt.push(types[i]);
			}
			i = i + 1;
		});
	
		result['chxl'] = chxl.join("");
		result['chxt'] = chxt.join(",");
		
		return result;
	}
	
	function formChanged() {
		var params = new Hash;
		
		var parsedData = parseData($A($('data-set').getValue().split('\n')));
		var axis_labels = parseAxisLabels($('chart-form').getInputs(null, 'axis-label'));
		var axis_types = parseAxisTypes($$('.axis-type'));
		
		params.set('chs', $('chs').getValue());
		var dim = params.get('chs').split('x');
		if (dim[0]*dim[1] > 300000) {
			alert('Google size limit is 300,000 pixels');
		}
		params.set('cht', $('cht').getValue());
		params.set('chtt', $('chtt').getValue());
		var max = parsedData.series.map(function(series) {
			return series.max();
		}).max();
		var data = parsedData.series.map(function(series) {
			return simpleEncode(series, max);
		}).join(',');
		params.set('chd', 's:' + data);
		
		setOptArray(params, parsedData['colors'], 'chco', ',');
		setOptArray(params, parsedData['legends'], 'chdl', '|');
		
		if (parsedData['categories'].length > 0) {
			
			switch (params.get('cht')) {
				case 'bhs':
				case 'bhg':
					axis_types.unshift('y');
					axis_labels.unshift(parsedData['categories'].reverse())
					break;
				default:
					axis_types.unshift('x');
					axis_labels.unshift(parsedData['categories']);	
			}
		}
		
		var axes = encodeAxes(axis_labels, axis_types);
		params.set('chxl', axes['chxl']);
		params.set('chxt', axes['chxt']);
		
		var url = 'http://chart.apis.google.com/chart?' + 
			params.toQueryString();
		var img = ['<img src=\"', url, '\"/>'].join("");
		var linked_img = ['<a href=\"', url, '\">', img,'</a>'].join("");
		$('textarea-html').value = unescape(img).replace(/\&/g, '&amp;');
		$('textarea-url').value = unescape(url);

		var preview_width = parseInt(dim[0]) + 30;
		preview_width = preview_width + "px";
		$('preview').setStyle({
		  width: preview_width
		});
		$('live-preview-png').update(linked_img);
	}
	
	function formSubmit(event) {
		event.stop();
		formChanged();
	}
	
	function clickUrl(event) {
		event.stop();
		$('textarea-url').focus();
		$('textarea-url').select();
	}
	
	function clickHtml(event) {
		event.stop();
		$('textarea-html').focus();
		$('textarea-html').select();
	}
	// public functions
	return {
		onLoad: function() {
			formChanged();
			$('live-preview-url').observe('click', clickUrl);
			$('live-preview-html').observe('click', clickHtml);
			new Form.EventObserver('chart-form', formChanged);
			$('chart-form').observe('submit', formSubmit);
		}
	};
}();

window.onload = chartpart.onLoad;