export {}

declare global {
	interface WindowEventMap {
		'interlude:addToCatalog': Interlude.Events.AddToCatalog
	}
}
