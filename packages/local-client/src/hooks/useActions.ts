import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../redux'

export const useActions = () => {
	const dispatch = useDispatch()

	// to make sure that binding of action creator is only one time
	return useMemo(() => {
		return bindActionCreators(actionCreators, dispatch)
	}, [dispatch])
}
