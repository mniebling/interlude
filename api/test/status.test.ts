import { describe, expect, it } from 'vitest'
import getStatus from '../status'


describe('/api/status', () => {

	it('should return 200 with an "ok" body', async () => {

		const response = await getStatus()
		expect(response).toHaveProperty('status', 200)

		const body = await response.json()
		expect(body).toHaveProperty('status', 'ok')
	})
})
