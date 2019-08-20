/**
 * Utility functions for making requests
 */
import { get, RequestCallback } from "request"

export const robotHeaders = () => {
	return {
		// Fake a bunch of headers
		"Accept": "text/html",
		"Accept-Language": "en-US,en;q=0.5",
		"Connection": "keep-alive",
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:65.0) Gecko/20100101 Firefox/65.0",
	}
}

/**
 * Make a request that looks like a human.
 * @param url The request URL
 * @param callback A callback to handle the response
 */
export const robotRequest = (url: string, callback?: RequestCallback) => {
	get(
		url,
		{headers: exports.robotHeaders()},
		callback,
	)
}
