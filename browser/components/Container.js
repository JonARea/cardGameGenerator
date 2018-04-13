import React, { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import { DropTarget } from 'react-dnd'
import shouldPureComponentUpdate from '../helpers/shouldPureComponentUpdate'
import ItemTypes from '../helpers/ItemTypes'
import DraggableBox from './DraggableBox'
import snapToGrid from '../helpers/snapToGrid'

const styles = {
	width: '80vw',
	height: '80vh',
	border: '1px solid black',
	position: 'relative',
	backgroundColor: 'green',
	margin: 'auto'
}

const collect = connect => ({
	connectDropTarget: connect.dropTarget()
})

const boxTarget = {
	drop(props, monitor, component) {
		const delta = monitor.getDifferenceFromInitialOffset()
		const item = monitor.getItem()

		let left = Math.round(item.left + delta.x)
		let top = Math.round(item.top + delta.y)
		if (props.snapToGrid) {
			;[left, top] = snapToGrid(left, top)
		}

		component.moveBox(item.id, left, top)
	},
}

class Container extends Component {
	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		snapToGrid: PropTypes.bool.isRequired,
	}

	shouldComponentUpdate = shouldPureComponentUpdate

	constructor(props) {
		super(props)
		this.state = {
			boxes: {
				a: { top: 300, left: 80, title: 'Ace of Hearts' },
				b: { top: 300, left: 20, title: 'King of Spades' },
				c: { top: 300, left: 140, title: 'Jack of Diamonds' },
			},
		}
	}

	moveBox(id, left, top) {
		this.setState(
			update(this.state, {
				boxes: {
					[id]: {
						$merge: { left, top },
					},
				},
			}),
		)
	}

	renderBox(item, key) {
		return <DraggableBox key={key} id={key} {...item} />
	}

	render() {
		const { connectDropTarget } = this.props
		const { boxes } = this.state

		return connectDropTarget(
			<div style={styles}>
				{Object.keys(boxes).map(key => this.renderBox(boxes[key], key))}
			</div>,
		)
	}
}

export default DropTarget(ItemTypes.BOX, boxTarget, collect)(Container)
