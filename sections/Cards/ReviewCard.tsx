import { Review } from "@prisma/client"
import Star from "./Star"

interface Props {
    reviews: Review[]
}

const ReviewCard = ({ reviews }: Props) => {
    return (
        <div id="review">
            <h1 className="font-bold text-2xl max-sm:text-2xl mt-10 mb-7 border-b pb-5">
                What {reviews.length} people {reviews.length > 1 ? "are" : "is"} saying
            </h1>
            <div>
                <div className="border-b pb-7 mb-7 flex flex-col gap-7">
                    {reviews.map((review) => (
                        <div className="flex" key={review.id} >

                            <div className="w-1/6 flex flex-col items-center">
                                <div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
                                    <h2 className="text-white text-lg">
                                        {review.first_name[0].toUpperCase()}
                                        {review.last_name[0].toUpperCase()}
                                    </h2>
                                </div>
                                <p className="text-center mt-2">{review.first_name}{" "}{review.last_name}</p>
                            </div>

                            <div className="ml-10 w-5/6">
                                <div className="flex items-center">
                                    <Star reviews={[]} rating={review.rating} />
                                    <p className="text-reg ml-3">{review.rating}</p>
                                </div>
                                <div className="mt-5">
                                    <p className="text-reg font-light">
                                        {review.text}
                                    </p>
                                </div>
                            </div>

                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}

export default ReviewCard
