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
            const purifiedText = await DOMPurify.sanitize(await response.text())
            return purifiedText
        } catch (error) {
            console.error(error)
            return '<p>Error loading content</p>'
        }
    }
}
