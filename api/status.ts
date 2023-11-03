import type { Config } from '@netlify/functions'

/**
 * A very basic health check / status endpoint that always returns 200.
 */
export default async () => {

	return new Response(JSON.stringify({ status: 'ok' }))
}


export const config: Config = {
	path: '/api/status',
}
