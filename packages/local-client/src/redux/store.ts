import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { persistMiddleware } from './middlewares/persistMiddleware'

const middleWares = [thunk, persistMiddleware]

export const store = createStore(
	reducers,
	{},
	composeWithDevTools(applyMiddleware(...middleWares))
)

// test
// let id = store.getState().cells.order[0]

// store.dispatch({
// 	type: ActionType.UPDATE_CELL,
// 	payload: {
// 		id: id,
// 		content: 'const abs = 0',
// 	},
// })
