import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shouldPureComponentUpdate from '../helpers/shouldPureComponentUpdate'

const styles = {
  height: '30vh',
  width: '10vw',
  border: '1px solid gray',
  borderRadius: '4%',
	padding: '0.5rem 1rem',
	cursor: 'move',
}

export default class Box extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		yellow: PropTypes.bool,
	}

	shouldComponentUpdate = shouldPureComponentUpdate

	render() {
		const { title, yellow } = this.props
		const backgroundColor = yellow ? 'yellow' : 'white'

		return <div style={{ ...styles, backgroundColor }}>{title}</div>
	}
}
