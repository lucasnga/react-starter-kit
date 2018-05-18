import React, { Component } from 'react';

export default class App extends Component {
	render() {
		const style = {
			backgroundColor: 'red',
			color: 'white'
		}
		return (<h1 style={style}>It's working</h1>);
	}
}
