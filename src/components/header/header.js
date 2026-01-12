import template from './header.html'
import './header.css'
import { navigate } from '../../router/navigate.js'

export default function Header({
	onCategoryChange,
	onSearch,
	defaultCategory = 'general'
}) {
	const wrapper = document.createElement('div')
	wrapper.innerHTML = template

	const searchInput = wrapper.querySelector('.header__search')
	const categoryButtons = wrapper.querySelectorAll('[data-category]')

	categoryButtons.forEach(btn => {
		if (btn.dataset.route === defaultCategory) {
			btn.classList.add('active')
		}
	})

	categoryButtons.forEach(btn => {
		btn.addEventListener('click', () => {
			categoryButtons.forEach(b => b.classList.remove('active'))
			btn.classList.add('active')

			onCategoryChange?.(btn.dataset.category)
		})
	})

	searchInput.addEventListener('input', e => {
		onSearch?.(e.target.value)
	})

	return wrapper
}
