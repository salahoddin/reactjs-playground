import { useRef, useEffect } from 'react'
import './preview.css'

interface PreviewProps {
	code: string
	err: string
}
const html = `
<html>
    <head>
		<style>html {background-color : white;}</style>
    </head>
    <body>
        <div id="root"></div>
        <script>
			const errorHandler = (err) => {
				const root = document.querySelector('#root');
				root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
				throw err
			}
			window.addEventListener('error' , (event) => {
				event.preventDefault()
				errorHandler(event.error)
			})
            window.addEventListener('message', (event) => {
                try {
                    eval(event.data)
                  } catch (err) {
                    errorHandler(err)
                  }
            }, false);
        </script>
    </body>
    </html>
`

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
	const iframe = useRef<any>()

	useEffect(() => {
		// reset html before bundle
		iframe.current.srcdoc = html
		setTimeout(() => {
			if (!iframe.current.contentWindow) {
				return
			}
			// emit code from parent to iframe/child
			iframe.current.contentWindow.postMessage(code, '*')
		}, 50)
	}, [code])

	return (
		<div className='preview-wrapper'>
			<iframe
				title='preview'
				ref={iframe}
				sandbox='allow-scripts'
				srcDoc={html}
			></iframe>
			{err && <div className='preview-error'>{err}</div>}
		</div>
	)
}

export default Preview
