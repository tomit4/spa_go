import AbstractView from './AbstractView.js'

export default class extends AbstractView {
    constructor(params) {
        super(params)
        this.postId = params.id
        this.setTitle('Viewing Post')
    }

    async getHtml() {
        try {
            /* Just a demonstration to say this was from an outside server
            const responseFromServer = await fetch("https://myserver.com/posts/" + this.postId)
            if (!responseFromServer.ok) {
                throw new Error('Failed to load post data from myserver.com')
            }
            const htmlFromSErver = await responseFromServer.text()
            */
            const response = await fetch('/templates/postview.html')
            if (!response.ok) {
                throw new Error('Failed to load postview.html')
            }
            const html = await response.text()
            const renderedHtml = html.replace('{{postId}}', this.postId)
            // const renderedHtml = html
            // .replace('{{postId}}', this.postId)
            // .replace('{{content}}', htmlFromSErver)
            return renderedHtml
        } catch (error) {
            console.error(error)
            return '<p>Error loading content</p>'
        }
    }
}
