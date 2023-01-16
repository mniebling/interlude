export {}

declare global {
	interface WindowEventMap {
		'interlude:addToCatalogue': Interlude.Events.AddToCatalogue
	}
}
