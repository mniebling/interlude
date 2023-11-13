import { createContext, useContext } from 'react'

/**
 * This context is used for data related to the Spotify API.
 * In the future, this could be a service-agnostic context providing auth/user data.
 */
export function useSpotifyContext(): SpotifyContextObject {

	const ctx = useContext(SpotifyContext)
	if (!ctx) throw new Error('Spotify data is undefined in the context.')

	return ctx
}

export const SpotifyContext = createContext<SpotifyContextObject | null>(null)

export interface SpotifyContextObject {
	authToken: string
}
