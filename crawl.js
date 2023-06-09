const {JSDOM} = require('jsdom')

const crawlPage = async (baseURL ,currentURL, pages) => {

    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if(baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    const normalizedURL = normalizeUrl(currentURL)
    if (pages[normalizedURL] > 0) {
        pages[normalizedURL]++
        return pages
    }

    pages[normalizedURL] = 1
    console.log(`crawling: ${currentURL}`)

    try {
        const resp = await fetch(currentURL)

        if(resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status}`)
            return pages
        }
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes('text/html')){
            console.log(`non HTML response, content type: ${contentType} - page: ${currentURL}`)
            return pages
        }
        
        const HTMLBody = await resp.text()

        const nextURLs = getURLsFromHTML(HTMLBody, baseURL)

        for(const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages)
        }

    } catch (error) {
        console.log(`error in fetch: ${error.message} - page: ${currentURL}`)
    }

    return pages
}

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
    getURLsFromHTML,
    crawlPage
}