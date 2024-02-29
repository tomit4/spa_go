import NotFound from './views/NotFound.js'
import Dashboard from './views/Dashboard.js'
import Posts from './views/Posts.js'
import PostView from './views/PostView.js'
import Settings from './views/Settings.js'

const pathToRegex = path =>
    new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$')

const getParams = match => {
    const values = match.result.slice(1)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
        result => result[1],
    )

    return Object.fromEntries(
        keys.map((key, i) => {
            return [key, values[i]]
        }),
    )
}

const navigateTo = url => {
    history.pushState(null, null, url)
    router()
}

const router = async () => {
    const routes = [
        {
            path: '',
            view: NotFound,
            meta: {
                title: '404 | JS Single Page Application Router',
                description: 'Page not found',
            },
        },
        {
            path: '/',
            view: Dashboard,
            meta: {
                title: 'Home | JS Single Page Application Router',
                description: 'This is the home page',
            },
        },
        {
            path: '/posts',
            view: Posts,
            meta: {
                title: 'Posts | JS Single Page Application Router',
                description: 'View posts here',
            },
        },
        {
            path: '/posts/:id',
            view: PostView,
            meta: {
                title: 'Viewing Post | JS Single Page Application Router',
                description: 'Viewing a post',
            },
        },
        {
            path: '/settings',
            view: Settings,
            meta: {
                title: 'Settings | JS Single Page Application Router',
                description: 'Adjust your settings here',
            },
        },
    ]

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path)),
        }
    })

    let match = potentialMatches.find(
        potentialMatch => potentialMatch.result !== null,
    )

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname],
        }
    }

    const view = new match.route.view(getParams(match))

    document.querySelector('#app').innerHTML = await view.getHtml()

    // Loads component specific logic after html is rendered
    if (typeof view.afterRender === 'function') {
        view.afterRender()
    }

    document.title = match.route.meta.title
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
        metaDescription.setAttribute('content', match.route.meta.description)
    }
}

window.addEventListener('popstate', router)

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault()
            navigateTo(e.target.href)
        }
    })

    router()
})
