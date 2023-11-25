export function Footer() {

	return (
		<div style={{ borderTop: '1px solid var(--color-subtle)', color: '#999', padding: 10 }}>
			<div>Currently supporting only Spotify, only albums, and writing data to local storage.</div>
			<div>To start over, type <code>localStorage.clear()</code> in the console and then refresh.</div>
		</div>
	)
}
