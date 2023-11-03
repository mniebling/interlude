import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'


export default defineConfig(({ command, mode }) => ({
	build: {
		outDir: '../../dist', // this is relative to root
	},
	plugins: [
		react(),
	],
	resolve: {
		alias: {
			'@': resolve('./src'),
		},
	},
	root: './src/app',
	server: {
		hmr: false,
	},
	test: {
		include: [
			'../**/*.test.ts',
		],
	},
}))
