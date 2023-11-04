import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'


export default defineConfig(({ command, mode }) => ({
	outDir: '../dist', // this is relative to root
	plugins: [
		react(),
	],
	resolve: {
		alias: {
			'@': resolve('./src'),
		},
	},
	root: './app',
	server: {
		hmr: false,
	},
	test: {
		cache: {
			dir: '../node_modules/.vitest', // https://github.com/vitest-dev/vitest/issues/3272
		},
		root: './', // in order to run api tests too
	},
}))
