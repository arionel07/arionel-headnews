import template from './footer.html'
import './footer.css'

export default function Footer() {
	const wrapper = document.createElement('div')
	wrapper.innerHTML = template
	return wrapper.firstElementChild
}
