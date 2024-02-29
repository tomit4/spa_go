import AbstractView from './AbstractView.js'

export default class extends AbstractView {
    constructor() {
        super()
        this.setTitle('Dashboard')
    }

    async getHtml() {
        try {
            const response = await fetch('/templates/dashboard.html')
            if (!response.ok) {
                throw new Error('Failed to load dashboard.html')
            }
            return await response.text()
        } catch (error) {
            console.error(error)
            return '<p>Error loading content</p>'
        }
    }

    // Component specific logic
    afterRender() {
        const logButton = document.getElementById('logButton')
        logButton.addEventListener('click', this.logHelloWorld)
    }

    logHelloWorld() {
        console.log('Hello World')
    }
}
