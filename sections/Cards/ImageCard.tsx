import Image from "next/image"

interface Props {
    images: string[]
}

const ImageCard = ({ images }: Props) => {
    return (
        <div id="photo">
            <h1 className="font-bold text-3xl max-sm:text-2xl mt-10 mb-7 border-b pb-5">
                {images.length} Photo{images.length > 1 ? "s" : ""}
            </h1>
            <div className="flex flex-wrap justify-center items-start gap-4">
                {images.map((image, id) => (
                    <div key={id} className="relative w-44 h-44">
                        <Image
                            src={image}
                            alt="restaurant_image"
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ImageCard
