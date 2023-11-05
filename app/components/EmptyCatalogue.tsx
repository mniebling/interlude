import { NewEntry } from '.'

export interface EmptyCatalogProps {
	token: string
}

export function EmptyCatalog(props: EmptyCatalogProps) {

	return (
		<div style={{ padding: 10 }}>
			<div>Interlude is an app to help organize and think about the music you listen to.</div>
			<div style={{ marginBottom: 20 }}>Right now, your Catalog is empty. Find an album, write some tags or notes and add it!</div>

			<NewEntry token={ props.token } />
		</div>
	)
}
