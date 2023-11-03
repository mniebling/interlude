import type { Config } from '@netlify/functions'

// TODO: how can generic response be typed?
export interface SpotifyTokenResult {
	token: string
}


/**
 * Fetch a Spotify auth token that can be used to authorize further API requests.
 */
export default async (request: Request) => {

	if (request.method !== 'GET') {
		return new Response(
			JSON.stringify({ message: `Only http GET is supported on this endpoint.` }),
			{ status: 400 },
		)
	}

	const spotifyClientId = 'cc0b602c9081493fb818123ff8183dfa'
	const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET

	const authForm = new URLSearchParams()
	authForm.append('grant_type', 'client_credentials')

	const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
		body: authForm,
		headers: {
			'Authorization': 'Basic ' + Buffer.from(spotifyClientId + ':' + spotifyClientSecret).toString('base64'),
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		method: 'POST',
	})

	if (!tokenResponse.ok) {
		return new Response(
			JSON.stringify({ message: `Server error fetching Spotify auth token.` }),
			{ status: 500 },
		)
	}

	const auth = await tokenResponse.json()

	return new Response(
		JSON.stringify({ token: auth['access_token'] })
	)
}


export const config: Config = {
	path: '/api/spotify-token',
}
