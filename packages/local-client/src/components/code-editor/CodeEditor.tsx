import { useRef } from 'react'
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'
import codeShift from 'jscodeshift'
import Highlighter from 'monaco-jsx-highlighter'
import './syntax.css'
import './code-editor.css'

interface CodeEditorProps {
	initialValue: string
	onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
	const editorRef = useRef<any>()
	// 1st argument is to get the value, 2nd is the editor itself // this handler should be passed in editorDidmount
	const editorDidMountHandler: EditorDidMount = (getValue, monacoEditor) => {
		// get reference for monacoEditor
		editorRef.current = monacoEditor

		monacoEditor.onDidChangeModelContent(() => {
			// changing the input piece of state in the app component
			onChange(getValue())
		})
		monacoEditor.getModel()?.updateOptions({ tabSize: 2 })

		// JSX highlighting
		const highlighter = new Highlighter(
			//@ts-ignore
			window.monaco,
			codeShift,
			monacoEditor
		)

		highlighter.highLightOnDidChangeModelContent(
			() => {},
			() => {},
			undefined,
			() => {}
		)
	}

	const formatHandler = () => {
		// get value from editor
		const unformatted = editorRef.current.getModel().getValue()

		// format that value using prettier
		const formatted = prettier
			.format(unformatted, {
				parser: 'babel',
				plugins: [parser],
				semi: false,
				useTabs: false,
				singleQuote: true,
			})
			.replace(/\n$/, '') // replace new line with empty string

		// set formatted value back to the editor
		editorRef.current.setValue(formatted)
	}
	return (
		<div className='editor-wrapper'>
			<button
				style={{}}
				className='button button-format is-primary is-small'
				onClick={formatHandler}
			>
				Format
			</button>
			<MonacoEditor
				editorDidMount={editorDidMountHandler}
				value={initialValue}
				options={{
					wordWrap: 'on',
					minimap: { enabled: false },
					showUnused: false,
					folding: false,
					lineNumbersMinChars: 3,
					fontSize: 16,
					scrollBeyondLastLine: false,
					automaticLayout: true,
				}}
				theme='dark'
				language='javascript'
				height='100%'
			/>
		</div>
	)
}

export default CodeEditor
