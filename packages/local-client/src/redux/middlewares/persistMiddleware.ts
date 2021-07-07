import { Dispatch } from 'redux'
import { Action } from '../actions'
import { ActionType } from '../actions-types'
import { saveCells } from '../action-creators'
import { RootState } from '../reducers'

export const persistMiddleware = ({
	dispatch,
	getState,
}: {
	dispatch: Dispatch<Action>
	getState: () => RootState
}) => {
	let timer: any // timer for the deboucer

	return (next: (action: Action) => void) => {
		return (action: Action) => {
			next(action)

			if (
				[
					ActionType.MOVE_CELL,
					ActionType.UPDATE_CELL,
					ActionType.INSERT_CELL_AFTER,
					ActionType.DELETE_CELL,
				].includes(action.type) // return true if action.type matches 1 of the 4 from array
			) {
				// debounce to avoid saving too early

				if (timer) {
					clearTimeout(timer)
				}
				timer = setTimeout(() => {
					saveCells()(dispatch, getState)
				}, 1000)
			}
		}
	}
}
