import React from 'react';
import classnames from 'classnames'
import '../css/Example.css';
import PropTypes from 'prop-types';

const Editor = ({ code, error, onChange }) => (
	<div
		className={classnames("almostc_editor", error && "almostc_editor--selected")}
	>
		<textarea
			onChange={({target}) => onChange(target.value)}
		    style={{height: 200}}
		    value={code}
		>
		</textarea>
	</div>
)

Editor.propTypes = {
	onChange: PropTypes.func.isRequired,
	isError: PropTypes.bool,
}

Editor.defaultProps = {
	isError: false,
}

export default Editor;