import { SpotifyTokenResult } from '@/api/spotify-token'

/**
 * Fetch a Spotify auth token.
 */
export async function getAuthToken(): Promise<string> {

	const response = await fetch('/api/spotify-token')

	if (!response.ok) throw new Error(`Couldn't retrieve a Spotify auth token.`)

	const result = await response.json() as SpotifyTokenResult

	console.log(`Spotify API token: ${result.token}`)
	return result.token
}
