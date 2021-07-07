import * as esbuild from 'esbuild-wasm'

export const unpkgPathPlugin = () => {
	return {
		name: 'unpkg-path-plugin',
		setup(build: esbuild.PluginBuild) {
			// handle root entry point (index.js)
			build.onResolve({ filter: /(^index\.js$)/ }, () => {
				return { path: 'index.js', namespace: 'a' }
			})
			// handle relative path (./ or ../)
			build.onResolve({ filter: /^\.+\// }, async (args: any) => {
				return {
					namespace: 'a',
					path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')
						.href,
				}
			})

			// handle main file of the module
			build.onResolve({ filter: /.*/ }, async (args: any) => {
				return {
					namespace: 'a',
					//args.path is the package name
					path: `https://unpkg.com/${args.path}`,
				}
			})
		},
	}
}
