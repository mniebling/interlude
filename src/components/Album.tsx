export interface AlbumProps {
	album: Spotify.Album
}

export function Album(props: AlbumProps) {

	return (
		<div style={{ marginTop: 50 }}>
			<div style={{ display: 'flex' }}>
				<div style={{ marginRight: 10 }}>
					{/* hardcode to images[2] which seems to be 64×64 */}
					<img src={ props.album.images[2].url } />
				</div>
				<div>
					<div><strong>{ props.album.artists[0].name }</strong></div>
					<div>{ props.album.name }</div>
					<div style={{ color: '#999', marginTop: 5 }}><em>{ props.album.release_date }</em></div>
				</div>
			</div>
		</div>
	)
}
