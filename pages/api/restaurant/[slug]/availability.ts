import { NextApiRequest, NextApiResponse } from "next";
import {
    findBookings,
    findRestaurantBySlug,
    getSearchTimes,
    getSearchTimesWithTables
} from "@/lib/actions/booking.action";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug, day, time, partySize } = req.query as {
        slug: string;
        day: string;
        time: string;
        partySize: string;
    }

    if (!day || !time || !partySize) {
        return res.status(400).json({
            errorMessage: "Invalid data provided"
        })
    }

    const restaurant = await findRestaurantBySlug(slug)
    if (!restaurant) {
        return res.status(400).json({
            errorMessage: "Invalid data provided"
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

    const availabilities = searchTimesWithTables.map((t) => {
        const sumSeats = t.tables.reduce((sum, table) => {
            return sum + table.seats
        }, 0)
        return { time: t.time, available: sumSeats > parseInt(partySize) }
    })

    return res.json(availabilities)
}