/**
 * A data class holding restuarant information.
 */
export default class Restuarant {
	name: string
	location: string
	costForTwo: string
	hours: string
	phone: string
	link: string

	constructor(
		name: string,
		location: string,
		costForTwo: string,
		hours: string,
		phone: string,
		link: string,
	){
		this.name = name
		this.location = location
		this.costForTwo = costForTwo
		this.hours = hours
		this.phone = phone
		this.link = link
	}
}
