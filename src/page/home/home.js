import './home.css'
import Header from '../../components/header/header.js'
import { getTopHeadlines } from '../../api/gnews.service.js'
import NewCard from '../../components/newsCard/newsCard.js'
import Footer from '../../components/footer/footer.js'

export default function Home() {
	const wrapper = document.createElement('div')

	let state = {
		category: 'general',
		query: ''
	}
	const footerComponent = new Footer()
	const header = new Header({
		defaultCategory: state.category,
		onCategoryChange(category) {
			state.category = category
			loadNews()
		},
		searchInput(query) {
			state.query = query
			loadNews()
		}
	})

	const content = document.createElement('div')
	const newList = document.createElement('div')

	async function loadNews() {
		newList.innerHTML = 'Loading...'
		const articles = await getTopHeadlines(state)

		newList.innerHTML = ''

		articles.forEach(article => {
			newList.append(NewCard(article))
		})
	}

	content.appendChild(newList)
	wrapper.append(header, content, footerComponent)

	loadNews()

	return wrapper
}
