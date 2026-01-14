import template from './newsCard.html'
import './newsCard.css'
import { navigate } from '../../router/navigate.js'

export default function NewCard(article) {
	const element = document.createElement('div')
	element.innerHTML = template

	const newsCard = element.querySelector('.news-card')
	const img = element.querySelector('.news-card__image')
	const title = element.querySelector('.news-card__title')
	const source = element.querySelector('.news-card__source')
	const imgWrapper = element.querySelector('.image__wrapper')

	const loader = document.createElement('div')
	loader.classList.add('image-loader')
	loader.textContent = 'Loading...'
	imgWrapper.appendChild(loader)

	img.src = article.image

	img.addEventListener('load', () => {
		img.classList.add('loaded')
		loader.remove()
	})

	img.addEventListener('error', () => {
		img.src = new URL('../../assets/img/placeholder.avif', import.meta.url)
		loader.remove()
	})

	img.alt = article.title || 'new img'

	title.textContent = article.title
	source.textContent = article.source?.name || 'unknown'

	if (!article) {
		throw new Error('NewCard: article is required')
	}

	newsCard.addEventListener('click', () => {
		sessionStorage.setItem('currentArticle', JSON.stringify(article))

		navigate('/article', { article })
	})

	return element
}
