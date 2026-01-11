import template from './header.html'
import './header.css'
import { navigate } from '../../router/navigate.js'

export default function Header() {
	const wrapper = document.createElement('div')
	wrapper.innerHTML = template

	const links = wrapper.querySelectorAll('.header__link')
	const currentPath = window.location.pathname

	links.forEach(link => {
		if (link.dataset.route === currentPath) {
			link.classList.add('active')
		}
		link.addEventListener('click', e => {
			e.preventDefault()
			navigate(link.dataset.route)
		})
	})

	return wrapper
}
