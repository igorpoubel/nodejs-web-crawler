const normalizeUrl = (urlString) => {
    const obj = new URL(urlString)
    const hostPath = `${obj.hostname}${obj.pathname}`
    if(hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0,-1)
    } 
    return hostPath
}

module.exports = {
    normalizeUrl
}