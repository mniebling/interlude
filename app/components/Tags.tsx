import { Fragment } from 'react'
import css from './Tags.module.css'

export interface TagsProps {
	style?: React.CSSProperties
	tags: string[]
}

export function Tags(props: TagsProps) {

	const SEPARATOR_SPACING = 4

	return (
		<div style={ props.style }>
			{ props.tags.map((tag, i) => (
				<Fragment key={ i }>
					<span className={ css.tag } style={{ marginRight: SEPARATOR_SPACING }}>{ tag }</span>
				</Fragment>
			))}
		</div>
	)
}
