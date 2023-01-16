import { AppProps } from 'next/app'
import Head from 'next/head'
import './layout.css'


export default function InterludeApp({ Component, pageProps }: AppProps) {

	return (
		<>
			<Head>
				<title>Interlude</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel="icon" type="image/png" href="/images/favicon.png" />
				<link rel="apple-touch-icon" href="/images/favicon.png" />
			</Head>

			<Component { ...pageProps } />
		</>
	)
}
