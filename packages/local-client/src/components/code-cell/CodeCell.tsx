import { useEffect } from 'react'
import CodeEditor from '../code-editor/CodeEditor'
import Preview from '../preview/Preview'
import Resizable from '../resizable/Resizable'
import { Cell } from '../../redux'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useCumulativeCode } from '../../hooks/useCumulativeCode'
import './code-cell.css'

interface CodeCellProps {
	cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const { updateCell, createBundle } = useActions()
	const bundle = useTypedSelector((state) => state.bundles[cell.id])
	const cumulativeCode = useCumulativeCode(cell.id)

	//console.log(cumulativeCode)

	useEffect(() => {
		// create a bundle instantly component mount then early return
		if (!bundle) {
			createBundle(cell.id, cumulativeCode)
			return
		}

		// debouncing logic
		const timer = setTimeout(async () => {
			createBundle(cell.id, cumulativeCode)
		}, 1000)

		// this will be executed when the input changes which resets the timeout
		return () => {
			clearTimeout(timer)
		}

		//  eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cumulativeCode, cell.id, createBundle])

	return (
		<Resizable direction='vertical'>
			<div
				style={{
					height: 'calc(100% - 10px)',
					display: 'flex',
					flexDirection: 'row',
				}}
			>
				<Resizable direction='horizontal'>
					<CodeEditor
						onChange={(value) => updateCell(cell.id, value)}
						initialValue={cell.content}
					/>
				</Resizable>
				<div className='progress-wrapper'>
					{!bundle || bundle.loading ? (
						<div className='progress-cover'>
							<progress className='progress is-small is-primary' max='100'>
								Loading
							</progress>
						</div>
					) : (
						<Preview code={bundle.code} err={bundle.err} />
					)}
				</div>
			</div>
		</Resizable>
	)
}

export default CodeCell
