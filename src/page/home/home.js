import template from './home.html'
import './home.css'
import Header from '../../components/header/header.js'
import { getTopHeadlines } from '../../api/gnews.service.js'
import NewCard from '../../components/newsCard/newsCard.js'
import Footer from '../../components/footer/footer.js'

export default function Home() {
	const wrapper = document.createElement('div')
	wrapper.innerHTML = template

	let state = {
		category: 'general',
		query: '',
		articles: []
	}

	const footerComponent = new Footer()
	const header = new Header({
		defaultCategory: state.category,
		onCategoryChange(category) {
			state.category = category
			loadNews()
		},
		onSearch(query) {
			state.query = query
			renderNews()
		}
	})

	const content = wrapper.querySelector('.home__content')
	const newList = wrapper.querySelector('.news-list')
	const loading = wrapper.querySelector('.loader')
	const errorDiv = wrapper.querySelector('.error')

	async function loadNews() {
		loading.classList.remove('hidden')

		try {
			state.articles = await getTopHeadlines({ category: state.category })
			renderNews()
		} catch (error) {
			errorDiv.textContent = `${error}`
		} finally {
			loading.classList.add('hidden')
		}
	}

	function renderNews() {
		newList.innerHTML = ''
		const filtered = state.articles.filter(article => {
			const q = state.query.toLowerCase()
			return (
				article.title.toLowerCase().includes(q) ||
				article.source.name.toLowerCase().includes(q)
			)
		})

		if (!filtered.length) {
			newList.textContent = 'No news found'
			return
		}

		filtered.forEach(article => {
			newList.appendChild(NewCard(article))
		})
	}

	content.appendChild(newList)
	wrapper.append(header, content, footerComponent)

	loadNews()

	return wrapper
}
