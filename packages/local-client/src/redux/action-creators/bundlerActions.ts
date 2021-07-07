import { Dispatch } from 'redux'
import { Action } from '../actions'
import bundler from '../../bundler'
import { ActionType } from '../actions-types'

export const createBundle = (cellId: string, input: string) => {
	return async (dispatch: Dispatch<Action>) => {
		dispatch({
			type: ActionType.BUNDLE_START,
			payload: {
				cellId: cellId,
			},
		})

		const result = await bundler(input)

		dispatch({
			type: ActionType.BUNDLE_COMPLETE,
			payload: {
				cellId: cellId,
				bundle: {
					code: result.code,
					err: result.err,
				},
			},
		})
	}
}
