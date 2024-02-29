import AbstractView from './AbstractView.js'

export default class extends AbstractView {
    constructor() {
        super()
        this.setTitle('Posts')
    }

    async getHtml() {
        try {
            const response = await fetch('/templates/posts.html')
            if (!response.ok) {
                throw new Error('Failed to load posts.html')
            }
            return await response.text()
        } catch (error) {
            console.error(error)
            return '<p>Error loading content</p>'
        }
    }
}
