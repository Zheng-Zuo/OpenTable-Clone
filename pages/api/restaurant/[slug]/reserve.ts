import {
    createBooking,
    createBookingsOnTables,
    findBookings,
    findRestaurantBySlug,
    getSearchTimes,
    getSearchTimesWithTables
} from "@/lib/actions/booking.action";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { slug, day, time, partySize } = req.query as {
            slug: string;
            day: string;
            time: string;
            partySize: string;
        }

        const {
            bookerEmail,
            bookerPhone,
            bookerFirstName,
            bookerLastName,
            bookerOccasion,
            bookerRequest,
        } = req.body

        const restaurant = await findRestaurantBySlug(slug)
        if (!restaurant) {
            return res.status(400).json({
                errorMessage: "Restaurant not found"
            })
        }

        if (
            new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
            new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
        ) {
            return res.status(400).json({
                errorMessage: "Restaurant is not open at that time",
            })
        }

        const searchTimes = getSearchTimes(day, time, restaurant)

        if (!searchTimes || searchTimes.length === 0) {
            return res.status(400).json({
                errorMessage: "Invalid data provided"
            })
        }

        const currentBookings = await findBookings(restaurant.id, day, searchTimes)

        const searchTimesWithTables = getSearchTimesWithTables(
            currentBookings,
            restaurant,
            searchTimes,
            day
        )

        if (!searchTimesWithTables) {
            return res.status(400).json({
                errorMessage: "Invalid data provided"
            })
        }

        const bookingTimeWithTables = searchTimesWithTables.find(t => {
            return t.date.toISOString() === new Date(`${day}T${time}`).toISOString()
        })

        if (!bookingTimeWithTables ||
            bookingTimeWithTables.tables.length === 0
        ) {
            return res.status(400).json({
                errorMessage: "No availability, cannot book"
            })
        } else {
            const sumSeats = bookingTimeWithTables.tables.reduce((sum, table) => {
                return sum + table.seats
            }, 0)
            if (sumSeats < parseInt(partySize)) {
                return res.status(400).json({
                    errorMessage: "No availability, cannot book"
                })
            }
        }

        const tablesCount: {
            2: number[];
            4: number[];
        } = { 2: [], 4: [] }

        bookingTimeWithTables.tables.forEach((table) => {
            if (table.seats === 2) {
                tablesCount[2].push(table.id)
            } else {
                tablesCount[4].push(table.id)
            }
        })

        const tablesToBook: number[] = []
        let seatsRemaining = parseInt(partySize)

        while (seatsRemaining > 0) {
            if (seatsRemaining >= 3) {
                if (tablesCount[4].length > 0) {
                    tablesToBook.push(tablesCount[4].shift() as number)
                    seatsRemaining -= 4
                } else {
                    tablesToBook.push(tablesCount[2].shift() as number)
                    seatsRemaining -= 2
                }
            } else {
                if (tablesCount[2].length > 0) {
                    tablesToBook.push(tablesCount[2].shift() as number)
                    seatsRemaining -= 2
                } else {
                    tablesToBook.push(tablesCount[4].shift() as number)
                    seatsRemaining -= 4
                }
            }
        }

        const booking = await createBooking(
            {
                day,
                time,
                partySize,
                booker_email: bookerEmail,
                booker_phone: bookerPhone,
                booker_first_name: bookerFirstName,
                booker_last_name: bookerLastName,
                booker_occasion: bookerOccasion,
                booker_request: bookerRequest,
                restaurant_id: restaurant.id
            }
        )

        const bookingsOnTableData = tablesToBook.map((table_id) => {
            return {
                table_id,
                booking_id: booking.id
            }
        })

         await createBookingsOnTables(bookingsOnTableData)

        return res.json(booking)
    }
    return res.status(400).json({
        errorMessage: "Invalid URL"
    })
}