import AbstractView from './AbstractView.js'

export default class extends AbstractView {
    constructor() {
        super()
        this.setTitle('Settings')
    }

    async getHtml() {
        try {
            const response = await fetch('/templates/settings.html')
            if (!response.ok) {
                throw new Error('Failed to load settings.html')
            }
            return await response.text()
        } catch (error) {
            console.error(error)
            return '<p>Error loading content</p>'
        }
    }
}
