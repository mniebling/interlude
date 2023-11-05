export function Footer() {

	return (
		<div style={{ borderTop: '1px solid #eee', color: '#999', marginTop: 50, padding: 10 }}>
			<div>Currently supporting only Spotify, only albums, and writing data to local storage.</div>
			<div>You can't edit Catalog entries yet.</div>
			<div>To start over, type <code>localStorage.clear()</code> in the console and then refresh.</div>
		</div>
	)
}
