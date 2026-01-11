import template from './notFound.html'
import './notFound.css'

export default function NotFound() {
	const wrapper = document.createElement('div')
	wrapper.innerHTML = template

	return wrapper.firstElementChild
}
