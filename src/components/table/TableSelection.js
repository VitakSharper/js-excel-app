export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    applyCss(cssDeclaration) {
        this.group.forEach($el => $el.css(cssDeclaration))
    }

// $el instance of DOM
    select($el) {
        this.clear()
        this.group.push($el)
        this.current = $el
        $el.selectedCellFocus().addClass(TableSelection.className)
    }

    clear() {
        this.group.forEach($el => $el.removeClass(TableSelection.className))
        this.group = []
    }

    selectGroup($group = []) {
        this.clear()
        this.group = $group
        this.group.forEach($el => $el.addClass(TableSelection.className))
    }
}
