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
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {images.map((image, id) => (
                    <Image
                        key={id}
                        src={image}
                        alt="restaurant_image"
                        width={224}
                        height={176}
                    />
                ))}
            </div>
        </div>
    )
}

export default ImageCard