import NotFound from '../page/notFound/notFound.js'
import { routes } from './routes.js'

export function router() {
	const app = document.querySelector('#app')
	const path = window.location.pathname

	const Path = routes[path] || NotFound

	app.innerHTML = ''

	app.appendChild(Path())
}
