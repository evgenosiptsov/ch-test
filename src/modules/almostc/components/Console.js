import React from 'react';
import classnames from 'classnames'
import '../css/Example.css';
import PropTypes from 'prop-types';

const Console = ({ text, error}) => (
	<div
		className={classnames("almostc_console", error && "almostc_editor--error")}
	>
		{ error && "Error:"}
		{text || error}
	</div>
)

Console.propTypes = {
	text: PropTypes.string,
	error: PropTypes.string,
}

Console.defaultProps = {
	error: false,
}

export default Console;