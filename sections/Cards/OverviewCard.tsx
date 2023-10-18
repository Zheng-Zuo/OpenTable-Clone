import { Review } from "@prisma/client";
import Star from "./Star";
import { calculateReviewRatingAverage } from "@/lib/utils";

interface Props {
    name: string;
    description: string;
    reviews: Review[]
}


const OverviewCard = (
    { name, description, reviews }: Props
) => {
    return (
        <div id="overview">
            <div className='mt-4 border-b border-solid border-gray-300 pb-6'>
                <h1 className='font-bold text-6xl max-xl:text-4xl max-sm:text-2xl'>{name}</h1>
            </div>

            <div className="flex items-end">
                <div className="flex mt-2 items-center ratings">
                    <Star reviews={reviews} />
                    <p className="text-reg ml-3">{calculateReviewRatingAverage(reviews)}</p>
                </div>
                <div>
                    <p className="text-reg ml-4">{reviews.length} Reviews</p>
                </div>
            </div>

            <div className="mt-4">
                <p className="text-lg font-light">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default OverviewCard
