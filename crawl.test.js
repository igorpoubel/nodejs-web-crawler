const { normalizeUrl } = require('./crawl')
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