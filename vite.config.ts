import react from '@vitejs/plugin-react'
import { basename, resolve } from 'path'
import { defineConfig } from 'vite'


export default defineConfig(({ command, mode }) => ({
	build: {
		outDir: '../dist', // this is relative to root
	},
	css: {
		modules: {
			generateScopedName(name, filename) {
				const file = basename(filename, '.css')
					.replace('.module', '') // in dev this matches the local filename
					.replace('.css?used', '') // in prod, the filenames are different
				return `${file}-${name}`
			},
		},
	},
	plugins: [
		react(),
	],
	resolve: {
		alias: {
			'@': resolve('./'),
		},
	},
	root: './app',
	test: {
		cache: {
			dir: '../node_modules/.vitest', // https://github.com/vitest-dev/vitest/issues/3272
		},
		include: [
			'../**/*.test.ts', // we want to run tests in /api which is not in the root
		],
	},
}))
