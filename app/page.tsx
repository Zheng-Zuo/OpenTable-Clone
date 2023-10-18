import { fetchRestaurants } from "@/lib/actions/search.actions";
import { Header_Home, ProductCard } from "@/sections"

export default async function Home() {
  const restaurants = await fetchRestaurants()

  return (
    <>
      <Header_Home />
      <section className='py-3 px-36 mt-10 flex flex-wrap justify-center'>
        {restaurants.map((restaurant) => (
          <ProductCard restaurant={restaurant} key={restaurant.id} />
        ))}
      </section>
    </>
  )
}
