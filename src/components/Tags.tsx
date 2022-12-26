import { Fragment } from 'react'

export interface TagsProps {
	tags: string[]
}

export function Tags(props: TagsProps) {

	const SEPARATOR_SPACING = 6

	return (
		<div style={{ color: '#999' }}>
			{ props.tags.map((tag, i) => (
				<Fragment key={ i }>
					{ (i > 0) && <span style={{ marginRight: SEPARATOR_SPACING }}>•</span> }
					<span style={{ marginRight: SEPARATOR_SPACING }}>{ tag }</span>
				</Fragment>
			))}
		</div>
	)
}
