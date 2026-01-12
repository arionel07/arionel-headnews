import { http } from './http.js'

const API_KEY = '187fe1d781bb7418f3affb60bd2093c4'
//process.env.GNEWS_API_KEY

export async function getTopHeadlines({
	category = 'general',
	query = '',
	max = 10
} = {}) {
	try {
		if (!API_KEY) {
			throw new Error('GNEWS_API_KEY is not defined')
		}

		const response = await http.get('/top-headlines', {
			params: {
				category,
				q: query || undefined,
				lang: 'en',
				max,
				apikey: API_KEY
			}
		})

		return response.data.articles
	} catch (error) {
		console.error('Failed to fetch top headlines', error)
	}
}
