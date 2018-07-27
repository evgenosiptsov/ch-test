import React from 'react';

import logo from './../images/logo.svg';
import './../css/app.css';
import './../css/materialize.css'

import {Navbar, NavItem, Row, Col} from 'react-materialize'

const App = ({ children, store }) => (
	<div className="App">
		
		<Navbar brand='AmostC' right>
			
		</Navbar>
		
		<Row>
			<Col m={12}>
				AlmostC is a fictional programming language
			</Col>
		</Row>
		<Row>
			<Col m={12}>
				{children}
			</Col>
		</Row>
		
	</div>
)

export default App;
