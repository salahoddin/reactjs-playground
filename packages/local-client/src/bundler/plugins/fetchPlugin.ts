import * as esbuild from 'esbuild-wasm'
import axios from 'axios'
import localforage from 'localforage'

const fileCache = localforage.createInstance({
	name: 'filechace',
})
export const fetchPlugin = (inputCode: string) => {
	return {
		name: 'fetch-plugin',
		setup(build: esbuild.PluginBuild) {
			//hijack the default onload
			// handle index.ts
			build.onLoad({ filter: /(^index\.js$)/ }, () => {
				return {
					loader: 'jsx',
					contents: inputCode,
				}
			})

			build.onLoad({ filter: /.*/ }, async (args: any) => {
				// Check to see if this file is already fetched
				// and if it's in the cache

				const cacheResult = await fileCache.getItem<esbuild.OnLoadResult>(
					args.path
				)

				// if it is the return in immediately
				if (cacheResult) {
					return cacheResult
				}
			})
			// handle .css files
			build.onLoad({ filter: /.css$/ }, async (args: any) => {
				const { data, request } = await axios.get(args.path)

				const escaped = data
					.replace(/\n/g, '') // remove new lines
					.replace(/"/g, '\\"') // escape double qoutes
					.replace(/'/g, "\\'") // escape single qoutes

				const contents = `
				const style = document.createElement('style')
				style.innerText = '${escaped}'
				document.head.appendChild(style)
				`

				const result: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents: contents,
					resolveDir: new URL('./', request.responseURL).pathname,
				}

				// store response in cache
				await fileCache.setItem(args.path, result)

				// return the result
				return result
			})

			// handle javascript files
			build.onLoad({ filter: /.*/ }, async (args: any) => {
				const { data, request } = await axios.get(args.path)

				const result: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents: data,
					resolveDir: new URL('./', request.responseURL).pathname,
				}

				// store response in cache
				await fileCache.setItem(args.path, result)

				// return the result
				return result
			})
		},
	}
}
