const iconsToButton = (btnConfig) => {
    const meta = `
                data-type="btn"
                data-css='${JSON.stringify(btnConfig.css)}'
`
    return `
    <button 
         ${meta}
         class="btn ${btnConfig.active ? 'active' : ''}">
        <i
         ${meta} 
        class="material-icons">${btnConfig.icon}</i>
    </button>
`
}
export const createToolbar = (state) => {
    const btnConfig = [
        {icon: 'format_align_left', active: state['textAlign'] === 'left', css: {textAlign: 'left'}},
        {icon: 'format_align_center', active: state['textAlign'] === 'center', css: {textAlign: 'center'}},
        {icon: 'format_align_right', active: state['textAlign'] === 'right', css: {textAlign: 'right'}},
        {
            icon: 'format_bold',
            active: state['fontWeight'] === 'bold',
            css: {fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'}
        },
        {
            icon: 'format_italic',
            active: state['fontStyle'] === 'italic',
            css: {fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'}
        },
        {
            icon: 'format_underline',
            active: state['textDecoration'] === 'underline',
            css: {textDecoration: state['textDecoration'] === 'underline' ? 'none' : 'underline'}
        }
    ]
    return btnConfig.map(iconsToButton).join('')
}
