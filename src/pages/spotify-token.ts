import { NextApiRequest, NextApiResponse } from 'next'

export interface SpotifyTokenResult {
	token: string
}


export default async function handler(req: NextApiRequest, res: NextApiResponse<SpotifyTokenResult | Interlude.ApiError>) {

	if (req.method !== 'GET') {
		res.status(400).json({ message: `Only http GET is supported on this endpoint.` })
	}

	const spotifyClientId = 'cc0b602c9081493fb818123ff8183dfa'
	const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET

	const authForm = new URLSearchParams()
	authForm.append('grant_type', 'client_credentials')

	const response = await fetch('https://accounts.spotify.com/api/token', {
		body: authForm,
		headers: {
			'Authorization': 'Basic ' + Buffer.from(spotifyClientId + ':' + spotifyClientSecret).toString('base64'),
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		method: 'POST',
	})

	if (!response.ok) {
		res.status(500).json({ message: `Server error fetching Spotify auth token.` })
	}

	const auth = await response.json()

	res.status(200).json({
		token: auth['access_token'],
	})
}
