import axios from 'axios'

const BASE_URL = 'https://gnews.io/api/v4'

export const http = axios.create({
	baseURL: BASE_URL,
	timeout: 5000
})
