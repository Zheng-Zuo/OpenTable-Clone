import ImageCard from "./Cards/ImageCard"
import ReviewCard from "./Cards/ReviewCard"
import ReservationCard from "./Cards/ReservationCard"
import OverviewCard from "./Cards/OverviewCard"
import MenuCard from "./Cards/MenuCard"
import NavBar_Restaurant from "./NavBar_Restaurant"
import { restaurantDetailsType } from "@/lib/actions/search.actions"

interface Props {
    restaurant: restaurantDetailsType
}

const Restaurant_Details = ({ restaurant }: Props) => {
    return (
        <section className='flex m-auto w-2/3 justify-between items-start -mt-11'>

            <div className='bg-white w-[60%] rounded p-3 shadow'>

                <NavBar_Restaurant />

                <OverviewCard
                    name={restaurant.name}
                    description={restaurant.description}
                    reviews={restaurant.reviews}
                />

                <ImageCard
                    images={restaurant.images}
                />

                <MenuCard
                    items={restaurant.items}
                />

                <ReviewCard
                    reviews={restaurant.reviews}
                />
            </div>

            {/* resvervation section */}
            <div className='w-[37%] text-reg sticky top-0'>
                <ReservationCard
                    openTime={restaurant.open_time}
                    closeTime={restaurant.close_time}
                    slug={restaurant.slug}
                />
            </div>

        </section>
    )
}

export default Restaurant_Details
