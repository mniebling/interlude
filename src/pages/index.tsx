import { useEffect, useState } from 'react'
import HomePage from '../pages/HomePage/HomePage'
import { SpotifyTokenResult } from './api/spotify-token'


export default function Index() {

	const [authToken, setAuthToken] = useState<string | null>(null)

	useEffect(() => {
		getToken().then(setAuthToken)
	}, [])

	async function getToken() {

		const response = await fetch('/api/spotify-token')

		if (!response.ok) {
			console.error(`Auth request failed`)
		}

		const result = await response.json() as SpotifyTokenResult
		return result.token
	}

	if (!authToken) return null

	return (
		<HomePage token={ authToken } />
	)
}
