export const formatListenerName = (eventName) => {
    return 'on' + capitalize(eventName)
}

function capitalize(string) {
    if (typeof string !== 'string')
        return ''
    return string[0].toUpperCase() + string.substring(1)
    //return string.charAt(0).toUpperCase()+string.slice(1)
}

