// import produce from 'immer'
import { ActionType } from '../actions-types'
import { Action } from '../actions'

interface BundlesState {
	[key: string]:
		| {
				loading: boolean
				code: string
				err: string
		  }
		| undefined //or undef account for start of the system where it doesn't have reference for any code cell
}

const initialState: BundlesState = {}

const bundlesReducer = (
	state: BundlesState = initialState,
	action: Action
): BundlesState => {
	switch (action.type) {
		case ActionType.BUNDLE_START: {
			state[action.payload.cellId] = {
				loading: true,
				code: '',
				err: '',
			}
			return state
		}

		case ActionType.BUNDLE_COMPLETE: {
			state[action.payload.cellId] = {
				loading: false,
				code: action.payload.bundle.code,
				err: action.payload.bundle.err,
			}
			return state
		}

		default:
			return state
	}
}

export default bundlesReducer
