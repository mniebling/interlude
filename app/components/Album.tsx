import { Artists } from './Artists'

export interface AlbumProps {
	album: Spotify.Album
}

export function Album(props: AlbumProps) {

	return (
		<div style={{ margin: '25px 0 10px 0' }}>
			<div style={{ display: 'flex' }}>
				<div style={{ marginRight: 10 }}>
					{/* hardcode to images[2] which seems to be 64×64 */}
					<img src={ props.album.images[2].url } />
				</div>
				<div>
					<div><strong><Artists artists={ props.album.artists } /></strong></div>
					<div>{ props.album.name }</div>
					<div style={{ color: '#999' }}>{ props.album.release_date }</div>
				</div>
			</div>
		</div>
	)
}
