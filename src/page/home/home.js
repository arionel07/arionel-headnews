import './home.css'
import Header from '../../components/header/header.js'

export default function Home() {
	const wrapper = document.createElement('div')

	wrapper.appendChild(Header())

	return wrapper
}
