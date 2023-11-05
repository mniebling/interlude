import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HomePage } from './pages/HomePage'

// Application-level CSS will get inlined into a style tag.
import './layout.css'

// Diagnostics for the edge function endpoints
fetch('/api/status').then(response => console.log(`API online: ${response.ok}`))


const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
	<StrictMode>
		<HomePage />
	</StrictMode>
)
