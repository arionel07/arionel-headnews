import template from './article.html'
import './article.css'
import Header from '../../components/header/header.js'

export default function ArticlePage() {
	const wrapper = document.createElement('div')
	wrapper.innerHTML = template

	let articles = history.state?.article

	if (!articles) {
		const saved = sessionStorage.getItem('currentArticle')
		console.log(saved)
		if (saved) {
			articles = JSON.parse(saved)
		}
	}

	if (!articles) {
		wrapper.innerHTML = `
            <h2>Article not found</h2>
            <a href="/">Go back</a>
        `
		console.log(articles)
		return wrapper
	}

	const contents = wrapper.querySelectorAll('.article__content')
	const source = wrapper.querySelector('.article__source')
	const date = wrapper.querySelector('.article__date')
	const img = wrapper.querySelector('.article__img')
	const title = wrapper.querySelector('.article__title')

	contents.forEach(content => {
		content.textContent = articles.content || articles.description || ''
	})
	source.textContent = articles.source?.name || 'unknown source'
	date.textContent = new Date(articles.publishedAt).toLocaleDateString()
	if (articles.image) {
		img.src = articles.image
	} else {
		img.src = new URL('../../assets/img/placeholder.avif', import.meta.url)
	}
	title.textContent = articles.title

	return wrapper
}
