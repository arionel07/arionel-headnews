import { router } from './router/router.js'
import './styles/style.css'

window.addEventListener('popstate', router)
document.addEventListener('DOMContentLoaded', router)
