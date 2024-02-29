## Single Page Application - Page Router Example

This project is a rewrite of certain aspects of [DCode's YouTube Tutorial](https://github.com/dcode-youtube/single-page-app-vanilla-js).

### Introduction

In essence, this is a Single Page Application (SPA) with page routing
implemented in vanilla JS. I have a fascination with keeping project
dependencies minimal, and thusly, if it can be done without a frontend
framework, I'll opt to do so.

### Installation

Simply clone this repository using git and then use go to install the
dependencies, of which there really is only one:

```bash
git clone https://github.com/tomit4/spa_go
```

And then install using go:

```bash
cd spa_go && go mod tidy && go mod vendor
```

Copy the provided env.sample file as .env and reapply the `PORT` number if you so
wish, otherwise it will default to 6069.

Once you are done you can simply run the server either using `go run .` or you
can compile the binary using `go build server.go` and then running the newly created binary, `./server` from the command line.

```bash
# run server using golang runtime
go run .
# or compile and run using go
go build server.go && ./server
```

### Implementation

Although DCode did an excellent job demonstrating the basics of SPA routing, I have made some adjustments to the logic, including implementations taken from [The Dev Drawer's Tutorial](https://github.com/thedevdrawer/spa-routing) so that SEO meta description tags can be adjusted dynamically in the router.

#### Creating A New Page

Also, DCode's original implementation simply sent back raw html strings,
instead, I have included a new folder called `templates` that contains
single html files are returned instead. Dynamic content can be changed out using
the double moustache bar syntax (i.e.`{{ content }}`) within the html files and
then that content can be loaded externally in the corresponding file in the
views directory. Here is an example of the PostView.js and postview.html files that demonstrates
this:

```javascript
// PostView.js
import AbstractView from './AbstractView.js'

export default class extends AbstractView {
    constructor(params) {
        super(params)
        this.postId = params.id
        this.setTitle('Viewing Post')
    }

    async getHtml() {
        try {
            const response = await fetch('/templates/postview.html')
            if (!response.ok) {
                throw new Error('Failed to load postview.html')
            }
            const html = await response.text()
            const renderedHtml = html.replace('{{postId}}', this.postId)
            return renderedHtml
        } catch (error) {
            console.error(error)
            return '<p>Error loading content</p>'
        }
    }
}
```

And also the corresponding postview.html file:

```html
<!-- postview.html -->
<h1>Post</h1>
<p>You are viewing post #{{postId}}.</p>
```

You'll need to import thew new `PostView.js` file into the `js` directory's `index.js` file
and then register it in the routes[] array.

```javascript
// index.js
import PostView from './js/PostView.js'
    const routes = [
        {
            path: '/posts/:id',
            view: PostView,
            meta: {
                title: 'Viewing Post | JS Single Page Application Router',
                description: 'Viewing a post',
            },
        },
        // ...
```

Lastly, all new routes need to be added to the root index.html file:

```html
<!-- index.html -->
<nav class="nav">
    <a class="nav__link" href="/" data-link>Dashboard</a>
    <a class="nav__link" href="/posts" data-link>Posts</a>
    <a class="nav__link" href="/settings" data-link>Settings</a>
</nav>
```

All routes registered with the `data-link` attribute will use the page-router
instead of the default browser router.

### Go Server

In brief, I rewrote the express.js server in Golang as I am learning the
language at the time of this writing. The server is very basic, so it wasn't
difficult to get up in running.

### Potential Pitfalls And Potential Solutions

I have not experimented with this much further at the time of this writing. My
hope is that I can utilize this as a minimalist framework replacement, but there
are a few pitfalls I am anticipating beforehand including:

**PROBLEM: DYNAMICALLY RENDERING USING JS IN TEMPLATES**

-   Dynamically using JavaScript within specific template files is currently
    restricted to being done within views .js files, this means that re rendering
    these pages or specific parts of them might be tricky. Currently all changes
    can be brought in by the server, but require a refresh. This is the
    disadvantage of not working with a virtual dom.

**POTENTIAL SOLUTIONS: DYNAMICALLY RENDERING USING JS IN TEMPLATES**

-   Investigate use of web components and how they might be implemented to
    resolve these issues.
-   Utilize [HTMX](https://htmx.org/) to dynamically render html elements.
-   Investigate [DCode's solution on Auto Refreshing](https://www.youtube.com/watch?v=0v8oMKWP07w) for rendering aspects of the page without page reloading.
-   Also see [DCode's Video on Using Slots](https://www.youtube.com/watch?v=r1BfaetMmP8) which may help with this as well. Not sure yet.
