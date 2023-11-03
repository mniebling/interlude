export interface ArtistsProps {
	artists: Spotify.Artist[]
}

export function Artists(props: ArtistsProps) {

	if (props.artists.length === 1) return (
		<span>{ props.artists[0].name }</span>
	)

	if (props.artists.length === 2) return (
		<span>{ props.artists[0].name } &amp; { props.artists[1].name }</span>
	)

	const allButLast = props.artists.slice(0, -1).map(a => a.name)
	const last = props.artists.slice(-1)[0].name

	return (
		<span>{ allButLast.join(', ') + ' & ' + last }</span>
	)
}
