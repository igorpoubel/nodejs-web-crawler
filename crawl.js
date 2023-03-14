const {JSDOM} = require('jsdom')

const getURLsFromHTML = (htmlBody, baseURL) => {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const links = dom.window.document.querySelectorAll('a')
    for(const elements of links) {
        if(elements.href.slice(0,1) === '/'){
            try {
                const urlObj = new URL(`${baseURL}${elements.href}`)
                urls.push(urlObj.href)
            } catch(err) {
                console.log(`error with relative URL: ${err.message}`)
            }
        } else {
            try {
                const urlObj = new URL(elements.href)
                urls.push(urlObj.href)
            } catch(err) {
                console.log(`error with absolute URL: ${err.message}`)
            }
        }
    }
    return urls
}

const normalizeUrl = (urlString) => {
    const obj = new URL(urlString)
    const hostPath = `${obj.hostname}${obj.pathname}`
    if(hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0,-1)
    } 
    return hostPath
}

module.exports = {
    normalizeUrl,
    getURLsFromHTML
}