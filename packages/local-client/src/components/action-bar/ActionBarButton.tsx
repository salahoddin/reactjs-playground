import React from 'react'

interface ActionBarButtonProps {
	id: string
	direction?: string
	iconClassName: string
	action(id: string, direction?: string): void
}
const ActionBarButton: React.FC<ActionBarButtonProps> = ({
	id,
	direction,
	iconClassName,
	action,
}) => {
	return (
		<button
			className='button is-primary is-small'
			onClick={() => action(id, direction || '')}
		>
			<span className='icon'>
				<i className={iconClassName}></i>
			</span>
		</button>
	)
}

export default ActionBarButton
