import Image from "next/image"
import Link from "next/link"
import Star from "./Star"
import Price from "./Price"
import { calculateReviewRatingAverage } from "@/lib/utils"
import { RestaurantCardType } from "@/lib/actions/search.actions"

interface Props {
  restaurant: RestaurantCardType
}

const RestaurantCard = ({ restaurant }: Props) => {
  const avg_rating = calculateReviewRatingAverage(restaurant.reviews)

  let rating_description
  if (avg_rating >= 4.5) {
    rating_description = "Exceptional"
  } else if (avg_rating >= 3.5 && avg_rating < 4.5) {
    rating_description = "Awesome"
  } else if (avg_rating >= 2.5 && avg_rating < 3.5) {
    rating_description = "Average"
  } else {
    rating_description = "Bad"
  }


  return (
    <div className="border-b flex pb-5">
      <div className="w-44 h-44 relative">
        <Link href={`/restaurant/${restaurant.slug}`}>
          <Image
            src={restaurant.main_image}
            alt="restaurant_image"
            fill
            className="object-cover"
          />
        </Link>
      </div>

      <div className="pl-5">
        <Link href={`/restaurant/${restaurant.slug}`}>
          <h2 className="text-3xl">{restaurant.name}</h2>
        </Link>
        <div className="flex items-start gap-2">
          <Star reviews={restaurant.reviews} />
          <p className="text-sm">{rating_description}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg gap-4">
            <Price price={restaurant.price} />
            <p className="capitalize">{restaurant.cuisine.name}</p>
            <p className="capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>View more information</Link>
        </div>
      </div>
    </div >
  )
}

export default RestaurantCard
