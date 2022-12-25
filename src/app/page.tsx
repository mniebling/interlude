import HomePage from './HomePage'

// Eventually move this auth logic into a server component that can be re-used
// Set up api routes that proxy to Spotify's api so the client components don't care about this
const spotifyClientId = 'cc0b602c9081493fb818123ff8183dfa'
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET

export default async function Page() {

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
		console.error(`Auth request failed`)
	}

	const auth = await response.json()

	return (
		<HomePage token={ auth['access_token'] } />
	)
}
