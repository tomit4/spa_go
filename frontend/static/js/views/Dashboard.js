import AbstractView from './AbstractView.js'

export default class extends AbstractView {
    constructor() {
        super()
        this.setTitle('Dashboard')
        // Custom Component Specific Methods
        this.delay = async duration => {
            return new Promise(resolve => setTimeout(resolve, duration))
        }
        this.logHelloWorld = async () => {
            await this.delay(2000)
            console.log('Hello World')
        }
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

    // Component Specific Events Are Applied to The DOM Here
    afterRender() {
        const logButton = document.getElementById('logButton')
        logButton.addEventListener('click', this.logHelloWorld)
    }
}
