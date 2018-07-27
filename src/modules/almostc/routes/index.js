import React from 'react'
import { Route } from 'react-router-dom'
import { Example } from '../containers/AlmostC'

export default (store) => {
	return (
		<Route exact path='/example' component={Example}/>
	)
}