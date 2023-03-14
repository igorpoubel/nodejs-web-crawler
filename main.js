const { crawlPage } = require("./crawl")

const main = () => {
    if (process.argv.length < 3) {
        console.log('no website')
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log('many website')
        process.exit(1)
    }

    const baseURL = process.argv[2]

    console.log(`starting crawl: ${baseURL}`);

    crawlPage(baseURL)
}

main()