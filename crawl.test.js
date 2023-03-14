const { normalizeUrl, getURLsFromHTML } = require('./crawl')
const { test, expect } = require('@jest/globals')

test('normalize URL - strip protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const output = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'

    expect(output).toEqual(expected)
})

test('normalize URL - strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const output = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'

    expect(output).toEqual(expected)
})

test('normalize URL - capitals', () => {
    const input = 'https://BLOG.boot.dev/path/'
    const output = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'

    expect(output).toEqual(expected)
})

test('normalize URL - strip http', () => {
    const input = 'http://blog.boot.dev/path/'
    const output = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'

    expect(output).toEqual(expected)
})

test('getURLsFromHTML - absolute URL', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
                Blog
            </a>
        </body>
    </html>
    `
    const baseURL = 'https://blog.boot.dev'
    const output = getURLsFromHTML(inputHTMLBody, baseURL)
    const expected = ["https://blog.boot.dev/path/"]

    expect(output).toEqual(expected)
})

test('getURLsFromHTML - relative URL', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
                Blog
            </a>
        </body>
    </html>
    `
    const baseURL = 'https://blog.boot.dev'
    const output = getURLsFromHTML(inputHTMLBody, baseURL)
    const expected = ["https://blog.boot.dev/path/"]

    expect(output).toEqual(expected)
})

test('getURLsFromHTML - relative and absolute URL', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
                Blog
            </a>
            <a href="/path2/">
                Blog 2
            </a>
        </body>
    </html>
    `
    const baseURL = 'https://blog.boot.dev'
    const output = getURLsFromHTML(inputHTMLBody, baseURL)
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]

    expect(output).toEqual(expected)
})

test('getURLsFromHTML - invalid URL', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                Invalid
            </a>
        </body>
    </html>
    `
    const baseURL = 'https://blog.boot.dev'
    const output = getURLsFromHTML(inputHTMLBody, baseURL)
    const expected = []

    expect(output).toEqual(expected)
})