import { router } from './router.js'

export function navigate(path) {
	history.pushState({}, '', path)
	router()
}
