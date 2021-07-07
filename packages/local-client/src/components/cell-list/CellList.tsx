import React, { useEffect, Fragment } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import CellListItem from './CellListItem'
import AddCell from '../add-cell/AddCell'
import { useActions } from '../../hooks/useActions'
import './cell-list.css'

const CellList: React.FC = () => {
	const cells = useTypedSelector(({ cells }) =>
		cells?.order.map((id) => cells.data[id])
	)

	const { fetchCells, saveCells } = useActions()

	useEffect(() => {
		fetchCells()
	}, [])

	const renderedCells = cells?.map((cell) => (
		<React.Fragment key={cell.id}>
			<CellListItem cell={cell} />
			<AddCell previousCellId={cell.id} />
		</React.Fragment>
	))

	return (
		<div className='cell-list'>
			{/* shows AddCell in the last part with id of null bc there's no cell next to it */}
			<AddCell forceVisible={cells.length === 0} previousCellId={null} />
			{renderedCells}
		</div>
	)
}

export default CellList
