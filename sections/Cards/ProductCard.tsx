import Image from 'next/image'
import Link from 'next/link'
import Price from './Price'
import Star from './Star'
import { RestaurantCardType } from '@/lib/actions/search.actions'
import { getTodayBookingBySlug } from '@/lib/actions/booking.action'

interface Props {
  restaurant: RestaurantCardType
}

const ProductCard = async ({ restaurant }: Props) => {
  const restaurantBookings = await getTodayBookingBySlug(restaurant.id)

  return (
    <div className='w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer'>
      <Link href={`/restaurant/${restaurant.slug}`}>
        <div className='h-[50%] relative'>
          <Image
            src={restaurant.main_image}
            alt=""
            className='absolute top-0 left-0 w-full h-full object-cover object-center'
            fill
          />
        </div>
        <div className='p-1'>
          <h3 className="font-bold text-xl mb-2">{restaurant.name}</h3>
          <div className="flex items-start">
            <Star reviews={restaurant.reviews} />
            <p className='ml-2'>{restaurant.reviews.length} review
              {restaurant.reviews.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="flex text-reg font-light capitalize gap-3">
            <p>{restaurant.cuisine.name}</p>
            <Price price={restaurant.price} />
            <p>{restaurant.location.name}</p>
          </div>
          <p className='text-sm mt-1 font-bold'>
            Booked {restaurantBookings.length} time{restaurantBookings.length > 1 ? "s" : ""} today
          </p>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
