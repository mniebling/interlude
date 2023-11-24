import { describe, it, expect, vi, MockedFunction, afterEach } from 'vitest'
import getSpotifyToken from '../spotify-token'


describe('/api/spotify-token', () => {

	afterEach(() => {
		vi.unstubAllGlobals()
	})

	it('should return 400 for non-GET requests', async () => {

		const request = new Request('http://test', { method: 'POST' })
		const response = await getSpotifyToken(request)

		expect(response.status).toBe(400)
	})

	it('should return a Spotify auth token for a GET request', async () => {

		const request = new Request('http://test', { method: 'GET' })

		// Mock a successful call to the Spotify API
		vi.stubGlobal('fetch', () => ({
			ok: true,
			json: async () => ({ access_token: 'fake_access_token' }),
		}))

		const response = await getSpotifyToken(request)
		expect(response.status).toBe(200)

		const responseBody = await response.json()
		expect(responseBody.token).toBe('fake_access_token')
	})

	it('should return 500 if the Spotify API call fails', async () => {

		const request = new Request('http://test', { method: 'GET' })

		// Mock a failed call to the Spotify API
		vi.stubGlobal('fetch', () => ({
			ok: false,
			json: async () => ({ error: 'Some error' }),
		}))

		const response = await getSpotifyToken(request)
		expect(response.status).toBe(500)

		const responseBody = await response.json()
		expect(responseBody.error).toEqual({ error: 'Some error' })
	})
})
