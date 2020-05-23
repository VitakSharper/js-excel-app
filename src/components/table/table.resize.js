import {$} from "@core/dom";

export function resizeHandler($root,event) {
    const $resizer = $(event.target)

    const $parent = $resizer.closest('[data-type="random-char"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    const sideProp = type === 'column' ? 'bottom' : 'right'
    let value;

    $resizer.css({
        opacity: 1,
        [sideProp]: '-500rem'
    })

    const columns = $root.findAll(`[data-col^='${$parent.data.col}']`)

    document.onmousemove = e => {
        if (type === 'column') {
            const delta = e.pageX - coords.right
            value = coords.width + delta
            $resizer.css({right: -delta + 'px'})
        } else {
            const delta = e.pageY - coords.bottom
            value = coords.height + delta
            $resizer.css({bottom: -delta + 'px'})
        }
    }

    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        if (type === 'column') {
            $parent.css({width: `${value}px`})
            columns.forEach(el => el.style.width = value + 'px')
        } else {
            $parent.css({height: `${value}px`})
        }

        $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0
        })
    }
}
