export {}

declare global {
	interface WindowEventMap {
		'Interlude:UpdateCatalog': CustomEvent<Interlude.CatalogEntry>
		'Interlude:RemoveFromCatalog': CustomEvent<string>
	}
}
