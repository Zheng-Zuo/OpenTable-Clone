import { Header_Restaurant, Restaurant_Details } from "@/sections"
import { Metadata } from "next"
import { fetchRestaurantBySlug } from "@/lib/actions/search.actions"

export const metadata: Metadata = {
  title: 'Restaurant'
}

export default async function Page({ params }: { params: { slug: string } }) {
  const restaurant = await fetchRestaurantBySlug(params.slug)

  return (
    <section>
      <Header_Restaurant name={restaurant.name} />
      <Restaurant_Details restaurant={restaurant} />
    </section>
  )
}