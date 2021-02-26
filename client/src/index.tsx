import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider } from 'react-query'
import { client } from './api'

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider>
			<QueryClientProvider client={client}>
				<ReactQueryDevtools initialIsOpen={true} />
				<App />
			</QueryClientProvider>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root')
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
	import.meta.hot.accept()
}
