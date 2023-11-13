import { describe, expect, it } from 'vitest'
import { updateCatalog } from './catalog'


describe('updateCatalog', () => {

	it('should add an entry to a blank catalog', () => {

		const catalog: Interlude.Catalog = new Map()
		const entry = mockCatalogEntry()

		const result = updateCatalog(catalog, entry)

		expect(result).toHaveLength(1)
		expect(result.get(entry.data.id)?.type).toBe('album')
		expect(result.get(entry.data.id)?.data.id).toBe('1')
	})

	it('should add a new entry to an existing catalog', () => {

		const catalog: Interlude.Catalog = new Map([
			['1', mockCatalogEntry()],
		])

		const newEntry = mockCatalogEntry()
		newEntry.data.id = '2'

		const result = updateCatalog(catalog, newEntry)

		expect(result).toHaveLength(2)
		expect(result.get('2')?.data.id).toBe('2')
		expect(result.get('2')?.type).toBe('album')
	})

	it('should update an existing entry in a catalog', () => {

		const catalog: Interlude.Catalog = new Map([
			['1', mockCatalogEntry()],
		])

		const newEntry = mockCatalogEntry()
		newEntry.data.artists[0].name = 'Wayfarer'
		newEntry.data.name = 'American Gothic'

		const result = updateCatalog(catalog, newEntry)

		expect(result).toHaveLength(1)
		expect(result.get('1')?.data.id).toBe('1')
		expect(result.get('1')?.data.artists[0].name).toBe('Wayfarer')
		expect(result.get('1')?.data.name).toBe('American Gothic')
	})
})

// TODO: accept overrides and deep merge them; move this method somewhere else
function mockCatalogEntry(): Interlude.CatalogEntry {

	return {
		addedOn: new Date().toISOString(),
		data: {
			artists: [{
				href: 'href',
				id: 'artist_id',
				name: 'Aesop Rock',
				type: 'artist',
				uri: 'uri',
			}],
			id: '1',
			name: 'Integrated Tech Solutions',
			uri: 'uri',
			images: [],
			release_date: new Date(2023, 11, 10).toISOString(),
		},
		notes: '',
		source: 'spotify',
		tags: [],
		type: 'album',
	}
}
