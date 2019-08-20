/**
 * Utility class for handling whitespace
 */

/**
 * Remove duplicated spaces and new lines
 * @param text Text to be formatted
 */
export const fixWhiteSpace = (text: string) => text.replace(/\s{2,}/g, " ").trim()
