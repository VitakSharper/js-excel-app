class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    clear() {
        this.html('')
        return this
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }
        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
        return this
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        console.log('in off: ', eventType, callback)
        this.$el.removeEventListener(eventType, callback)
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = []) => {
    const el = document.createElement(tagName)
    if (classes.length > 0) {
        classes.forEach(c => el.classList.add(c))
    }
    return $(el)
}

$.getNodeForComponent = (component) => {
    let node;
    switch (component) {
        case 'Header':
            node = 'header'
            break
        case 'Table':
            node = 'section'
            break
        case 'Formula':
            node = 'section'
            break
        case 'Toolbar':
            node = 'nav'
            break
        default:
            node = 'div'
            break
    }
    return node;
}

