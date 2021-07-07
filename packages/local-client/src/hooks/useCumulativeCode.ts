import { useTypedSelector } from './useTypedSelector'

export const useCumulativeCode = (cellId: string) => {
	return useTypedSelector((state) => {
		const { data, order } = state.cells

		// get data or cells for each id in the order array
		const orderedCells = order.map((id) => data[id])

		const showFunc = `
		import _React from 'react'
		import _ReactDOM from 'react-dom'

		var show = (value) => {

			const root = document.querySelector('#root')

			if(typeof value === 'object') {
				if(value.$$typeof && value.props) {
					_ReactDOM.render(value, root)
				} else {
					root.innerHTML = JSON.stringify(value)
				}
				
			} else {
				root.innerHTML = value
			}
			
		}
		`
		const showFuncNoOp = 'var show = () => {}'
		// get all codes from cell and put it in the cumulative array
		const cumulativeCode = []
		for (let c of orderedCells) {
			if (c.type === 'code') {
				// check if this is the cell to recieve the real version of the show function
				if (c.id === cellId) {
					cumulativeCode.push(showFunc)
				} else {
					cumulativeCode.push(showFuncNoOp)
				}

				cumulativeCode.push(c.content)
			}

			// end the loop when it reaches the current cell
			if (c.id === cellId) {
				break
			}
		}

		return cumulativeCode
	}).join('\n') // join by new line
}
