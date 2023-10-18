import { PRICE, Review, Item, Cuisine, Location, } from "@prisma/client";
import { notFound } from "next/navigation";
import prismaClient from "@/prisma/prismaClient";

const prisma = prismaClient

export interface RestaurantCardType {
    id: number;
    name: string;
    main_image: string;
    cuisine: Cuisine;
    location: Location;
    price: PRICE;
    slug: string;
    reviews: Review[]
}

export interface Filters {
    locations: string[];
    cuisines: string[];
    prices: string[];
}

export interface restaurantDetailsType {
    id: number;
    name: string;
    images: string[];
    description: string;
    open_time: string;
    close_time: string;
    slug: string;
    reviews: Review[];
    items: Item[]
}

export const fetchRestaurantBySlug = async (slug: string): Promise<restaurantDetailsType> => {
    const restaurant = await prisma.restaurant.findUnique({
        where: { slug },
        select: {
            id: true,
            name: true,
            images: true,
            description: true,
            open_time: true,
            close_time: true,
            slug: true,
            reviews: true,
            items: true,
        }
    })

    if (!restaurant) {
        notFound()
    }
    return restaurant
}

export const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
    const restaurants = await prisma.restaurant.findMany({
        select: {
            id: true,
            name: true,
            main_image: true,
            cuisine: true,
            location: true,
            price: true,
            slug: true,
            reviews: true,
        }
    })
    return restaurants
}

export const getFilteredRestaurants = async (query: string | undefined, filters?: Filters):
    Promise<
        {
            restaurants: RestaurantCardType[];
            noItemFound: boolean
        }
    > => {

    let whereClause: any = {}

    if (query) {
        whereClause['OR'] = [
            { name: { contains: query, mode: 'insensitive' } },
            { location: { name: { contains: query, mode: 'insensitive' } } },
            { cuisine: { name: { contains: query, mode: 'insensitive' } } }
        ]
    }

    if (filters) {
        const { locations, cuisines, prices } = filters

        if (locations && locations.length > 0) {
            whereClause['location'] = {
                name: { in: locations }
            }
        }

        if (cuisines && cuisines.length > 0) {
            whereClause['cuisine'] = {
                name: { in: cuisines }
            }
        }

        if (prices && prices.length > 0) {
            whereClause['price'] = {
                in: prices.map(p => PRICE[p as keyof typeof PRICE])
            }
        }
    }

    let restaurants = await prisma.restaurant.findMany(
        {
            where: whereClause,
            select: {
                id: true,
                name: true,
                main_image: true,
                cuisine: true,
                location: true,
                price: true,
                slug: true,
                reviews: true,
            }
        }
    )

    let noItemFound = false

    if (restaurants.length === 0) {
        noItemFound = true;
        const results = await getFilteredRestaurants("");
        restaurants = results.restaurants
    }

    return { restaurants, noItemFound }
}

export async function fetchAllLocations() {
    const locations = await prisma.location.findMany()
    return locations
}

export async function fetchAllCuisines() {
    const cuisines = await prisma.cuisine.findMany()
    return cuisines
}



