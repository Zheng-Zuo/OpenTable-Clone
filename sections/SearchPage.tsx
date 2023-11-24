// "use client"

import { Filters, fetchAllCuisines, fetchAllLocations, getFilteredRestaurants, } from "@/lib/actions/search.actions";
import { Header_Search, RestaurantCard, SearchCard } from "@/sections";
import { useState } from "react";


export default async function SearchPage({ searchParams }: { searchParams: { query: string | undefined } }) {
  const [filters, setFilters] = useState<Filters>({ locations: [], cuisines: [], prices: [] })

  const { restaurants, noItemFound } =
    await getFilteredRestaurants(searchParams.query, filters)

  const locations = await fetchAllLocations()
  const cuisines = await fetchAllCuisines()

  return (
    <>
      <Header_Search />

      <div className="flex py-4 m-auto w-2/3 justify-between items-start gap-5">

        <div className="w-1/5 mr-4 sticky top-5">
          <SearchCard cuisines={cuisines} locations={locations} />
        </div>

        <div className="w-5/6 ml-4">
          {noItemFound && (
            <p className="text-black font-bold mb-5 flex flex-grow">
              No restaurant found for the search term, showing other restaurants you might be interested...
            </p>
          )}
          {restaurants.map((restaurant) => (
            <RestaurantCard restaurant={restaurant} key={restaurant.id} />
          ))}
        </div>

      </div>
    </>
  )
}