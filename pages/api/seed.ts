import prismaClient from '@/prisma/prismaClient';
import { PRICE } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = prismaClient
type Data = {
    text: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    console.log("Start initializing all tables in database...")
    await prisma.bookingsOnTables.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.table.deleteMany();
    await prisma.review.deleteMany();
    await prisma.item.deleteMany();
    await prisma.restaurant.deleteMany();
    await prisma.cuisine.deleteMany();
    await prisma.location.deleteMany();
    await prisma.user.deleteMany();
    console.log("Finished reseting all tables.")

    await prisma.location.createMany({
        data: [
            { name: "Torono" },
            { name: "Ottawa" },
            { name: "Montreal" },
            { name: "Hamilton" },
            { name: "Kingston" },
            { name: "Niagara" }
        ]
    })
    console.log("Finished initializing Location table.")

    await prisma.cuisine.createMany({
        data: [
            { name: "Mexican" },
            { name: "Italian" },
            { name: "Chinese" },
            { name: "Japanese" },
            { name: "Thai" },
        ]
    })
    console.log("Finished initializing Cuisine table.")

    const locations = await prisma.location.findMany()
    const cuisines = await prisma.cuisine.findMany()

    const toronoLocationId = locations.find((location) => location.name === "Torono")?.id || 1
    const ottawaLocationId = locations.find((location) => location.name === "Ottawa")?.id || 1
    const montrealLocationId = locations.find((location) => location.name === "Montreal")?.id || 1
    const hamiltonLocationId = locations.find((location) => location.name === "Hamilton")?.id || 1
    const kingstonLocationId = locations.find((location) => location.name === "Kingston")?.id || 1
    const niagaraLocationId = locations.find((location) => location.name === "Niagara")?.id || 1

    const mexicanCuisineId = cuisines.find((cuisine) => cuisine.name === "Mexican")?.id || 1
    const italianCuisineId = cuisines.find((cuisine) => cuisine.name === "Italian")?.id || 1
    const chineseCuisineId = cuisines.find((cuisine) => cuisine.name === "Chinese")?.id || 1
    const japaneseCuisineId = cuisines.find((cuisine) => cuisine.name === "Japanese")?.id || 1
    const thaiCuisineId = cuisines.find((cuisine) => cuisine.name === "Thai")?.id || 1

    await prisma.restaurant.createMany({
        data: [
            // Mexican
            {
                name: "Puesto Santa Clara",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/2/52394265.jpg",
                price: PRICE.CHEAP,
                description: "Owned and operated by a Mexican American family whose best memories all include tacos, Puesto is an award-winning Mexican Artisan Kitchen & Bar providing an innovative approach to authentic Mexican flavors. Puesto has garnered national acclaim for its Mexico City-style crispy melted cheese tacos, served on handmade non-GMO, organic, maíz azul stone-ground tortillas.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/54932993.jpg",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/52394287.jpg",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/52394302.jpg",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/52394283.jpg",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/52394280.jpg",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/52394265.jpg",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "puesto_santa_clara",
                location_id: toronoLocationId,
                cuisine_id: mexicanCuisineId,
            },
            //
            {
                name: "Mezcal",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/2/46887206.webp",
                price: PRICE.REGULAR,
                description: "Located in Downtown San Jose, Mezcal boasts one of the most distinctive dining rooms in San Jose. The brick exterior, metal work and indigenous Mexican motifs, sets the restaurant apart from its neighbors. Although the design is urban upscale, there is nothing watered down about the menu. Mezcal proudly serves authentic Oaxacan regional cuisine utilizing family recipes passed on from previous generations.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/51100356.jpg",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/49101117.jpg",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/48432416.jpg",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/47059788.jpg",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/42427718.jpg",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/53406463.jpg",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "mezcal",
                location_id: ottawaLocationId,
                cuisine_id: mexicanCuisineId,
            },
            //
            {
                name: "Distrito Federal",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/2/53874937.webp",
                price: PRICE.EXPENSIVE,
                description: "DISTRITO FEDERAL IS A UNIQUELY CRAFTED DINING EXPERIENCE THAT DELIVERS THE ESSENCE OF MEXICO CITY TO YOUR TABLE. OUR PASSIONATE CHEFS USE THE HIGHEST QUALITY INGREDIENTS TO ENSURE EACH DISH IS A TRUE REFLECTION OF TRADITIONAL MEXICAN STREET EATS, PRESENTED IN A FINE-DINING STYLE. OUR COCKTAIL MENU IS EQUALLY IMPRESSIVE AND CRAFTED TO PERFECTION; FEATURING FRESH PRODUCE AND PRESSED JUICES MADE IN-HOUSE WITH THE FINEST OF SPIRITS AND LIQUEURS. THIS ALLOWS US TO CREATE DELICIOUS PAIRINGS WITH OUR PREMIUM DISHES.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/53601811.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/53601776.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/53601818.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/53601798.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/54936380.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/54838952.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "distrito_federal",
                location_id: montrealLocationId,
                cuisine_id: mexicanCuisineId,
            },
            //
            {
                name: "Mexico Lindo - San Jose",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/1/52586833.webp",
                price: PRICE.CHEAP,
                description: "Mexico Lindo in San Jose is a restaurant and cantina specializing in authentic Mexican cuisine. The El Patio is an outdoor dining area where you can enjoy your meal under the stars and features direct views of the Silver Creek hillside.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/52586832.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/52586822.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/52586829.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/52586821.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/52586835.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/52586827.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "mexico_lindo_san_jose",
                location_id: kingstonLocationId,
                cuisine_id: mexicanCuisineId,
            },
            //
            {
                name: "Reposado Restaurant",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/1/52586821.webp",
                price: PRICE.REGULAR,
                description: "Reposado offers a unique experience with exceptional Mexican cuisine which will challenge the imagination and seduce the palate.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/52586832.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/52586822.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/52586829.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/52586821.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/52586835.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/52586827.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "reposado_restaurant",
                location_id: hamiltonLocationId,
                cuisine_id: mexicanCuisineId,
            },
            //
            {
                name: "Tostadas Prime",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/2/53813017.webp",
                price: PRICE.EXPENSIVE,
                description: "We are a Latin American Steakhouse, offering upscale gastronomy and an exclusive spirits selection highlighted by our knowledgeable mixologists. Our restaurant in silicon valley delivers a refined one-of-a-kind CDMX-inspired PRIME experience through a modern and sophisticated lens.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/53813020.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/53813016.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/53813022.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/53813014.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/53386030.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/53813012.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "tostadas_prime",
                location_id: niagaraLocationId,
                cuisine_id: mexicanCuisineId,
            },

            // Italian -----------------------------------------------------------
            {
                name: "Grand View",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/1/25544988.webp",
                price: PRICE.CHEAP,
                description: "The Mt. Hamilton Grandview is a classic restaurant in a breathtaking location, with plenty of outdoor dining, overlooking the exquisite Santa Clara Valley. The memory of a great meal and our sunset views will stay with you long after your table’s been cleared.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/30880385.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/25544975.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/25544987.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/25544967.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/25544981.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/25544989.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "grand_view",
                location_id: toronoLocationId,
                cuisine_id: italianCuisineId,
            },

            {
                name: "BE.STEAK.A",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/2/51920560.webp",
                price: PRICE.REGULAR,
                description: "BE.STEAK.A is an American steakhouse with fine dining Italian roots. Founded by Chef/Owner Jeffrey Stout of Orchard City Kitchen. Chef Patrick Capurro runs the helm under Chef's Stouts watchful eye. BE.STEAK.A prides itself in lavish extravagant touches that invite the guest into a special kind of restaurant.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/51947013.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/51947010.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/51947007.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/51947011.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/51947009.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/3/52025315.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "be_steak_a",
                location_id: ottawaLocationId,
                cuisine_id: italianCuisineId,
            },

            {
                name: "Due Dieci",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/2/48774493.webp",
                price: PRICE.EXPENSIVE,
                description: "Due Dieci - established in 2022 by the five life-long partners of Dio Deka restaurant, known for its passion serving Michelin quality Greek food along with an award winning wine list. The recipes at Due Dieci are those of regional Italian tradition, revisited with the imagination of talented chef Nicko Moulinos.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/48920258.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/48774489.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/48920255.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/48920244.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/48774490.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/48920257.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "due_dieci",
                location_id: montrealLocationId,
                cuisine_id: italianCuisineId,
            },

            {
                name: "Cucina Venti",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/2/50687962.webp",
                price: PRICE.CHEAP,
                description: "Cucina Venti opened July 2007. Located next to Google headquarters, beautiful outdoor dining , elegant ambiance. cross street from century 16 in Mountain View. Cucina Venti features modern Italian dishes, Lamb Chops, Local organic produce, The freshest seafood, Hand crafted cocktails, and a wine list with a focus on California and Italian wines.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/25262790.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/25262802.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/24959478.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/25262786.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/50687907.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/50687895.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "cucina_venti",
                location_id: kingstonLocationId,
                cuisine_id: italianCuisineId,
            },

            {
                name: "Trattoria 360",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/6/26477976.webp",
                price: PRICE.REGULAR,
                description: "Owner Pino is originally from Bellagio, a beautiful town by Lake Como in Italy. With almost 40 years restaurant experience, he provides high quality signature dishes, along with attention to detail service to his customers.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/3/26485058.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/3/26485059.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/4/26485060.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/3/26485057.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/3/29654281.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/52075098.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "trattoria_360",
                location_id: hamiltonLocationId,
                cuisine_id: italianCuisineId,
            },

            {
                name: "Terra - Eataly Silicon Valley",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/2/49456260.webp",
                price: PRICE.EXPENSIVE,
                description: "Using local ingredients with Italian influences, Terra is Eataly’s premium wood-burning grill restaurant located on the third floor of Eataly Silicon Valley. Named for “earth’ in Italian, Terra's menu features the season’s best ingredients cooked simply over open flames. Its food meant to be paired with an inventive botanical cocktail and enjoyed outside on our expansive shaded patio.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/48342958.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/49456259.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/48342967.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/48342965.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/48342963.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/48342934.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "terra_eataly_silicon_valley",
                location_id: niagaraLocationId,
                cuisine_id: italianCuisineId,
            },

            // Chinese -----------------------------------------------------------
            {
                name: "iCHiNA",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/2/53808710.webp",
                price: PRICE.CHEAP,
                description: "iChina serves elevated Cantonese cuisine in the heart of Silicon Valley, using high quality and locally sourced ingredients. We showcase the art of dim sum, creating visually stunning delicacies by using ingredients and flavors representative of Cantonese culture.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/52758061.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/3/42723036.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/54229784.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/52589448.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/52589427.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/52589486.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "ichina",
                location_id: toronoLocationId,
                cuisine_id: chineseCuisineId,
            },

            {
                name: "Brochette and Dumpling Grill",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/2/53272258.webp",
                price: PRICE.REGULAR,
                description: "Coming Soon!",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/53272263.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/53272262.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/53272257.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/53272259.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/55456130.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/53272259.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "brochette_and_dumpling_grill",
                location_id: ottawaLocationId,
                cuisine_id: chineseCuisineId,
            },

            {
                name: "The Mandarin",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/2/42551967.webp",
                price: PRICE.EXPENSIVE,
                description: "Delicious, authentic Chinese cuisine in San Mateo County!",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/42551968.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/42551966.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/51985705.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/48529353.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/47016656.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/48529355.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "the_mandarin",
                location_id: montrealLocationId,
                cuisine_id: chineseCuisineId,
            },

            {
                name: "Crouching Tiger Restaurant",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/2/46909705.webp",
                price: PRICE.CHEAP,
                description: "The restaurant is located in downtown Redwood City, offering Authentic Sichuan, Hunan & Mandarin Cuisine. It was honored by Michelin with a Bib Gourmand, reserved for restaurants with high-quality food and good value. It was also reviewed by Mercury News for superior food and truly fine dining. It has received reward from Mayor's beautification recognition program.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/46909708.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/46909707.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/26897574.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/26374499.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/23713748.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/46909705.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "crouching_tiger_restaurant",
                location_id: kingstonLocationId,
                cuisine_id: chineseCuisineId,
            },

            {
                name: "Peony Seafood Restaurant",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/1/53032660.webp",
                price: PRICE.REGULAR,
                description: "Peony Seafood restaurant is a dim sum and seafood restaurant serving the Bay Area for over 20 years. It's located at the heart of Chinatown Oakland CA. Our professional chefs from Hong Kong provide an authentic experience with every traditional food they prepare - from mouthwatering BBQ pork buns to flavorful Peking duck. Our food isn't just great because it's finger-licking. We insist that everything at Peony Seafood Restaurant is made by hand only using original and fresh ingredients.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/53032671.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/53032652.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/53032662.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/53032675.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/53032682.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/53044584.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "peony_seafood_restaurant",
                location_id: hamiltonLocationId,
                cuisine_id: chineseCuisineId,
            },

            {
                name: "Uncle Yu's at the Vineyard",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/1/23368251.webp",
                price: PRICE.EXPENSIVE,
                description: "Currently, our back parking lot is under construction due to the development of Stockman's Park. Parking is limited, but the parking lot is still accessible from L Street, or Railroad Avenue. We also have a few designated parking spaces near our rear entrance, but if all of those spaces are full, there is also a parking garage on Railroad Avenue. We apologize in advance for any inconvenience!",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/23679725.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/51460129.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/51589947.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/51907778.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/54226725.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/47754611.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "uncle_yu's_at_the_vineyard",
                location_id: niagaraLocationId,
                cuisine_id: chineseCuisineId,
            },

            // Japanese -----------------------------------------------------------
            {
                name: "Dragon Horse",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/2/53880600.webp",
                price: PRICE.CHEAP,
                description: "Dragon Horse is an all-in-one destination in SoMa near Moscone Center with amazing sushi and fantastic handcrafted cocktails in a cozy, live and communal setting!",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/3/53880565.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/3/53880518.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/3/53880510.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/47573152.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/53880559.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/53880703.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "dragon_horse",
                location_id: toronoLocationId,
                cuisine_id: japaneseCuisineId,
            },

            {
                name: "Gyu-Kaku - San Jose",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/1/50182092.webp",
                price: PRICE.REGULAR,
                description: "Spending time with Friends and Family is what Gyu-Kaku is all about. Gyu-Kaku offers the fun of \"Shared Plates\" We want our food dining experience to inspire laughter, conversation, and amazing times! You can't help it - with a personal grill installed at every table, everyone instantly becomes an expert cook. Our friendly staff aspires to lead guests through the dining experience with helpful suggestions. The sounds around you are of parties and laughter - the PERFECT choice for first dates, families, and catching up with friends.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/50182093.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/49344933.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/49344913.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/50182087.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/47730910.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/47730909.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "gyu_kaku_san_jose",
                location_id: ottawaLocationId,
                cuisine_id: japaneseCuisineId,
            },

            {
                name: "Kyoto Palace Restaurant",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/3/32673661.webp",
                price: PRICE.EXPENSIVE,
                description: "We are located in The Pruneyard Shopping Center in Campbell on the second floor since 1976. Our main dining is teppanyaki where the chef chops, dices and tosses your food right before your eyes. It is a great spot to celebrate any and all special occasions or just a night out.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/3/32673672.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/27239879.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/3/32673674.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/50002700.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/25550674.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/50002686.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "kyoto_palace_restaurant",
                location_id: montrealLocationId,
                cuisine_id: japaneseCuisineId,
            },

            {
                name: "Ozumo Santana Row",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/2/47009055.webp",
                price: PRICE.CHEAP,
                description: "Ozumo Santana Row, San Jose is a Japanese Izakaya restaurant - which means numerous \"tapas\" style moderate portions to share, accompanied with a good cocktails or drinks, fun and good time. Bringing 20 years as San Francisco’s award winning restaurant to enjoy Japanese fine dining, or casual food or drinks - and lighter fare in the bar. Try our Japanese style beer garden.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/53033508.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/53033415.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/47009057.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/47009062.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/25544081.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/47009049.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "ozumo_santana_row",
                location_id: kingstonLocationId,
                cuisine_id: japaneseCuisineId,
            },

            {
                name: "Nobu Palo Alto",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/1/29841866.webp",
                price: PRICE.REGULAR,
                description: "Nobu Restaurants' now classic and seamless blend of Japanese and Peruvian food has officially made it’s way to the Bay Area. Here you may divulge in some of our signature world famous dishes like our Alaskan Black Cod, Yellowtail Sashimi Jalapeño, and Salmon Sashimi New Style just to name of few. Situated at the lobby floor of the Nobu Hotel, Epiphany we offer indoor and outdoor seating right in the heart of Palo Alto. Dine with us, stay with us.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/30184007.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/29495781.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/29495860.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/3/32676992.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/29495856.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/30183997.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "nobu_palo_alto",
                location_id: hamiltonLocationId,
                cuisine_id: japaneseCuisineId,
            },

            {
                name: "Sato Omakase",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/2/47495076.webp",
                price: PRICE.EXPENSIVE,
                description: "An invitation to our limited tranquil Omakase Sushi Bar area. Immerse yourself into an intimate experience with the chef and the exclusive drink service. Omakase begins at 5:00pm, 5:30pm, 7:30pm, and at 8:00pm.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/46844540.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/54276762.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/51089006.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/53540287.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/53319844.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/52139146.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "sato_omakase",
                location_id: niagaraLocationId,
                cuisine_id: japaneseCuisineId,
            },

            // Thai -----------------------------------------------------------
            {
                name: "Nahm",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/1/26010706.webp",
                price: PRICE.CHEAP,
                description: "For the last five years, nahm has consistently ranked in the top 10 restaurants in Asia in the annual San Pellegrino and Acqua Panna list. In 2017, nahm was once more awarded one of the guide's coveted Michelin stars, putting it among the top restaurants in Asia. Nahm emphasises the strong, fresh flavours of traditional Thai cuisine, headed by chef Pim Techamuanvivit.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/26010721.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/26010713.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/26010710.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/26010701.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/26010698.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/26010702.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "nahm",
                location_id: toronoLocationId,
                cuisine_id: thaiCuisineId,
            },

            {
                name: "Jim Thompson a Thai Restaurant",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/2/55489259.webp",
                price: PRICE.REGULAR,
                description: "We design our food offerings in the Thai way. Thais typically enjoy their meals family-style, with a variety of dishes placed in the centre of the table for everyone to share. Sharing is an integral aspect of Thai dining culture, fostering a sense of togetherness during meals.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/55175813.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/55489256.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/55489454.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/55489455.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/55489385.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/55175810.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "jim_thompson_a_thai_restaurant",
                location_id: ottawaLocationId,
                cuisine_id: thaiCuisineId,
            },

            {
                name: "Thara Thong",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/1/25346614.webp",
                price: PRICE.EXPENSIVE,
                description: "Thara Thong serves authentic Bangkok fare in a grand traditional setting. Dine at charming floor seating and low tables beneath an ornate hand-carved teakwood pavilion with large, handsomely dressed windows. The dining room and outdoor terrace overlook serene views of the legendary Chao Phraya River, while the gentle sound of live Thai classical music adds to the unique atmosphere. Located on First Floor, Royal Orchid Sheraton Hotel & Towers.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/25346615.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/25346618.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/25346617.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/25346616.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/52243680.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/54558709.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "thara_thong",
                location_id: montrealLocationId,
                cuisine_id: thaiCuisineId,
            },

            {
                name: "Flow Oasis Pool Lounge",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/2/47572554.webp",
                price: PRICE.CHEAP,
                description: "Set in a tropical garden and beside tranquil waters, our laidback pool lounge in Bangkok is the perfect place to unwind and enjoy everything from al fresco dining to cool cocktails be it in the day or at night.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/51788454.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/32265038.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/47572549.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/32265028.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/47572541.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/47572542.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "flow_oasis_pool_lounge",
                location_id: kingstonLocationId,
                cuisine_id: thaiCuisineId,
            },

            {
                name: "Front Room at Waldorf Astoria Bangkok",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/1/32265027.webp",
                price: PRICE.REGULAR,
                description: "Front Room offers a menu of authentic, home-style Thai cuisine which celebrates the eight distinctive Thai flavors of sour, sweet, nutty, salty, spicy, bitter, astringent and mild.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/51788455.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/51788452.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/51788456.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/47572540.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/32265024.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/32265035.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "front_room_at_waldorf_astoria_bangkok",
                location_id: hamiltonLocationId,
                cuisine_id: thaiCuisineId,
            },

            {
                name: "Casia",
                main_image: "https://resizer.otstatic.com/v2/photos/xlarge/2/47572540.webp",
                price: PRICE.EXPENSIVE,
                description: "Tantalise your tastebuds with refined tasting menus and a connoisseur-curated wine list at our signature dining restaurant on the 7th floor. Expect classic French Mediterranean dishes with a contemporary twist and some of the world’s finest wines in a chic and stylish setting.",
                images: [
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/32265036.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/47572551.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/51788457.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/32265039.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/2/51788453.webp",
                    "https://resizer.otstatic.com/v2/photos/xlarge/1/32265026.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "casia",
                location_id: niagaraLocationId,
                cuisine_id: thaiCuisineId,
            },
        ]
    })

    console.log("Finished initializing restaurant table.")

    const restaurants = await prisma.restaurant.findMany()
    const puestoId = restaurants.find((restaurant) => restaurant.name === "Puesto Santa Clara")?.id || 1
    const mezcalId = restaurants.find((restaurant) => restaurant.name === "Mezcal")?.id || 1
    const distritoId = restaurants.find((restaurant) => restaurant.name === "Distrito Federal")?.id || 1
    const mexicoLindoId = restaurants.find((restaurant) => restaurant.name === "Mexico Lindo - San Jose")?.id || 1
    const reposadoId = restaurants.find((restaurant) => restaurant.name === "Reposado Restaurant")?.id || 1
    const tostadasId = restaurants.find((restaurant) => restaurant.name === "Tostadas Prime")?.id || 1
    const grandViewId = restaurants.find((restaurant) => restaurant.name === "Grand View")?.id || 1
    const bSteakAId = restaurants.find((restaurant) => restaurant.name === "BE.STEAK.A")?.id || 1
    const dueDieciId = restaurants.find((restaurant) => restaurant.name === "Due Dieci")?.id || 1
    const cucinaId = restaurants.find((restaurant) => restaurant.name === "Cucina Venti")?.id || 1
    const trattotiaId = restaurants.find((restaurant) => restaurant.name === "Trattoria 360")?.id || 1
    const terraId = restaurants.find((restaurant) => restaurant.name === "Terra - Eataly Silicon Valley")?.id || 1
    const iChinaId = restaurants.find((restaurant) => restaurant.name === "iCHiNA")?.id || 1
    const brochetteId = restaurants.find((restaurant) => restaurant.name === "Brochette and Dumpling Grill")?.id || 1
    const theMandarinId = restaurants.find((restaurant) => restaurant.name === "The Mandarin")?.id || 1
    const crouchingId = restaurants.find((restaurant) => restaurant.name === "Crouching Tiger Restaurant")?.id || 1
    const peonyId = restaurants.find((restaurant) => restaurant.name === "Peony Seafood Restaurant")?.id || 1
    const uncleYuId = restaurants.find((restaurant) => restaurant.name === "Uncle Yu's at the Vineyard")?.id || 1
    const dragonHorseId = restaurants.find((restaurant) => restaurant.name === "Dragon Horse")?.id || 1
    const gyuKakuId = restaurants.find((restaurant) => restaurant.name === "Gyu-Kaku - San Jose")?.id || 1
    const kyptoId = restaurants.find((restaurant) => restaurant.name === "Kyoto Palace Restaurant")?.id || 1
    const ozumoId = restaurants.find((restaurant) => restaurant.name === "Ozumo Santana Row")?.id || 1
    const nobuId = restaurants.find((restaurant) => restaurant.name === "Nobu Palo Alto")?.id || 1
    const satoId = restaurants.find((restaurant) => restaurant.name === "Sato Omakase")?.id || 1
    const nahmId = restaurants.find((restaurant) => restaurant.name === "Nahm")?.id || 1
    const jimId = restaurants.find((restaurant) => restaurant.name === "Jim Thompson a Thai Restaurant")?.id || 1
    const tharaId = restaurants.find((restaurant) => restaurant.name === "Thara Thong")?.id || 1
    const flowOasisId = restaurants.find((restaurant) => restaurant.name === "Flow Oasis Pool Lounge")?.id || 1
    const frontRoomId = restaurants.find((restaurant) => restaurant.name === "Front Room at Waldorf Astoria Bangkok")?.id || 1
    const casiaId = restaurants.find((restaurant) => restaurant.name === "Casia")?.id || 1

    await prisma.item.createMany({
        data: [
            // puestoId
            {
                name: "Nachos",
                description: "Corn chips topped with cheese and mild sauce, served with guacamole and sour cream",
                price: "$7.99",
                restaurant_id: puestoId
            },
            {
                name: "Quesadillas",
                description: "Grilled flour tortillas filled with cheese, mild green chiles, served with guacamole and sour cream",
                price: "$10.99",
                restaurant_id: puestoId
            },
            {
                name: "Jalapeño Poppers",
                description: "Deep fried breaded jalapeño peppers stuffed with cream cheese, served with pepper cream dressing",
                price: "$8.99",
                restaurant_id: puestoId
            },
            {
                name: "Chicken Wings",
                description: "Deep fried breaded chicken wings, served with pepper cream dressing",
                price: "$9.99",
                restaurant_id: puestoId
            },
            {
                name: "Guacamole",
                description: "A smooth blend of avocado, tomato, onion and cilantro, served in crispy flour tortilla shell",
                price: "$11.99",
                restaurant_id: puestoId
            },
            {
                name: "Ensalada Cancún",
                description: "Shrimp, Crab, fresh lettuce, tomatoes, bell peppers, avocado, olives, cheese and a choice of dressing",
                price: "$16.99",
                restaurant_id: puestoId
            },
            {
                name: "Ensalada Especial",
                description: "Sliced avocado, tomatoes, bell peppers, olives, cheese, fresh lettuce and a choice of dressing",
                price: "$9.99",
                restaurant_id: puestoId
            },
            {
                name: "Tradicionales",
                description: "Two corn tortillas filled with your choice of Beef, Chicken or Cheese. Covered with a mild red chili sauce and cheese",
                price: "$17.99",
                restaurant_id: puestoId
            },
            //mezcalId
            {
                name: "Nachos",
                description: "Corn chips topped with cheese and mild sauce, served with guacamole and sour cream",
                price: "$7.99",
                restaurant_id: mezcalId
            },
            {
                name: "Quesadillas",
                description: "Grilled flour tortillas filled with cheese, mild green chiles, served with guacamole and sour cream",
                price: "$10.99",
                restaurant_id: mezcalId
            },
            {
                name: "Jalapeño Poppers",
                description: "Deep fried breaded jalapeño peppers stuffed with cream cheese, served with pepper cream dressing",
                price: "$8.99",
                restaurant_id: mezcalId
            },
            {
                name: "Chicken Wings",
                description: "Deep fried breaded chicken wings, served with pepper cream dressing",
                price: "$9.99",
                restaurant_id: mezcalId
            },
            {
                name: "Guacamole",
                description: "A smooth blend of avocado, tomato, onion and cilantro, served in crispy flour tortilla shell",
                price: "$11.99",
                restaurant_id: mezcalId
            },
            {
                name: "Ensalada Cancún",
                description: "Shrimp, Crab, fresh lettuce, tomatoes, bell peppers, avocado, olives, cheese and a choice of dressing",
                price: "$16.99",
                restaurant_id: mezcalId
            },
            {
                name: "Ensalada Especial",
                description: "Sliced avocado, tomatoes, bell peppers, olives, cheese, fresh lettuce and a choice of dressing",
                price: "$9.99",
                restaurant_id: mezcalId
            },
            {
                name: "Tradicionales",
                description: "Two corn tortillas filled with your choice of Beef, Chicken or Cheese. Covered with a mild red chili sauce and cheese",
                price: "$17.99",
                restaurant_id: mezcalId
            },
            //distritoId
            {
                name: "Nachos",
                description: "Corn chips topped with cheese and mild sauce, served with guacamole and sour cream",
                price: "$7.99",
                restaurant_id: distritoId
            },
            {
                name: "Quesadillas",
                description: "Grilled flour tortillas filled with cheese, mild green chiles, served with guacamole and sour cream",
                price: "$10.99",
                restaurant_id: distritoId
            },
            {
                name: "Jalapeño Poppers",
                description: "Deep fried breaded jalapeño peppers stuffed with cream cheese, served with pepper cream dressing",
                price: "$8.99",
                restaurant_id: distritoId
            },
            {
                name: "Chicken Wings",
                description: "Deep fried breaded chicken wings, served with pepper cream dressing",
                price: "$9.99",
                restaurant_id: distritoId
            },
            {
                name: "Guacamole",
                description: "A smooth blend of avocado, tomato, onion and cilantro, served in crispy flour tortilla shell",
                price: "$11.99",
                restaurant_id: distritoId
            },
            {
                name: "Ensalada Cancún",
                description: "Shrimp, Crab, fresh lettuce, tomatoes, bell peppers, avocado, olives, cheese and a choice of dressing",
                price: "$16.99",
                restaurant_id: distritoId
            },
            {
                name: "Ensalada Especial",
                description: "Sliced avocado, tomatoes, bell peppers, olives, cheese, fresh lettuce and a choice of dressing",
                price: "$9.99",
                restaurant_id: distritoId
            },
            {
                name: "Tradicionales",
                description: "Two corn tortillas filled with your choice of Beef, Chicken or Cheese. Covered with a mild red chili sauce and cheese",
                price: "$17.99",
                restaurant_id: distritoId
            },
            //mexicoLindoId
            {
                name: "Nachos",
                description: "Corn chips topped with cheese and mild sauce, served with guacamole and sour cream",
                price: "$7.99",
                restaurant_id: mexicoLindoId
            },
            {
                name: "Quesadillas",
                description: "Grilled flour tortillas filled with cheese, mild green chiles, served with guacamole and sour cream",
                price: "$10.99",
                restaurant_id: mexicoLindoId
            },
            {
                name: "Jalapeño Poppers",
                description: "Deep fried breaded jalapeño peppers stuffed with cream cheese, served with pepper cream dressing",
                price: "$8.99",
                restaurant_id: mexicoLindoId
            },
            {
                name: "Chicken Wings",
                description: "Deep fried breaded chicken wings, served with pepper cream dressing",
                price: "$9.99",
                restaurant_id: mexicoLindoId
            },
            {
                name: "Guacamole",
                description: "A smooth blend of avocado, tomato, onion and cilantro, served in crispy flour tortilla shell",
                price: "$11.99",
                restaurant_id: mexicoLindoId
            },
            {
                name: "Ensalada Cancún",
                description: "Shrimp, Crab, fresh lettuce, tomatoes, bell peppers, avocado, olives, cheese and a choice of dressing",
                price: "$16.99",
                restaurant_id: mexicoLindoId
            },
            {
                name: "Ensalada Especial",
                description: "Sliced avocado, tomatoes, bell peppers, olives, cheese, fresh lettuce and a choice of dressing",
                price: "$9.99",
                restaurant_id: mexicoLindoId
            },
            {
                name: "Tradicionales",
                description: "Two corn tortillas filled with your choice of Beef, Chicken or Cheese. Covered with a mild red chili sauce and cheese",
                price: "$17.99",
                restaurant_id: mexicoLindoId
            },
            //reposadoId
            {
                name: "Nachos",
                description: "Corn chips topped with cheese and mild sauce, served with guacamole and sour cream",
                price: "$7.99",
                restaurant_id: reposadoId
            },
            {
                name: "Quesadillas",
                description: "Grilled flour tortillas filled with cheese, mild green chiles, served with guacamole and sour cream",
                price: "$10.99",
                restaurant_id: reposadoId
            },
            {
                name: "Jalapeño Poppers",
                description: "Deep fried breaded jalapeño peppers stuffed with cream cheese, served with pepper cream dressing",
                price: "$8.99",
                restaurant_id: reposadoId
            },
            {
                name: "Chicken Wings",
                description: "Deep fried breaded chicken wings, served with pepper cream dressing",
                price: "$9.99",
                restaurant_id: reposadoId
            },
            {
                name: "Guacamole",
                description: "A smooth blend of avocado, tomato, onion and cilantro, served in crispy flour tortilla shell",
                price: "$11.99",
                restaurant_id: reposadoId
            },
            {
                name: "Ensalada Cancún",
                description: "Shrimp, Crab, fresh lettuce, tomatoes, bell peppers, avocado, olives, cheese and a choice of dressing",
                price: "$16.99",
                restaurant_id: reposadoId
            },
            {
                name: "Ensalada Especial",
                description: "Sliced avocado, tomatoes, bell peppers, olives, cheese, fresh lettuce and a choice of dressing",
                price: "$9.99",
                restaurant_id: reposadoId
            },
            {
                name: "Tradicionales",
                description: "Two corn tortillas filled with your choice of Beef, Chicken or Cheese. Covered with a mild red chili sauce and cheese",
                price: "$17.99",
                restaurant_id: reposadoId
            },
            //tostadasId
            {
                name: "Nachos",
                description: "Corn chips topped with cheese and mild sauce, served with guacamole and sour cream",
                price: "$7.99",
                restaurant_id: tostadasId
            },
            {
                name: "Quesadillas",
                description: "Grilled flour tortillas filled with cheese, mild green chiles, served with guacamole and sour cream",
                price: "$10.99",
                restaurant_id: tostadasId
            },
            {
                name: "Jalapeño Poppers",
                description: "Deep fried breaded jalapeño peppers stuffed with cream cheese, served with pepper cream dressing",
                price: "$8.99",
                restaurant_id: tostadasId
            },
            {
                name: "Chicken Wings",
                description: "Deep fried breaded chicken wings, served with pepper cream dressing",
                price: "$9.99",
                restaurant_id: tostadasId
            },
            {
                name: "Guacamole",
                description: "A smooth blend of avocado, tomato, onion and cilantro, served in crispy flour tortilla shell",
                price: "$11.99",
                restaurant_id: tostadasId
            },
            {
                name: "Ensalada Cancún",
                description: "Shrimp, Crab, fresh lettuce, tomatoes, bell peppers, avocado, olives, cheese and a choice of dressing",
                price: "$16.99",
                restaurant_id: tostadasId
            },
            {
                name: "Ensalada Especial",
                description: "Sliced avocado, tomatoes, bell peppers, olives, cheese, fresh lettuce and a choice of dressing",
                price: "$9.99",
                restaurant_id: tostadasId
            },
            {
                name: "Tradicionales",
                description: "Two corn tortillas filled with your choice of Beef, Chicken or Cheese. Covered with a mild red chili sauce and cheese",
                price: "$17.99",
                restaurant_id: tostadasId
            },
            //grandViewId
            {
                name: "Thats One Spicy Meatball",
                description: "calabrian chili-tomato sauce, fennel pollen",
                price: "$6.00",
                restaurant_id: grandViewId
            },
            {
                name: "Steak Tartare",
                description: "hand cut, quail yolk, little gem, chili",
                price: "$29.00",
                restaurant_id: grandViewId
            },
            {
                name: "Pan Roasted Scallops",
                description: "nettle porridge, fava, charred green olive, lemon",
                price: "$32.00",
                restaurant_id: grandViewId
            },
            {
                name: "Dungeness Crab Dip",
                description: "garlic crumbs, mixed fry of artichokes and vegetables",
                price: "$36.00",
                restaurant_id: grandViewId
            },
            {
                name: "Bone Marrow Workshop",
                description: "sauce bordelaise, fettunta, three embellishments",
                price: "$85.00",
                restaurant_id: grandViewId
            },
            {
                name: "Lobster Tagliolini",
                description: "pernod, endive, crème fraïche, togarashi",
                price: "$44.00",
                restaurant_id: grandViewId
            },
            {
                name: "Carbonara",
                description: "rigatoni pasta, guanciale, pecorino romano, english peas, cracked black pepper",
                price: "$28.00",
                restaurant_id: grandViewId
            },
            {
                name: "Gnudi",
                description: "free form ricotta dumplings, white wine-butter sauce, siberian caviar",
                price: "$58.00",
                restaurant_id: grandViewId
            },
            //bSteakAId
            {
                name: "Thats One Spicy Meatball",
                description: "calabrian chili-tomato sauce, fennel pollen",
                price: "$6.00",
                restaurant_id: bSteakAId
            },
            {
                name: "Steak Tartare",
                description: "hand cut, quail yolk, little gem, chili",
                price: "$29.00",
                restaurant_id: bSteakAId
            },
            {
                name: "Pan Roasted Scallops",
                description: "nettle porridge, fava, charred green olive, lemon",
                price: "$32.00",
                restaurant_id: bSteakAId
            },
            {
                name: "Dungeness Crab Dip",
                description: "garlic crumbs, mixed fry of artichokes and vegetables",
                price: "$36.00",
                restaurant_id: bSteakAId
            },
            {
                name: "Bone Marrow Workshop",
                description: "sauce bordelaise, fettunta, three embellishments",
                price: "$85.00",
                restaurant_id: bSteakAId
            },
            {
                name: "Lobster Tagliolini",
                description: "pernod, endive, crème fraïche, togarashi",
                price: "$44.00",
                restaurant_id: bSteakAId
            },
            {
                name: "Carbonara",
                description: "rigatoni pasta, guanciale, pecorino romano, english peas, cracked black pepper",
                price: "$28.00",
                restaurant_id: bSteakAId
            },
            {
                name: "Gnudi",
                description: "free form ricotta dumplings, white wine-butter sauce, siberian caviar",
                price: "$58.00",
                restaurant_id: bSteakAId
            },
            //dueDieciId
            {
                name: "Thats One Spicy Meatball",
                description: "calabrian chili-tomato sauce, fennel pollen",
                price: "$6.00",
                restaurant_id: dueDieciId
            },
            {
                name: "Steak Tartare",
                description: "hand cut, quail yolk, little gem, chili",
                price: "$29.00",
                restaurant_id: dueDieciId
            },
            {
                name: "Pan Roasted Scallops",
                description: "nettle porridge, fava, charred green olive, lemon",
                price: "$32.00",
                restaurant_id: dueDieciId
            },
            {
                name: "Dungeness Crab Dip",
                description: "garlic crumbs, mixed fry of artichokes and vegetables",
                price: "$36.00",
                restaurant_id: dueDieciId
            },
            {
                name: "Bone Marrow Workshop",
                description: "sauce bordelaise, fettunta, three embellishments",
                price: "$85.00",
                restaurant_id: dueDieciId
            },
            {
                name: "Lobster Tagliolini",
                description: "pernod, endive, crème fraïche, togarashi",
                price: "$44.00",
                restaurant_id: dueDieciId
            },
            {
                name: "Carbonara",
                description: "rigatoni pasta, guanciale, pecorino romano, english peas, cracked black pepper",
                price: "$28.00",
                restaurant_id: dueDieciId
            },
            {
                name: "Gnudi",
                description: "free form ricotta dumplings, white wine-butter sauce, siberian caviar",
                price: "$58.00",
                restaurant_id: dueDieciId
            },
            //cucinaId
            {
                name: "Thats One Spicy Meatball",
                description: "calabrian chili-tomato sauce, fennel pollen",
                price: "$6.00",
                restaurant_id: cucinaId
            },
            {
                name: "Steak Tartare",
                description: "hand cut, quail yolk, little gem, chili",
                price: "$29.00",
                restaurant_id: cucinaId
            },
            {
                name: "Pan Roasted Scallops",
                description: "nettle porridge, fava, charred green olive, lemon",
                price: "$32.00",
                restaurant_id: cucinaId
            },
            {
                name: "Dungeness Crab Dip",
                description: "garlic crumbs, mixed fry of artichokes and vegetables",
                price: "$36.00",
                restaurant_id: cucinaId
            },
            {
                name: "Bone Marrow Workshop",
                description: "sauce bordelaise, fettunta, three embellishments",
                price: "$85.00",
                restaurant_id: cucinaId
            },
            {
                name: "Lobster Tagliolini",
                description: "pernod, endive, crème fraïche, togarashi",
                price: "$44.00",
                restaurant_id: cucinaId
            },
            {
                name: "Carbonara",
                description: "rigatoni pasta, guanciale, pecorino romano, english peas, cracked black pepper",
                price: "$28.00",
                restaurant_id: cucinaId
            },
            {
                name: "Gnudi",
                description: "free form ricotta dumplings, white wine-butter sauce, siberian caviar",
                price: "$58.00",
                restaurant_id: cucinaId
            },
            //trattotiaId
            {
                name: "Thats One Spicy Meatball",
                description: "calabrian chili-tomato sauce, fennel pollen",
                price: "$6.00",
                restaurant_id: trattotiaId
            },
            {
                name: "Steak Tartare",
                description: "hand cut, quail yolk, little gem, chili",
                price: "$29.00",
                restaurant_id: trattotiaId
            },
            {
                name: "Pan Roasted Scallops",
                description: "nettle porridge, fava, charred green olive, lemon",
                price: "$32.00",
                restaurant_id: trattotiaId
            },
            {
                name: "Dungeness Crab Dip",
                description: "garlic crumbs, mixed fry of artichokes and vegetables",
                price: "$36.00",
                restaurant_id: trattotiaId
            },
            {
                name: "Bone Marrow Workshop",
                description: "sauce bordelaise, fettunta, three embellishments",
                price: "$85.00",
                restaurant_id: trattotiaId
            },
            {
                name: "Lobster Tagliolini",
                description: "pernod, endive, crème fraïche, togarashi",
                price: "$44.00",
                restaurant_id: trattotiaId
            },
            {
                name: "Carbonara",
                description: "rigatoni pasta, guanciale, pecorino romano, english peas, cracked black pepper",
                price: "$28.00",
                restaurant_id: trattotiaId
            },
            {
                name: "Gnudi",
                description: "free form ricotta dumplings, white wine-butter sauce, siberian caviar",
                price: "$58.00",
                restaurant_id: trattotiaId
            },
            //terraId
            {
                name: "Thats One Spicy Meatball",
                description: "calabrian chili-tomato sauce, fennel pollen",
                price: "$6.00",
                restaurant_id: terraId
            },
            {
                name: "Steak Tartare",
                description: "hand cut, quail yolk, little gem, chili",
                price: "$29.00",
                restaurant_id: terraId
            },
            {
                name: "Pan Roasted Scallops",
                description: "nettle porridge, fava, charred green olive, lemon",
                price: "$32.00",
                restaurant_id: terraId
            },
            {
                name: "Dungeness Crab Dip",
                description: "garlic crumbs, mixed fry of artichokes and vegetables",
                price: "$36.00",
                restaurant_id: terraId
            },
            {
                name: "Bone Marrow Workshop",
                description: "sauce bordelaise, fettunta, three embellishments",
                price: "$85.00",
                restaurant_id: terraId
            },
            {
                name: "Lobster Tagliolini",
                description: "pernod, endive, crème fraïche, togarashi",
                price: "$44.00",
                restaurant_id: terraId
            },
            {
                name: "Carbonara",
                description: "rigatoni pasta, guanciale, pecorino romano, english peas, cracked black pepper",
                price: "$28.00",
                restaurant_id: terraId
            },
            {
                name: "Gnudi",
                description: "free form ricotta dumplings, white wine-butter sauce, siberian caviar",
                price: "$58.00",
                restaurant_id: terraId
            },


            //iChinaId
            {
                name: "Steamed Dim Sum Collection",
                description: "har gow | scallop siu mai | chinese chive dumpling",
                price: "$15.00",
                restaurant_id: iChinaId
            },
            {
                name: "Squid Dumplings",
                description: "red chili | scallion ginger oil",
                price: "$12.00",
                restaurant_id: iChinaId
            },
            {
                name: "Soft Shell Crab Salad",
                description: "green apples | wasabi apple dressing",
                price: "$16.00",
                restaurant_id: iChinaId
            },
            {
                name: "Roasted Duck & Pumpkin Dumplings",
                description: "snow cabbage | cloud ear mushrooms",
                price: "$16.00",
                restaurant_id: iChinaId
            },
            {
                name: "Crispy Wagyu Puff",
                description: "onions | shiitake mushrooms",
                price: "$20.00",
                restaurant_id: iChinaId
            },
            {
                name: "Stir-Fried Black Pepper Beef Tenderloin",
                description: "onions | merlot sauce | crispy noodles (served cooked to order)",
                price: "$38.00",
                restaurant_id: iChinaId
            },
            {
                name: "X.O. Wok Fried Rice Rolls",
                description: "x.o. sauce | prawns | scallops | chinese chives | bean sprouts | egg",
                price: "$28.00",
                restaurant_id: iChinaId
            },
            {
                name: "South East Asia Seafood Noodles",
                description: "prawns | chicken | green onions | red chili | dried scallions | laksa sauce",
                price: "$25.00",
                restaurant_id: iChinaId
            },
            //brochetteId
            {
                name: "Steamed Dim Sum Collection",
                description: "har gow | scallop siu mai | chinese chive dumpling",
                price: "$15.00",
                restaurant_id: brochetteId
            },
            {
                name: "Squid Dumplings",
                description: "red chili | scallion ginger oil",
                price: "$12.00",
                restaurant_id: brochetteId
            },
            {
                name: "Soft Shell Crab Salad",
                description: "green apples | wasabi apple dressing",
                price: "$16.00",
                restaurant_id: brochetteId
            },
            {
                name: "Roasted Duck & Pumpkin Dumplings",
                description: "snow cabbage | cloud ear mushrooms",
                price: "$16.00",
                restaurant_id: brochetteId
            },
            {
                name: "Crispy Wagyu Puff",
                description: "onions | shiitake mushrooms",
                price: "$20.00",
                restaurant_id: brochetteId
            },
            {
                name: "Stir-Fried Black Pepper Beef Tenderloin",
                description: "onions | merlot sauce | crispy noodles (served cooked to order)",
                price: "$38.00",
                restaurant_id: brochetteId
            },
            {
                name: "X.O. Wok Fried Rice Rolls",
                description: "x.o. sauce | prawns | scallops | chinese chives | bean sprouts | egg",
                price: "$28.00",
                restaurant_id: brochetteId
            },
            {
                name: "South East Asia Seafood Noodles",
                description: "prawns | chicken | green onions | red chili | dried scallions | laksa sauce",
                price: "$25.00",
                restaurant_id: brochetteId
            },
            //theMandarinId
            {
                name: "Steamed Dim Sum Collection",
                description: "har gow | scallop siu mai | chinese chive dumpling",
                price: "$15.00",
                restaurant_id: theMandarinId
            },
            {
                name: "Squid Dumplings",
                description: "red chili | scallion ginger oil",
                price: "$12.00",
                restaurant_id: theMandarinId
            },
            {
                name: "Soft Shell Crab Salad",
                description: "green apples | wasabi apple dressing",
                price: "$16.00",
                restaurant_id: theMandarinId
            },
            {
                name: "Roasted Duck & Pumpkin Dumplings",
                description: "snow cabbage | cloud ear mushrooms",
                price: "$16.00",
                restaurant_id: theMandarinId
            },
            {
                name: "Crispy Wagyu Puff",
                description: "onions | shiitake mushrooms",
                price: "$20.00",
                restaurant_id: theMandarinId
            },
            {
                name: "Stir-Fried Black Pepper Beef Tenderloin",
                description: "onions | merlot sauce | crispy noodles (served cooked to order)",
                price: "$38.00",
                restaurant_id: theMandarinId
            },
            {
                name: "X.O. Wok Fried Rice Rolls",
                description: "x.o. sauce | prawns | scallops | chinese chives | bean sprouts | egg",
                price: "$28.00",
                restaurant_id: theMandarinId
            },
            {
                name: "South East Asia Seafood Noodles",
                description: "prawns | chicken | green onions | red chili | dried scallions | laksa sauce",
                price: "$25.00",
                restaurant_id: theMandarinId
            },
            //crouchingId
            {
                name: "Steamed Dim Sum Collection",
                description: "har gow | scallop siu mai | chinese chive dumpling",
                price: "$15.00",
                restaurant_id: crouchingId
            },
            {
                name: "Squid Dumplings",
                description: "red chili | scallion ginger oil",
                price: "$12.00",
                restaurant_id: crouchingId
            },
            {
                name: "Soft Shell Crab Salad",
                description: "green apples | wasabi apple dressing",
                price: "$16.00",
                restaurant_id: crouchingId
            },
            {
                name: "Roasted Duck & Pumpkin Dumplings",
                description: "snow cabbage | cloud ear mushrooms",
                price: "$16.00",
                restaurant_id: crouchingId
            },
            {
                name: "Crispy Wagyu Puff",
                description: "onions | shiitake mushrooms",
                price: "$20.00",
                restaurant_id: crouchingId
            },
            {
                name: "Stir-Fried Black Pepper Beef Tenderloin",
                description: "onions | merlot sauce | crispy noodles (served cooked to order)",
                price: "$38.00",
                restaurant_id: crouchingId
            },
            {
                name: "X.O. Wok Fried Rice Rolls",
                description: "x.o. sauce | prawns | scallops | chinese chives | bean sprouts | egg",
                price: "$28.00",
                restaurant_id: crouchingId
            },
            {
                name: "South East Asia Seafood Noodles",
                description: "prawns | chicken | green onions | red chili | dried scallions | laksa sauce",
                price: "$25.00",
                restaurant_id: crouchingId
            },
            //peonyId
            {
                name: "Steamed Dim Sum Collection",
                description: "har gow | scallop siu mai | chinese chive dumpling",
                price: "$15.00",
                restaurant_id: peonyId
            },
            {
                name: "Squid Dumplings",
                description: "red chili | scallion ginger oil",
                price: "$12.00",
                restaurant_id: peonyId
            },
            {
                name: "Soft Shell Crab Salad",
                description: "green apples | wasabi apple dressing",
                price: "$16.00",
                restaurant_id: peonyId
            },
            {
                name: "Roasted Duck & Pumpkin Dumplings",
                description: "snow cabbage | cloud ear mushrooms",
                price: "$16.00",
                restaurant_id: peonyId
            },
            {
                name: "Crispy Wagyu Puff",
                description: "onions | shiitake mushrooms",
                price: "$20.00",
                restaurant_id: peonyId
            },
            {
                name: "Stir-Fried Black Pepper Beef Tenderloin",
                description: "onions | merlot sauce | crispy noodles (served cooked to order)",
                price: "$38.00",
                restaurant_id: peonyId
            },
            {
                name: "X.O. Wok Fried Rice Rolls",
                description: "x.o. sauce | prawns | scallops | chinese chives | bean sprouts | egg",
                price: "$28.00",
                restaurant_id: peonyId
            },
            {
                name: "South East Asia Seafood Noodles",
                description: "prawns | chicken | green onions | red chili | dried scallions | laksa sauce",
                price: "$25.00",
                restaurant_id: peonyId
            },
            //uncleYuId
            {
                name: "Steamed Dim Sum Collection",
                description: "har gow | scallop siu mai | chinese chive dumpling",
                price: "$15.00",
                restaurant_id: uncleYuId
            },
            {
                name: "Squid Dumplings",
                description: "red chili | scallion ginger oil",
                price: "$12.00",
                restaurant_id: uncleYuId
            },
            {
                name: "Soft Shell Crab Salad",
                description: "green apples | wasabi apple dressing",
                price: "$16.00",
                restaurant_id: uncleYuId
            },
            {
                name: "Roasted Duck & Pumpkin Dumplings",
                description: "snow cabbage | cloud ear mushrooms",
                price: "$16.00",
                restaurant_id: uncleYuId
            },
            {
                name: "Crispy Wagyu Puff",
                description: "onions | shiitake mushrooms",
                price: "$20.00",
                restaurant_id: uncleYuId
            },
            {
                name: "Stir-Fried Black Pepper Beef Tenderloin",
                description: "onions | merlot sauce | crispy noodles (served cooked to order)",
                price: "$38.00",
                restaurant_id: uncleYuId
            },
            {
                name: "X.O. Wok Fried Rice Rolls",
                description: "x.o. sauce | prawns | scallops | chinese chives | bean sprouts | egg",
                price: "$28.00",
                restaurant_id: uncleYuId
            },
            {
                name: "South East Asia Seafood Noodles",
                description: "prawns | chicken | green onions | red chili | dried scallions | laksa sauce",
                price: "$25.00",
                restaurant_id: uncleYuId
            },

            //dragonHorseId
            {
                name: "Shishito",
                description: "grilled shishito peppers, ponzu, katsuobushi",
                price: "$14.00",
                restaurant_id: dragonHorseId
            },
            {
                name: "Kinoko",
                description: "roasted king trumpet mushrooms, garlic soy, chives",
                price: "$14.00",
                restaurant_id: dragonHorseId
            },
            {
                name: "Nasu",
                description: "grilled eggplant, sansho tare, wadaman togarashi, chives",
                price: "$14.00",
                restaurant_id: dragonHorseId
            },
            {
                name: "Sayamame",
                description: "blistered green beans, nori pesto, crispy leeks",
                price: "$14.00",
                restaurant_id: dragonHorseId
            },
            {
                name: "Gindara",
                description: "saikyo miso & sake kasu marinated grilled black cod",
                price: "$32.00",
                restaurant_id: dragonHorseId
            },
            {
                name: "Tokyo Gyu",
                description: "8 oz australian wagyu ribeye, miso mustard, sancho tare, matcha salt",
                price: "$44.00",
                restaurant_id: dragonHorseId
            },
            {
                name: "Katsu Sando",
                description: "panko-breaded llano seco pork, karashi mustard, tonkatsu sauce, japanese milk bread",
                price: "$24.00",
                restaurant_id: dragonHorseId
            },
            {
                name: "Chirashi",
                description: "tuna, salmon, hamachi, botan ebi, hotate, ikura, tamago",
                price: "$32.00",
                restaurant_id: dragonHorseId
            },
            //gyuKakuId
            {
                name: "Shishito",
                description: "grilled shishito peppers, ponzu, katsuobushi",
                price: "$14.00",
                restaurant_id: gyuKakuId
            },
            {
                name: "Kinoko",
                description: "roasted king trumpet mushrooms, garlic soy, chives",
                price: "$14.00",
                restaurant_id: gyuKakuId
            },
            {
                name: "Nasu",
                description: "grilled eggplant, sansho tare, wadaman togarashi, chives",
                price: "$14.00",
                restaurant_id: gyuKakuId
            },
            {
                name: "Sayamame",
                description: "blistered green beans, nori pesto, crispy leeks",
                price: "$14.00",
                restaurant_id: gyuKakuId
            },
            {
                name: "Gindara",
                description: "saikyo miso & sake kasu marinated grilled black cod",
                price: "$32.00",
                restaurant_id: gyuKakuId
            },
            {
                name: "Tokyo Gyu",
                description: "8 oz australian wagyu ribeye, miso mustard, sancho tare, matcha salt",
                price: "$44.00",
                restaurant_id: gyuKakuId
            },
            {
                name: "Katsu Sando",
                description: "panko-breaded llano seco pork, karashi mustard, tonkatsu sauce, japanese milk bread",
                price: "$24.00",
                restaurant_id: gyuKakuId
            },
            {
                name: "Chirashi",
                description: "tuna, salmon, hamachi, botan ebi, hotate, ikura, tamago",
                price: "$32.00",
                restaurant_id: gyuKakuId
            },
            //kyptoId
            {
                name: "Shishito",
                description: "grilled shishito peppers, ponzu, katsuobushi",
                price: "$14.00",
                restaurant_id: kyptoId
            },
            {
                name: "Kinoko",
                description: "roasted king trumpet mushrooms, garlic soy, chives",
                price: "$14.00",
                restaurant_id: kyptoId
            },
            {
                name: "Nasu",
                description: "grilled eggplant, sansho tare, wadaman togarashi, chives",
                price: "$14.00",
                restaurant_id: kyptoId
            },
            {
                name: "Sayamame",
                description: "blistered green beans, nori pesto, crispy leeks",
                price: "$14.00",
                restaurant_id: kyptoId
            },
            {
                name: "Gindara",
                description: "saikyo miso & sake kasu marinated grilled black cod",
                price: "$32.00",
                restaurant_id: kyptoId
            },
            {
                name: "Tokyo Gyu",
                description: "8 oz australian wagyu ribeye, miso mustard, sancho tare, matcha salt",
                price: "$44.00",
                restaurant_id: kyptoId
            },
            {
                name: "Katsu Sando",
                description: "panko-breaded llano seco pork, karashi mustard, tonkatsu sauce, japanese milk bread",
                price: "$24.00",
                restaurant_id: kyptoId
            },
            {
                name: "Chirashi",
                description: "tuna, salmon, hamachi, botan ebi, hotate, ikura, tamago",
                price: "$32.00",
                restaurant_id: kyptoId
            },
            //ozumoId
            {
                name: "Shishito",
                description: "grilled shishito peppers, ponzu, katsuobushi",
                price: "$14.00",
                restaurant_id: ozumoId
            },
            {
                name: "Kinoko",
                description: "roasted king trumpet mushrooms, garlic soy, chives",
                price: "$14.00",
                restaurant_id: ozumoId
            },
            {
                name: "Nasu",
                description: "grilled eggplant, sansho tare, wadaman togarashi, chives",
                price: "$14.00",
                restaurant_id: ozumoId
            },
            {
                name: "Sayamame",
                description: "blistered green beans, nori pesto, crispy leeks",
                price: "$14.00",
                restaurant_id: ozumoId
            },
            {
                name: "Gindara",
                description: "saikyo miso & sake kasu marinated grilled black cod",
                price: "$32.00",
                restaurant_id: ozumoId
            },
            {
                name: "Tokyo Gyu",
                description: "8 oz australian wagyu ribeye, miso mustard, sancho tare, matcha salt",
                price: "$44.00",
                restaurant_id: ozumoId
            },
            {
                name: "Katsu Sando",
                description: "panko-breaded llano seco pork, karashi mustard, tonkatsu sauce, japanese milk bread",
                price: "$24.00",
                restaurant_id: ozumoId
            },
            {
                name: "Chirashi",
                description: "tuna, salmon, hamachi, botan ebi, hotate, ikura, tamago",
                price: "$32.00",
                restaurant_id: ozumoId
            },
            //nobuId
            {
                name: "Shishito",
                description: "grilled shishito peppers, ponzu, katsuobushi",
                price: "$14.00",
                restaurant_id: nobuId
            },
            {
                name: "Kinoko",
                description: "roasted king trumpet mushrooms, garlic soy, chives",
                price: "$14.00",
                restaurant_id: nobuId
            },
            {
                name: "Nasu",
                description: "grilled eggplant, sansho tare, wadaman togarashi, chives",
                price: "$14.00",
                restaurant_id: nobuId
            },
            {
                name: "Sayamame",
                description: "blistered green beans, nori pesto, crispy leeks",
                price: "$14.00",
                restaurant_id: nobuId
            },
            {
                name: "Gindara",
                description: "saikyo miso & sake kasu marinated grilled black cod",
                price: "$32.00",
                restaurant_id: nobuId
            },
            {
                name: "Tokyo Gyu",
                description: "8 oz australian wagyu ribeye, miso mustard, sancho tare, matcha salt",
                price: "$44.00",
                restaurant_id: nobuId
            },
            {
                name: "Katsu Sando",
                description: "panko-breaded llano seco pork, karashi mustard, tonkatsu sauce, japanese milk bread",
                price: "$24.00",
                restaurant_id: nobuId
            },
            {
                name: "Chirashi",
                description: "tuna, salmon, hamachi, botan ebi, hotate, ikura, tamago",
                price: "$32.00",
                restaurant_id: nobuId
            },
            //satoId
            {
                name: "Shishito",
                description: "grilled shishito peppers, ponzu, katsuobushi",
                price: "$14.00",
                restaurant_id: satoId
            },
            {
                name: "Kinoko",
                description: "roasted king trumpet mushrooms, garlic soy, chives",
                price: "$14.00",
                restaurant_id: satoId
            },
            {
                name: "Nasu",
                description: "grilled eggplant, sansho tare, wadaman togarashi, chives",
                price: "$14.00",
                restaurant_id: satoId
            },
            {
                name: "Sayamame",
                description: "blistered green beans, nori pesto, crispy leeks",
                price: "$14.00",
                restaurant_id: satoId
            },
            {
                name: "Gindara",
                description: "saikyo miso & sake kasu marinated grilled black cod",
                price: "$32.00",
                restaurant_id: satoId
            },
            {
                name: "Tokyo Gyu",
                description: "8 oz australian wagyu ribeye, miso mustard, sancho tare, matcha salt",
                price: "$44.00",
                restaurant_id: satoId
            },
            {
                name: "Katsu Sando",
                description: "panko-breaded llano seco pork, karashi mustard, tonkatsu sauce, japanese milk bread",
                price: "$24.00",
                restaurant_id: satoId
            },
            {
                name: "Chirashi",
                description: "tuna, salmon, hamachi, botan ebi, hotate, ikura, tamago",
                price: "$32.00",
                restaurant_id: satoId
            },

            //nahmId
            {
                name: "Samosa",
                description: "Red Norland potato, caramelized onion, carrot wrapped in pastry skin. Served with coconut curry dipping",
                price: "$14.95",
                restaurant_id: nahmId
            },
            {
                name: "Ahi Scoops",
                description: "Pan-seared sesame crusted Ahi tuna*, cucumber, seaweed salad, crispy potato, dill, lemongrass and chili lime",
                price: "$18.95",
                restaurant_id: nahmId
            },
            {
                name: "Tom Yum",
                description: "Spicy & sour soup, mushroom, tomato, mixed veggie, galangal, kaffir lime leaves, lemongrass, cilantro and green onion",
                price: "$9.95",
                restaurant_id: nahmId
            },
            {
                name: "Crab Fried Rice",
                description: "Jumbo lump crab meat, double eggs, twice cooked rice, onion, tomato and cilantro. Served with bone broth",
                price: "$34.95",
                restaurant_id: nahmId
            },
            {
                name: "Tofu Noodle Soup",
                description: "Fresh rice noodles, veggie broth, soft organic tofu, mix veggies, bean sprouts, cilantro and green onion",
                price: "$18.95",
                restaurant_id: nahmId
            },
            {
                name: "Slow Cooked Beef Curry",
                description: "Wagyu Beef, Green coconut curry, Thai eggplant, bell pepper, and basil. Served with Vermicelli Noodle & fresh vegetables",
                price: "$33.95",
                restaurant_id: nahmId
            },
            {
                name: "Pad Thai \"Chai Ya\"",
                description: "Thin rice noodles, cage free egg, coconut milk, tamarind, bean sprouts, chives, peanuts",
                price: "$18.95",
                restaurant_id: nahmId
            },
            {
                name: "Pad See You",
                description: "Flat rice noodles, cage free egg, carrot, Asian broccoli",
                price: "$18.95",
                restaurant_id: nahmId
            },
            //jimId
            {
                name: "Samosa",
                description: "Red Norland potato, caramelized onion, carrot wrapped in pastry skin. Served with coconut curry dipping",
                price: "$14.95",
                restaurant_id: jimId
            },
            {
                name: "Ahi Scoops",
                description: "Pan-seared sesame crusted Ahi tuna*, cucumber, seaweed salad, crispy potato, dill, lemongrass and chili lime",
                price: "$18.95",
                restaurant_id: jimId
            },
            {
                name: "Tom Yum",
                description: "Spicy & sour soup, mushroom, tomato, mixed veggie, galangal, kaffir lime leaves, lemongrass, cilantro and green onion",
                price: "$9.95",
                restaurant_id: jimId
            },
            {
                name: "Crab Fried Rice",
                description: "Jumbo lump crab meat, double eggs, twice cooked rice, onion, tomato and cilantro. Served with bone broth",
                price: "$34.95",
                restaurant_id: jimId
            },
            {
                name: "Tofu Noodle Soup",
                description: "Fresh rice noodles, veggie broth, soft organic tofu, mix veggies, bean sprouts, cilantro and green onion",
                price: "$18.95",
                restaurant_id: jimId
            },
            {
                name: "Slow Cooked Beef Curry",
                description: "Wagyu Beef, Green coconut curry, Thai eggplant, bell pepper, and basil. Served with Vermicelli Noodle & fresh vegetables",
                price: "$33.95",
                restaurant_id: jimId
            },
            {
                name: "Pad Thai \"Chai Ya\"",
                description: "Thin rice noodles, cage free egg, coconut milk, tamarind, bean sprouts, chives, peanuts",
                price: "$18.95",
                restaurant_id: jimId
            },
            {
                name: "Pad See You",
                description: "Flat rice noodles, cage free egg, carrot, Asian broccoli",
                price: "$18.95",
                restaurant_id: jimId
            },
            //tharaId
            {
                name: "Samosa",
                description: "Red Norland potato, caramelized onion, carrot wrapped in pastry skin. Served with coconut curry dipping",
                price: "$14.95",
                restaurant_id: tharaId
            },
            {
                name: "Ahi Scoops",
                description: "Pan-seared sesame crusted Ahi tuna*, cucumber, seaweed salad, crispy potato, dill, lemongrass and chili lime",
                price: "$18.95",
                restaurant_id: tharaId
            },
            {
                name: "Tom Yum",
                description: "Spicy & sour soup, mushroom, tomato, mixed veggie, galangal, kaffir lime leaves, lemongrass, cilantro and green onion",
                price: "$9.95",
                restaurant_id: tharaId
            },
            {
                name: "Crab Fried Rice",
                description: "Jumbo lump crab meat, double eggs, twice cooked rice, onion, tomato and cilantro. Served with bone broth",
                price: "$34.95",
                restaurant_id: tharaId
            },
            {
                name: "Tofu Noodle Soup",
                description: "Fresh rice noodles, veggie broth, soft organic tofu, mix veggies, bean sprouts, cilantro and green onion",
                price: "$18.95",
                restaurant_id: tharaId
            },
            {
                name: "Slow Cooked Beef Curry",
                description: "Wagyu Beef, Green coconut curry, Thai eggplant, bell pepper, and basil. Served with Vermicelli Noodle & fresh vegetables",
                price: "$33.95",
                restaurant_id: tharaId
            },
            {
                name: "Pad Thai \"Chai Ya\"",
                description: "Thin rice noodles, cage free egg, coconut milk, tamarind, bean sprouts, chives, peanuts",
                price: "$18.95",
                restaurant_id: tharaId
            },
            {
                name: "Pad See You",
                description: "Flat rice noodles, cage free egg, carrot, Asian broccoli",
                price: "$18.95",
                restaurant_id: tharaId
            },
            //flowOasisId
            {
                name: "Samosa",
                description: "Red Norland potato, caramelized onion, carrot wrapped in pastry skin. Served with coconut curry dipping",
                price: "$14.95",
                restaurant_id: flowOasisId
            },
            {
                name: "Ahi Scoops",
                description: "Pan-seared sesame crusted Ahi tuna*, cucumber, seaweed salad, crispy potato, dill, lemongrass and chili lime",
                price: "$18.95",
                restaurant_id: flowOasisId
            },
            {
                name: "Tom Yum",
                description: "Spicy & sour soup, mushroom, tomato, mixed veggie, galangal, kaffir lime leaves, lemongrass, cilantro and green onion",
                price: "$9.95",
                restaurant_id: flowOasisId
            },
            {
                name: "Crab Fried Rice",
                description: "Jumbo lump crab meat, double eggs, twice cooked rice, onion, tomato and cilantro. Served with bone broth",
                price: "$34.95",
                restaurant_id: flowOasisId
            },
            {
                name: "Tofu Noodle Soup",
                description: "Fresh rice noodles, veggie broth, soft organic tofu, mix veggies, bean sprouts, cilantro and green onion",
                price: "$18.95",
                restaurant_id: flowOasisId
            },
            {
                name: "Slow Cooked Beef Curry",
                description: "Wagyu Beef, Green coconut curry, Thai eggplant, bell pepper, and basil. Served with Vermicelli Noodle & fresh vegetables",
                price: "$33.95",
                restaurant_id: flowOasisId
            },
            {
                name: "Pad Thai \"Chai Ya\"",
                description: "Thin rice noodles, cage free egg, coconut milk, tamarind, bean sprouts, chives, peanuts",
                price: "$18.95",
                restaurant_id: flowOasisId
            },
            {
                name: "Pad See You",
                description: "Flat rice noodles, cage free egg, carrot, Asian broccoli",
                price: "$18.95",
                restaurant_id: flowOasisId
            },
            //frontRoomId
            {
                name: "Samosa",
                description: "Red Norland potato, caramelized onion, carrot wrapped in pastry skin. Served with coconut curry dipping",
                price: "$14.95",
                restaurant_id: frontRoomId
            },
            {
                name: "Ahi Scoops",
                description: "Pan-seared sesame crusted Ahi tuna*, cucumber, seaweed salad, crispy potato, dill, lemongrass and chili lime",
                price: "$18.95",
                restaurant_id: frontRoomId
            },
            {
                name: "Tom Yum",
                description: "Spicy & sour soup, mushroom, tomato, mixed veggie, galangal, kaffir lime leaves, lemongrass, cilantro and green onion",
                price: "$9.95",
                restaurant_id: frontRoomId
            },
            {
                name: "Crab Fried Rice",
                description: "Jumbo lump crab meat, double eggs, twice cooked rice, onion, tomato and cilantro. Served with bone broth",
                price: "$34.95",
                restaurant_id: frontRoomId
            },
            {
                name: "Tofu Noodle Soup",
                description: "Fresh rice noodles, veggie broth, soft organic tofu, mix veggies, bean sprouts, cilantro and green onion",
                price: "$18.95",
                restaurant_id: frontRoomId
            },
            {
                name: "Slow Cooked Beef Curry",
                description: "Wagyu Beef, Green coconut curry, Thai eggplant, bell pepper, and basil. Served with Vermicelli Noodle & fresh vegetables",
                price: "$33.95",
                restaurant_id: frontRoomId
            },
            {
                name: "Pad Thai \"Chai Ya\"",
                description: "Thin rice noodles, cage free egg, coconut milk, tamarind, bean sprouts, chives, peanuts",
                price: "$18.95",
                restaurant_id: frontRoomId
            },
            {
                name: "Pad See You",
                description: "Flat rice noodles, cage free egg, carrot, Asian broccoli",
                price: "$18.95",
                restaurant_id: frontRoomId
            },
            //casiaId
            {
                name: "Samosa",
                description: "Red Norland potato, caramelized onion, carrot wrapped in pastry skin. Served with coconut curry dipping",
                price: "$14.95",
                restaurant_id: casiaId
            },
            {
                name: "Ahi Scoops",
                description: "Pan-seared sesame crusted Ahi tuna*, cucumber, seaweed salad, crispy potato, dill, lemongrass and chili lime",
                price: "$18.95",
                restaurant_id: casiaId
            },
            {
                name: "Tom Yum",
                description: "Spicy & sour soup, mushroom, tomato, mixed veggie, galangal, kaffir lime leaves, lemongrass, cilantro and green onion",
                price: "$9.95",
                restaurant_id: casiaId
            },
            {
                name: "Crab Fried Rice",
                description: "Jumbo lump crab meat, double eggs, twice cooked rice, onion, tomato and cilantro. Served with bone broth",
                price: "$34.95",
                restaurant_id: casiaId
            },
            {
                name: "Tofu Noodle Soup",
                description: "Fresh rice noodles, veggie broth, soft organic tofu, mix veggies, bean sprouts, cilantro and green onion",
                price: "$18.95",
                restaurant_id: casiaId
            },
            {
                name: "Slow Cooked Beef Curry",
                description: "Wagyu Beef, Green coconut curry, Thai eggplant, bell pepper, and basil. Served with Vermicelli Noodle & fresh vegetables",
                price: "$33.95",
                restaurant_id: casiaId
            },
            {
                name: "Pad Thai \"Chai Ya\"",
                description: "Thin rice noodles, cage free egg, coconut milk, tamarind, bean sprouts, chives, peanuts",
                price: "$18.95",
                restaurant_id: casiaId
            },
            {
                name: "Pad See You",
                description: "Flat rice noodles, cage free egg, carrot, Asian broccoli",
                price: "$18.95",
                restaurant_id: casiaId
            },
        ]
    })
    console.log("Finished initializing Item table.")

    await prisma.user.createMany({
        data: [
            {
                first_name: "Laith",
                last_name: "Harb",
                email: "laith@hotmail.com",
                city: "ottawa",
                password: "$2b$10$I8xkU2nQ8EAHuVOdbMy9YO/.rSU3584Y.H4LrpIujGNDtmny9FnLu",
                phone: "1112223333",
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                email: "josh@hotmail.com",
                city: "toronto",
                password: "$2b$10$I8xkU2nQ8EAHuVOdbMy9YO/.rSU3584Y.H4LrpIujGNDtmny9FnLu",
                phone: "1112223333",
            },
            {
                first_name: "LeBron",
                last_name: "James",
                email: "lebron@hotmail.com",
                city: "niagara",
                password: "$2b$10$I8xkU2nQ8EAHuVOdbMy9YO/.rSU3584Y.H4LrpIujGNDtmny9FnLu",
                phone: "1112223333",
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                email: "cassidy@hotmail.com",
                city: "toronto",
                password: "$2b$10$I8xkU2nQ8EAHuVOdbMy9YO/.rSU3584Y.H4LrpIujGNDtmny9FnLu",
                phone: "1112223333",
            },
        ]
    })
    console.log("Finished initializing User table")

    const users = await prisma.user.findMany()
    const userLaithId = users.find((user) => user.first_name === "Laith")?.id || 1
    const userJoshId = users.find((user) => user.first_name === "Josh")?.id || 1
    const userLeBronId = users.find((user) => user.first_name === "LeBron")?.id || 1
    const userCassidyId = users.find((user) => user.first_name === "Cassidy")?.id || 1

    await prisma.review.createMany({
        data: [
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: puestoId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: mezcalId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: distritoId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: mexicoLindoId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: reposadoId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: tostadasId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: grandViewId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: bSteakAId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: dueDieciId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: cucinaId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: trattotiaId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: terraId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: iChinaId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: brochetteId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: theMandarinId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: crouchingId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: peonyId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: uncleYuId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: dragonHorseId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: gyuKakuId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: kyptoId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: ozumoId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: nobuId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: satoId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: nahmId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: jimId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: tharaId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: flowOasisId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: frontRoomId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: casiaId,
                user_id: userLaithId,
            },

            //Josh Allen
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: puestoId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: mezcalId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: distritoId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: mexicoLindoId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: reposadoId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: tostadasId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: grandViewId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: bSteakAId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: dueDieciId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: cucinaId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: trattotiaId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: terraId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: iChinaId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: brochetteId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: theMandarinId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: crouchingId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: peonyId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: uncleYuId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: dragonHorseId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: gyuKakuId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: kyptoId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: ozumoId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: nobuId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: satoId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: nahmId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: jimId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: tharaId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: flowOasisId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: frontRoomId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: casiaId,
                user_id: userJoshId,
            },
            //LeBron James
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: puestoId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: mezcalId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: distritoId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: mexicoLindoId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: reposadoId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: tostadasId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: grandViewId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: bSteakAId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: dueDieciId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: cucinaId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: trattotiaId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: terraId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: iChinaId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: brochetteId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: theMandarinId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: crouchingId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: peonyId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: uncleYuId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: dragonHorseId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: gyuKakuId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: kyptoId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: ozumoId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: nobuId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: satoId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: nahmId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: jimId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: tharaId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: flowOasisId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: frontRoomId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: casiaId,
                user_id: userLeBronId,
            },

            //Cassidy
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: puestoId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: mezcalId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: distritoId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: mexicoLindoId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: reposadoId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: tostadasId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: grandViewId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: bSteakAId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: dueDieciId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: cucinaId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: trattotiaId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: terraId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: iChinaId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: brochetteId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: theMandarinId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: crouchingId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: peonyId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: uncleYuId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: dragonHorseId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: gyuKakuId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: kyptoId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: ozumoId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: nobuId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: satoId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: nahmId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: jimId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: tharaId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: flowOasisId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: frontRoomId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: casiaId,
                user_id: userCassidyId,
            },
        ]
    })
    console.log("Finished initializing Review table.")

    const restaurant_ids = restaurants.map(restaurant => restaurant.id)
    const table_data = restaurant_ids.flatMap(id =>
        Array(5).fill({}).map(() => ({
            restaurant_id: id,
            seats: 2
        })).concat(
            Array(5).fill({}).map(() => ({
                restaurant_id: id,
                seats: 4
            })))
    )

    await prisma.table.createMany({
        data: table_data
    })
    console.log("Finished initializing \"Table\" table.")

    console.log("Finished initializing all tables.")


    res.status(200).json({
        text: "seed success!"
    })
}