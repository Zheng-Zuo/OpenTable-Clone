import { times } from "@/constants";
import prismaClient from "@/prisma/prismaClient";
import { BookingsOnTables, Table } from "@prisma/client";

const prisma = prismaClient

interface Restaurant {
    id: number;
    tables: Table[];
    open_time: string;
    close_time: string;
}

interface Booking {
    number_of_people: number;
    booking_time: Date;
    bookingontables: BookingsOnTables[]
}

export async function findRestaurantBySlug(slug: string) {
    const restaurant = await prisma.restaurant.findUnique({
        where: { "slug": slug },
        select: {
            id: true,
            tables: true,
            open_time: true,
            close_time: true,
        }
    })

    return restaurant
}

export async function findBookings(restaurant_id: number, day: string, searchTimes: string[]) {
    const bookings = await prisma.booking.findMany({
        where: {
            "restaurant_id": restaurant_id,
            booking_time: {
                gte: new Date(`${day}T${searchTimes[0]}`),
                lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`)
            }
        },
        select: {
            number_of_people: true,
            booking_time: true,
            bookingontables: true,
        }
    })
    return bookings
}

export function getSearchTimes(day: string, time: string, restaurant: Restaurant) {
    let searchTimes = times.find(t => {
        return t.time === time
    })?.searchTimes

    const openTime_dt = new Date(`${day}T${restaurant.open_time}`)
    const closeTime_dt = new Date(`${day}T${restaurant.close_time}`)

    if (searchTimes) {
        searchTimes = searchTimes.filter(searchTime => {
            const searchTime_dt = new Date(`${day}T${searchTime}`)
            if (searchTime_dt < openTime_dt || searchTime_dt > closeTime_dt) { return false }
            return true
        })
    }
    return searchTimes
}

export function getSearchTimesWithTables(
    currentBookings: Booking[],
    restaurant: Restaurant,
    searchTimes: string[],
    day: string,
) {
    const bookingTablesObj: { [key: string]: { [key: number]: true } } = {}
    currentBookings.forEach(booking => {
        const timeKey = booking.booking_time.toISOString();
        const existingBooking = bookingTablesObj[timeKey] || {}

        bookingTablesObj[timeKey] = booking.bookingontables.reduce((obj, cur) => {
            return {
                ...obj,
                [cur.table_id]: true
            }
        }, existingBooking)
    })

    const tables = restaurant.tables
    const searchTimesWithTables = searchTimes.map((searchTime) => {
        return {
            date: new Date(`${day}T${searchTime}`),
            time: searchTime,
            tables
        }
    })

    searchTimesWithTables.forEach((t) => {
        t.tables = t.tables.filter((table) => {
            if (bookingTablesObj[t.date.toISOString()]) {
                if (bookingTablesObj[t.date.toISOString()][table.id]) return false
            }
            return true
        })
    })

    return searchTimesWithTables
}

interface bookingInputProps {
    day: string;
    time: string;
    partySize: string;
    booker_email: string;
    booker_phone: string;
    booker_first_name: string;
    booker_last_name: string;
    booker_occasion: string;
    booker_request: string;
    restaurant_id: number;
}

export async function createBooking(
    bookingInput: bookingInputProps
) {
    const booking = await prisma.booking.create({
        data: {
            number_of_people: parseInt(bookingInput.partySize),
            booking_time: new Date(`${bookingInput.day}T${bookingInput.time}`),
            booker_email: bookingInput.booker_email,
            booker_phone: bookingInput.booker_phone,
            booker_first_name: bookingInput.booker_first_name,
            booker_last_name: bookingInput.booker_last_name,
            booker_occasion: bookingInput.booker_occasion,
            booker_request: bookingInput.booker_request,
            restaurant_id: bookingInput.restaurant_id
        }
    })
    return booking
}

export async function createBookingsOnTables(bookingsOnTableData: {
    table_id: number;
    booking_id: number;
}[]) {
    await prisma.bookingsOnTables.createMany(
        { data: bookingsOnTableData }
    )
}

export async function getTodayBookingBySlug(restaurant_id: number) {
    const dt = new Date()
    const dateString = dt.toISOString().split("T")[0]
    const today = new Date(dateString)
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const restaurantBookings = await prisma.booking.findMany({
        where: {
            restaurant_id,
            booking_time: {
                gte: today,
                lt: tomorrow
            },
        },
        select: {
            booking_time: true
        }
    })
    return restaurantBookings
}