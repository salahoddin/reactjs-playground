import React from 'react'
import { useActions } from '../../hooks/useActions'
// import ActionBarButton from './ActionBarButton'
import './action-bar.css'

interface ActionBarProps {
	id: string
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
	const { moveCell, deleteCell } = useActions()
	return (
		<div className='action-bar'>
			<button
				className='button is-primary is-small'
				onClick={() => moveCell(id, 'up')}
			>
				<span className='icon'>
					<i className='fas fa-arrow-up'></i>
				</span>
			</button>
			<button
				className='button is-primary is-small'
				onClick={() => moveCell(id, 'down')}
			>
				<span className='icon'>
					<i className='fas fa-arrow-down'></i>
				</span>
			</button>
			<button
				className='button is-primary is-small'
				onClick={() => deleteCell(id)}
			>
				<span className='icon'>
					<i className='fas fa-times'></i>
				</span>
			</button>

			{/* <ActionBarButton
				id={id}
				direction='up'
				iconClassName='fas fa-arrow-up'
				action={moveCell}
			/>
			<ActionBarButton
				id={id}
				direction='down'
				iconClassName='fas fa-arrow-down'
				action={moveCell}
			/>
			<ActionBarButton
				id={id}
				iconClassName='fas fa-times'
				action={deleteCell}
			/> */}
		</div>
	)
}

export default ActionBar
