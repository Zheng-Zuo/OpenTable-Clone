import { fetchRestaurantBySlug } from '@/lib/actions/search.actions';
import { Time, convertToDisplayTime } from '@/lib/utils';
import Image from 'next/image'
import { format } from 'date-fns'

interface Props {
    slug: string;
    date: string;
    partySize: string;
}

const BookingCard = async ({ slug, date, partySize }: Props) => {
    const restaurant = await fetchRestaurantBySlug(slug)
    const time = date.split("T")[1]
    return (
        <div>
            <h3 className='font-bold'>You&apos;re almost done!</h3>

            <div className='mt-5 flex gap-4'>

                <div className='w-32 h-32 relative'>
                    <Image
                        src={restaurant.images[0]}
                        alt="restaurant image"
                        width={176}
                        height={176}
                        className='rounded'
                    />
                </div>

                <div>
                    <h1 className='text-3xl font-bold'>{restaurant.name}</h1>
                    <div className='flex mt-3 gap-6'>
                        <p>{format(new Date(date), "ccc, LLL, d")}</p>
                        <p>{convertToDisplayTime(time as Time)}</p>
                        <p>{partySize} {parseInt(partySize) > 1 ? "people" : "person"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingCard
