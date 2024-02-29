export default class AbstractView {
    // You can apply a more globalized state here
    // since all other "components" are inherited from this parent class
    constructor() {}

    setTitle(title) {
        document.title = title
    }

    async getHtml() {
        return ''
    }
}
