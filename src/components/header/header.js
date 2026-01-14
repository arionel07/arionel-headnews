import template from './header.html'
import './header.css'
import { navigate } from '../../router/navigate.js'
import { debounce } from '../../utils/debounce.js'

export default function Header({
	onCategoryChange,
	onSearch,
	defaultCategory = 'general'
}) {
	const wrapper = document.createElement('div')
	wrapper.innerHTML = template

	const searchInput = wrapper.querySelector('.header__search')
	const categoryButtons = wrapper.querySelectorAll('[data-category]')
	const svg = wrapper.querySelector('.svg')

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

	const handleSearch = debounce(value => {
		onSearch?.(value)
	}, 400)

	searchInput.addEventListener('input', e => {
		const value = searchInput.value.trim()

		if (value.length > 0) {
			svg.classList.remove('hidden')
			requestAnimationFrame(() => {
				svg.classList.add('visible')
			})
		} else {
			svg.classList.remove('visible')
			setTimeout(() => {
				svg.classList.add('hidden')
			}, 250)
		}

		handleSearch(e.target.value)
	})

	svg.addEventListener('click', () => {
		searchInput.value = ''
		svg.classList.remove('visible')
		setTimeout(() => {
			svg.classList.add('hidden')
		}, 250)
		onSearch?.('')
	})

	return wrapper
}
