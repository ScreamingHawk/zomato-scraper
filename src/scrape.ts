import * as cheerio from "cheerio"
import { createLogger, format, transports } from "winston"
const { combine, timestamp, prettyPrint } = format

import Restaurant from "./data/Restaurant"
import { robotRequest } from "./util/RobotUtil"
import { fixWhiteSpace } from "./util/WhiteUtil"

// Configure logger
const logger = createLogger({
	format: combine(
		timestamp(),
		prettyPrint(),
	),
	level: "debug",
	transports: [
		new transports.Console(),
	],
})

// Static vars
const baseUrl = "https://www.zomato.com"
const location = "auckland"
const category = "restaurants"

const url = `${baseUrl}/${location}/${category}`
logger.debug(`Requesting ${url}`)
robotRequest(url, (err, resp, data) => {
	if (err) {
		logger.error("Unable to make request", err)
		return
	}
	logger.debug("Got response")
	const $ = cheerio.load(data)

	// Read each card
	logger.debug("Reading cards")
	const results = new Array<Restaurant>()

	Array.from($(".search-snippet-card")).forEach((card) => {
		try {
			results.push(new Restaurant(
				fixWhiteSpace($(card).find(".result-title").text()),
				fixWhiteSpace($(card).find(".search-result-address").text()),
				fixWhiteSpace($(card).find(".res-cost .pl0").text()),
				fixWhiteSpace($(card).find(".res-timing .pl0").text()),
				fixWhiteSpace($(card).find(".res-snippet-ph-info")[0].attribs["data-phone-no-str"]),
				fixWhiteSpace($(card).find(".result-title")[0].attribs.href),
			))
		} catch (error) {
			// Ignore
		}
	})

	// Print results
	results.forEach(logger.info)
})
