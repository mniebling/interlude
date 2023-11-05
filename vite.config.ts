import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'


export default defineConfig(({ command, mode }) => ({
	build: {
		outDir: '../dist', // this is relative to root
	},
	plugins: [
		react(),
	],
	root: './app',
	server: {
		hmr: false,
	},
	test: {
		cache: {
			dir: '../node_modules/.vitest', // https://github.com/vitest-dev/vitest/issues/3272
		},
		include: [
			'../**/*.test.ts', // we want to run tests in /api which is not in the root
		],
	},
}))
