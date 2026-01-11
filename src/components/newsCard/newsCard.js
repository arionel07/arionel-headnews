import template from './newsCard.html'
import './newsCard.css'

export default function NewCard(article) {
	const element = document.createElement('div')
	element.innerHTML = template

	const img = element.querySelector('.news-card__image')
	const title = element.querySelector('.news-card__title')
	const description = element.querySelector('.news-card__description')
	const source = element.querySelector('.news-card__source')
	const date = element.querySelector('.news-card__date')

	img.src = article.img || '../../assets/img/placeholder.avif'
	img.alt = article.alt || 'new img'

	title.textContent = article.title
	description.textContent = article.description || ''
	source.textContent = article.source?.name || 'unknown'
	date.textContent = new Date(article.publishedAt).toLocaleDateString()

	element.addEventListener('click', () => {
		window.router.navigate(`/article?=${encodeURIComponent(article.url)}`)
	})

	return element.firstElementChild
}
