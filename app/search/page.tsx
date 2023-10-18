import { Filters, fetchAllCuisines, fetchAllLocations, getFilteredRestaurants, } from "@/lib/actions/search.actions";
import { stringToFilter } from "@/lib/utils";
import { Header_Search, RestaurantCard, SearchCard } from "@/sections";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Search'
}

export interface SearchParams {
  query?: string;
  filters?: string;
}

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  let filters: Filters = { locations: [], cuisines: [], prices: [] }
  if (searchParams.filters) {
    filters = stringToFilter(searchParams.filters)
  }
  
  const { restaurants, noItemFound } =
    await getFilteredRestaurants(searchParams.query, filters)

  const locations = await fetchAllLocations()
  const cuisines = await fetchAllCuisines()

  return (
    <section>
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
    </section>
  )
}