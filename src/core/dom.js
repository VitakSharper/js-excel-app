class Dom {
    get data() {
        return this.$el.dataset
    }

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

    text(text) {
        if (typeof text === 'string') {
            if (this.$el.tagName.toLowerCase() === 'input') {
                this.$el.value = text
                return this
            }
            this.$el.textContent = text.trim()
            return this
        }
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
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
        this.$el.removeEventListener(eventType, callback)
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    css(cssDeclaration = {}) {
        Object.keys(cssDeclaration)
            .forEach(cssProperty =>
                this.$el.style[cssProperty] = cssDeclaration[cssProperty])
    }

    getCss(styles = []) {
        return styles.reduce((acc, cssProperty) => {
            acc[cssProperty] = this.$el.style[cssProperty]
            return acc
        }, {})
    }

    addClass(className) {
        this.$el.classList.add(className)
        return this
    }

    removeClass(className) {
        this.$el.classList.remove(className)
        return this
    }

    getCellId() {
        return this.data.col
    }

    selectedCellFocus() {
        this.$el.focus()
        return this
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

$.getNodeForComponent = (node) => {
    switch (node) {
        case 'Header':
            return 'header'
        case 'Formula':
        case 'Table':
            return 'section'
        case 'Toolbar':
            return 'nav'
        default:
            return 'div'
    }
}

