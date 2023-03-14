const { crawlPage } = require("./crawl")

const main = async () => {
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

    const pages = await crawlPage(baseURL, baseURL, {})

    for (const page of Object.entries(pages)) {
        console.log(page);
    }
}

main()