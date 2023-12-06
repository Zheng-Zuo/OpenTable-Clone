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
                name: "Casa Del Sol",
                main_image: "https://utfs.io/f/42337ad8-664b-4e6e-92ba-68f607459438-roawcd.jpeg",
                price: PRICE.CHEAP,
                description: "Step into the warm embrace of Mexican tradition at Casa Del Sol. This authentic Mexican eatery offers an extensive culinary journey through the rich flavors and traditions of Mexico. The menu is filled with classics like enchiladas, tacos, tamales, and more, each made according to traditional recipes passed down through generations. The rustic yet vibrant decor, adorned with colorful Mexican art, creates a welcoming atmosphere. An impressive selection of tequila and mezcal-based cocktails complements the menu, making your dining experience truly complete. Whether you're looking for a family meal or a fun night out, Casa Del Sol has something to offer.",
                images: [
                    "https://utfs.io/f/1ca79d8b-1091-437b-8a00-4127e13d992d-wmpklo.jpg",
                    "https://utfs.io/f/83cd4a29-ac8c-4caa-ad1a-68d1eb263c67-wmpkln.webp",
                    "https://utfs.io/f/239fe6f5-15a6-4cee-b6de-176d44f79d18-wmpklm.jpeg",
                    "https://utfs.io/f/84fb69a3-2e00-4579-b73b-ecb9375fb695-wmpkll.jpeg",
                    "https://utfs.io/f/6c6a7774-c9f8-4e9a-b3d3-3a776c1409fe-wmpklk.jpeg",
                    "https://utfs.io/f/e2f24740-f969-4876-8b41-91ebc0b4a3cb-wmpklj.jpeg",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "case-del-sol",
                location_id: toronoLocationId,
                cuisine_id: mexicanCuisineId,
            },
            //
            {
                name: "El Charro Loco", //
                main_image: "https://utfs.io/f/e9f57a0f-76b4-426f-ab5e-f5e97e54f5db-roawcc.jpeg",
                price: PRICE.REGULAR,
                description: "El Charro Loco transports you straight into the heart of a bustling Mexican market with its lively atmosphere and delicious street-style fare. Renowned for its mouth-watering carnitas, fresh guacamole, and legendary margaritas, this establishment is a testament to the power of simple, well-prepared food. Nestled amid a vibrant and relaxed setting, guests can enjoy excellent dishes prepared from scratch daily. Live music on weekends enhances the festive vibe, making El Charro Loco a destination for all lovers of zesty, savory food and good times.",
                images: [
                    "https://utfs.io/f/1ca79d8b-1091-437b-8a00-4127e13d992d-wmpklo.jpg",
                    "https://utfs.io/f/83cd4a29-ac8c-4caa-ad1a-68d1eb263c67-wmpkln.webp",
                    "https://utfs.io/f/239fe6f5-15a6-4cee-b6de-176d44f79d18-wmpklm.jpeg",
                    "https://utfs.io/f/84fb69a3-2e00-4579-b73b-ecb9375fb695-wmpkll.jpeg",
                    "https://utfs.io/f/6c6a7774-c9f8-4e9a-b3d3-3a776c1409fe-wmpklk.jpeg",
                    "https://utfs.io/f/e2f24740-f969-4876-8b41-91ebc0b4a3cb-wmpklj.jpeg",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "el-charro-loco",
                location_id: ottawaLocationId,
                cuisine_id: mexicanCuisineId,
            },
            //
            {
                name: "Fiesta De Mariscos",
                main_image: "https://utfs.io/f/ac548157-05d6-4458-af5b-0935cbfe63f3-roawcb.jpg",
                price: PRICE.EXPENSIVE,
                description: "Embark on an oceanic adventure with Fiesta De Mariscos. Specializing in seafood delicacies, this coastal-themed restaurant captures the essence of Mexico's seaside towns. From zesty ceviche to shrimp tacos and grilled red snapper, every dish is designed to transport you to the Mexican coastline. Crafted with high-quality, sustainably-sourced seafood, each recipe infuses typical Mexican ingredients for an unforgettable dining experience. With its nautical decor and friendly service, Fiesta De Mariscos offers a refreshing change of pace for Mexican cuisine enthusiasts.",
                images: [
                    "https://utfs.io/f/1ca79d8b-1091-437b-8a00-4127e13d992d-wmpklo.jpg",
                    "https://utfs.io/f/83cd4a29-ac8c-4caa-ad1a-68d1eb263c67-wmpkln.webp",
                    "https://utfs.io/f/239fe6f5-15a6-4cee-b6de-176d44f79d18-wmpklm.jpeg",
                    "https://utfs.io/f/84fb69a3-2e00-4579-b73b-ecb9375fb695-wmpkll.jpeg",
                    "https://utfs.io/f/6c6a7774-c9f8-4e9a-b3d3-3a776c1409fe-wmpklk.jpeg",
                    "https://utfs.io/f/e2f24740-f969-4876-8b41-91ebc0b4a3cb-wmpklj.jpeg",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "fiesta-de-mariscos",
                location_id: montrealLocationId,
                cuisine_id: mexicanCuisineId,
            },
            // 
            {
                name: "Pueblo Viejo Cantina", //"Mexico Lindo - San Jose",
                main_image: "https://utfs.io/f/0f65d61a-4542-4ea3-a785-e620850228c7-roawca.jpeg",
                price: PRICE.CHEAP,
                description: "Experience a slice of old-world Mexico at Pueblo Viejo Cantina. The restaurant takes pride in serving traditional, hearty, home-style dishes from across the regions of Mexico. Notable favorites include their mole poblano – a rich, complex sauce served over tender chicken, and chiles en nogada – stuffed peppers bathed in a creamy walnut sauce. The rustic charm of the decor, reminiscent of a cozy Mexican village, makes dining here feel warm and welcoming. Coupled with live mariachi performances, Pueblo Viejo Cantina creates an immersive experience that's both nostalgic and festive.",
                images: [
                    "https://utfs.io/f/1ca79d8b-1091-437b-8a00-4127e13d992d-wmpklo.jpg",
                    "https://utfs.io/f/83cd4a29-ac8c-4caa-ad1a-68d1eb263c67-wmpkln.webp",
                    "https://utfs.io/f/239fe6f5-15a6-4cee-b6de-176d44f79d18-wmpklm.jpeg",
                    "https://utfs.io/f/84fb69a3-2e00-4579-b73b-ecb9375fb695-wmpkll.jpeg",
                    "https://utfs.io/f/6c6a7774-c9f8-4e9a-b3d3-3a776c1409fe-wmpklk.jpeg",
                    "https://utfs.io/f/e2f24740-f969-4876-8b41-91ebc0b4a3cb-wmpklj.jpeg",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "pueblo-viejo-cantina",
                location_id: kingstonLocationId,
                cuisine_id: mexicanCuisineId,
            },
            // 
            {
                name: "Azteca Taquería",
                main_image: "https://utfs.io/f/74a35041-4405-46b7-b7a8-b40c4d5826c0-roawc9.jpeg",
                price: PRICE.REGULAR,
                description: "A haven for taco lovers, Azteca Taquería offers a diverse menu of tacos filled with everything from al pastor to barbacoa. Drawing inspiration from the vibrant street food culture of Mexico, the taquería serves up quick bites that don't compromise on flavor or authenticity. Freshly made salsas and hand-pressed tortillas complement the fillings, each offering a unique flavor profile. The laid-back atmosphere, punctuated by colorful murals and soft Latin music, is perfect for a casual lunch or dinner. Traditional Mexican beverages like horchata and tamarind water provide the finishing touches to your meal.",
                images: [
                    "https://utfs.io/f/1ca79d8b-1091-437b-8a00-4127e13d992d-wmpklo.jpg",
                    "https://utfs.io/f/83cd4a29-ac8c-4caa-ad1a-68d1eb263c67-wmpkln.webp",
                    "https://utfs.io/f/239fe6f5-15a6-4cee-b6de-176d44f79d18-wmpklm.jpeg",
                    "https://utfs.io/f/84fb69a3-2e00-4579-b73b-ecb9375fb695-wmpkll.jpeg",
                    "https://utfs.io/f/6c6a7774-c9f8-4e9a-b3d3-3a776c1409fe-wmpklk.jpeg",
                    "https://utfs.io/f/e2f24740-f969-4876-8b41-91ebc0b4a3cb-wmpklj.jpeg",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "azteca-taqueria",
                location_id: hamiltonLocationId,
                cuisine_id: mexicanCuisineId,
            },
            //
            {
                name: "Verde Mesa",
                main_image: "https://utfs.io/f/f0786098-da7d-4e1a-8add-3488eecebdb9-roawc8.webp",
                price: PRICE.EXPENSIVE,
                description: "Bringing a health-conscious approach to traditional Mexican fare, Verde Mesa offers fresh, locally-sourced ingredients in all their dishes. From salads bursting with color and flavor, to heartier dishes made with lean proteins and plenty of vegetables, the menu is as varied as it is nutritious. Vegan and gluten-free options ensure that everyone can enjoy a delicious meal, regardless of dietary restrictions. The stylish minimalist decor, interspersed with lush green plants, creates a peaceful and inviting ambience. An organic juice bar and selection of healthy desserts complete the experience at Verde Mesa, making it an ideal destination for those who value their health as much as their taste buds.",
                images: [
                    "https://utfs.io/f/1ca79d8b-1091-437b-8a00-4127e13d992d-wmpklo.jpg",
                    "https://utfs.io/f/83cd4a29-ac8c-4caa-ad1a-68d1eb263c67-wmpkln.webp",
                    "https://utfs.io/f/239fe6f5-15a6-4cee-b6de-176d44f79d18-wmpklm.jpeg",
                    "https://utfs.io/f/84fb69a3-2e00-4579-b73b-ecb9375fb695-wmpkll.jpeg",
                    "https://utfs.io/f/6c6a7774-c9f8-4e9a-b3d3-3a776c1409fe-wmpklk.jpeg",
                    "https://utfs.io/f/e2f24740-f969-4876-8b41-91ebc0b4a3cb-wmpklj.jpeg",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "verde-mesa",
                location_id: niagaraLocationId,
                cuisine_id: mexicanCuisineId,
            },

            // Italian -----------------------------------------------------------
            {
                name: "La Trattoria Di Roma",
                main_image: "https://utfs.io/f/10ca3c9d-3609-4389-8475-2b799289b606-bofanq.jpeg",
                price: PRICE.CHEAP,
                description: "At La Trattoria Di Roma, you can experience the heart and soul of traditional Roman cuisine in a warm, rustic setting. The restaurant offers an abundance of classic Roman dishes such as cacio e pepe, saltimbocca, and carbonara. Freshly baked focaccia, lovingly pulled mozzarella, and hand-rolled pasta speak to the dedication of maintaining authenticity. The extensive wine list, featuring selections from various regions of Italy, perfectly complements the hearty flavors of Roman gastronomy. With its cozy interiors mirroring a classic Italian home, La Trattoria Di Roma transports guests straight to the charming streets of Rome.",
                images: [
                    "https://utfs.io/f/28424b12-6be0-4081-9265-a6f21b4428dd-wc934b.jpeg",
                    "https://utfs.io/f/c0926270-c0f5-46b8-aab3-1edbc036f2b0-wc934a.jpeg",
                    "https://utfs.io/f/627e1b32-5b9e-4fc5-a0d3-6f732291e9e9-wc9349.jpeg",
                    "https://utfs.io/f/2b537f85-5e57-48cf-b4b5-b3df5194c09f-wc9348.webp",
                    "https://utfs.io/f/ae03dc7f-701d-42f1-83cc-d66bb8221395-wc9347.jpeg",
                    "https://utfs.io/f/47012950-eae8-46a1-88fe-360b4d0af942-wc9346.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "la-trattoria-di-roma",
                location_id: toronoLocationId,
                cuisine_id: italianCuisineId,
            },

            {
                name: "Quattro Stagioni",
                main_image: "https://utfs.io/f/8877bbfe-a769-44fd-a2a3-69f6c1a81a2b-bofanp.webp",
                price: PRICE.REGULAR,
                description: "Quattro Stagioni showcases the seasonal diversity of Italian culinary traditions. Inspired by Italy's four distinct seasons, the menu changes quarterly, highlighting fresh, locally-sourced ingredients of each season. From vibrant spring vegetables to hearty winter stews, each dish encapsulates the spirit of the time of year it represents. Housed in a beautifully restored villa, Quattro Stagioni exudes elegance and warmth, providing an inviting ambiance for any occasion. Its extensive selection of fine wines and liqueurs further enhances the dining experience.",
                images: [
                    "https://utfs.io/f/28424b12-6be0-4081-9265-a6f21b4428dd-wc934b.jpeg",
                    "https://utfs.io/f/c0926270-c0f5-46b8-aab3-1edbc036f2b0-wc934a.jpeg",
                    "https://utfs.io/f/627e1b32-5b9e-4fc5-a0d3-6f732291e9e9-wc9349.jpeg",
                    "https://utfs.io/f/2b537f85-5e57-48cf-b4b5-b3df5194c09f-wc9348.webp",
                    "https://utfs.io/f/ae03dc7f-701d-42f1-83cc-d66bb8221395-wc9347.jpeg",
                    "https://utfs.io/f/47012950-eae8-46a1-88fe-360b4d0af942-wc9346.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "quattro-stagioni",
                location_id: ottawaLocationId,
                cuisine_id: italianCuisineId,
            },

            {
                name: "Vesuvio Pizzeria",
                main_image: "https://utfs.io/f/cbf63bc7-6e3d-4635-a3f5-dc28beafef59-bofano.jpeg",
                price: PRICE.EXPENSIVE,
                description: "Vesuvio Pizzeria pays tribute to the birthplace of pizza - Naples. Specializing in Neapolitan style pizza, Vesuvio boasts a traditional wood-fired oven that cooks your pizza to perfection within minutes. From the classic Margherita to inventive pies topped with unique combinations of local ingredients, this pizzeria celebrates the simplicity and versatility of pizza. The decor, marked by lavish murals depicting scenes from Naples, sets a lively and casual atmosphere. Paired with craft Italian beers and regional wines, Vesuvio Pizzeria offers an authentic slice of Naples' vibrant food culture.",
                images: [
                    "https://utfs.io/f/28424b12-6be0-4081-9265-a6f21b4428dd-wc934b.jpeg",
                    "https://utfs.io/f/c0926270-c0f5-46b8-aab3-1edbc036f2b0-wc934a.jpeg",
                    "https://utfs.io/f/627e1b32-5b9e-4fc5-a0d3-6f732291e9e9-wc9349.jpeg",
                    "https://utfs.io/f/2b537f85-5e57-48cf-b4b5-b3df5194c09f-wc9348.webp",
                    "https://utfs.io/f/ae03dc7f-701d-42f1-83cc-d66bb8221395-wc9347.jpeg",
                    "https://utfs.io/f/47012950-eae8-46a1-88fe-360b4d0af942-wc9346.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "vesuvio-pizzeria",
                location_id: montrealLocationId,
                cuisine_id: italianCuisineId,
            },

            {
                name: "Tuscan Terrace",
                main_image: "https://utfs.io/f/adabbc31-9e41-41a7-9ebb-ebafa0d5adac-bofann.jpeg",
                price: PRICE.CHEAP,
                description: "Nestled in an enchanting garden setting, Tuscan Terrace serves up the rustic and hearty flavors of Tuscany. The menu features dishes like ribollita soup, pappardelle with wild boar ragù, and bistecca alla fiorentina, all prepared with ingredients sourced directly from local farmers and producers. The restaurant's open-air terrace offers a spectacular view, making it an ideal spot for romantic dinners or relaxed brunches. With its intimate ambiance, extensive wine list, and warm hospitality, Tuscan Terrace encapsulates the essence of la dolce vita.",
                images: [
                    "https://utfs.io/f/28424b12-6be0-4081-9265-a6f21b4428dd-wc934b.jpeg",
                    "https://utfs.io/f/c0926270-c0f5-46b8-aab3-1edbc036f2b0-wc934a.jpeg",
                    "https://utfs.io/f/627e1b32-5b9e-4fc5-a0d3-6f732291e9e9-wc9349.jpeg",
                    "https://utfs.io/f/2b537f85-5e57-48cf-b4b5-b3df5194c09f-wc9348.webp",
                    "https://utfs.io/f/ae03dc7f-701d-42f1-83cc-d66bb8221395-wc9347.jpeg",
                    "https://utfs.io/f/47012950-eae8-46a1-88fe-360b4d0af942-wc9346.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "tuscan-terrace",
                location_id: kingstonLocationId,
                cuisine_id: italianCuisineId,
            },

            {
                name: "Venetian Rialto",
                main_image: "https://utfs.io/f/46351d62-e37f-4811-bb9b-5d42a7dda28f-bofanm.jpeg",
                price: PRICE.REGULAR,
                description: "Located on a beautiful canal-side property, Venetian Rialto brings the magical allure of Venice to life through its culinary offerings. Famed for its seafood-driven Venetian dishes, the menu boasts treasures from the sea, including squid ink risotto, sarde in saor, and fritto misto. The elegant interiors, adorned with Murano glass chandeliers and gondola-inspired decor, exude Venetian charm. Alongside the cuisine, guests can indulge in a variety of Prosecco and Veneto wines, reflecting the region's rich viticulture.",
                images: [
                    "https://utfs.io/f/28424b12-6be0-4081-9265-a6f21b4428dd-wc934b.jpeg",
                    "https://utfs.io/f/c0926270-c0f5-46b8-aab3-1edbc036f2b0-wc934a.jpeg",
                    "https://utfs.io/f/627e1b32-5b9e-4fc5-a0d3-6f732291e9e9-wc9349.jpeg",
                    "https://utfs.io/f/2b537f85-5e57-48cf-b4b5-b3df5194c09f-wc9348.webp",
                    "https://utfs.io/f/ae03dc7f-701d-42f1-83cc-d66bb8221395-wc9347.jpeg",
                    "https://utfs.io/f/47012950-eae8-46a1-88fe-360b4d0af942-wc9346.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "venetian-rialto",
                location_id: hamiltonLocationId,
                cuisine_id: italianCuisineId,
            },

            {
                name: "Sicilian Sun",
                main_image: "https://utfs.io/f/b7a53d54-9b25-4aaa-b9e8-278c2f547e00-bofanl.jpeg",
                price: PRICE.EXPENSIVE,
                description: "Bask in the rich, diverse flavors of Sicily at Sicilian Sun. From the renowned arancini and caponata to the island's signature pasta con le sarde, the restaurant presents a delectable array of Sicilian classics. The menu also highlights the island’s sweet side, with cannoli and cassata gracing the dessert list. The vibrant Mediterranean-style interior, featuring bright ceramics and walls adorned with Sicilian landscapes, creates an inviting, sun-soaked atmosphere. A wide range of Sicilian wines and liqueurs, like Marsala and Limoncello, rounds off the authentic dining experience.",
                images: [
                    "https://utfs.io/f/28424b12-6be0-4081-9265-a6f21b4428dd-wc934b.jpeg",
                    "https://utfs.io/f/c0926270-c0f5-46b8-aab3-1edbc036f2b0-wc934a.jpeg",
                    "https://utfs.io/f/627e1b32-5b9e-4fc5-a0d3-6f732291e9e9-wc9349.jpeg",
                    "https://utfs.io/f/2b537f85-5e57-48cf-b4b5-b3df5194c09f-wc9348.webp",
                    "https://utfs.io/f/ae03dc7f-701d-42f1-83cc-d66bb8221395-wc9347.jpeg",
                    "https://utfs.io/f/47012950-eae8-46a1-88fe-360b4d0af942-wc9346.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "sicilian-sun",
                location_id: niagaraLocationId,
                cuisine_id: italianCuisineId,
            },

            // Chinese -----------------------------------------------------------
            {
                name: "Jade Dragon",
                main_image: "https://utfs.io/f/815d63d4-c3b2-4698-a8e9-ac31137580db-jsmtz7.jpeg",
                price: PRICE.CHEAP,
                description: "Enter the world of enchanting flavors at Jade Dragon. This upscale Chinese restaurant provides a culinary journey through China's diverse regions within its modern and elegant setting. From mouthwatering Cantonese dim sum to fiery Sichuan stir-fries and delicate Fujian seafood dishes, the menu is expansive and thoughtfully curated. A special feature is their tea bar, boasting an impressive selection of traditional Chinese teas served in ceremonial style. With its stunning decor inspired by traditional Chinese art forms, Jade Dragon creates an immersive dining experience reminiscent of both old-world charm and metropolitan sophistication.",
                images: [
                    "https://utfs.io/f/95a190a1-e7f1-4821-9e6b-b3e7dc6ea691-mw5fxa.jpeg",
                    "https://utfs.io/f/da8252fe-35b3-4a82-894e-e0c07cd300cb-mw5fx9.jpeg",
                    "https://utfs.io/f/49151786-fa3b-4f69-91c9-d57d31cedb36-mw5fx8.jpeg",
                    "https://utfs.io/f/4be6436d-dd1e-47b5-9819-4ae774e45e38-mw5fx7.jpeg",
                    "https://utfs.io/f/051d45b3-9ea3-4fc3-8044-a45eb9e7520d-mw5fx6.jpeg",
                    "https://utfs.io/f/96a431ae-202e-479d-89a1-843a9cbe6e47-mw5fx5.jpeg",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "jade-dragon",
                location_id: toronoLocationId,
                cuisine_id: chineseCuisineId,
            },

            {
                name: "Golden Lotus",
                main_image: "https://utfs.io/f/b761174f-a40a-41ac-b956-056c91c9dcf3-jsmtz6.jpeg",
                price: PRICE.REGULAR,
                description: "Golden Lotus stands as a testament to the seamless fusion of traditional Chinese cuisine with contemporary culinary techniques. Renowned for its Peking duck, skillfully prepared and served tableside, and hand-pulled noodles made fresh daily, the restaurant brings age-old recipes to life with a modern twist. The interior is a blend of warm tones and subtle oriental decor, creating a soothing ambiance that complements the gastronomic journey. Besides, the service team at Golden Lotus goes beyond merely serving dishes, providing guests valuable insight into the origins and traditions behind each dish.",
                images: [
                    "https://utfs.io/f/95a190a1-e7f1-4821-9e6b-b3e7dc6ea691-mw5fxa.jpeg",
                    "https://utfs.io/f/da8252fe-35b3-4a82-894e-e0c07cd300cb-mw5fx9.jpeg",
                    "https://utfs.io/f/49151786-fa3b-4f69-91c9-d57d31cedb36-mw5fx8.jpeg",
                    "https://utfs.io/f/4be6436d-dd1e-47b5-9819-4ae774e45e38-mw5fx7.jpeg",
                    "https://utfs.io/f/051d45b3-9ea3-4fc3-8044-a45eb9e7520d-mw5fx6.jpeg",
                    "https://utfs.io/f/96a431ae-202e-479d-89a1-843a9cbe6e47-mw5fx5.jpeg",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "golden-lotus",
                location_id: ottawaLocationId,
                cuisine_id: chineseCuisineId,
            },

            {
                name: "Bamboo Harmony",
                main_image: "https://utfs.io/f/12c96843-cf69-44e8-b734-da6bcefec344-jsmtz5.jpeg",
                price: PRICE.EXPENSIVE,
                description: "Dedicated to creating a harmonious balance between taste and health, Bamboo Harmony offers an extensive menu of vegetarian and vegan Chinese dishes. From delicious tofu stir-fries to crispy vegetable spring rolls, refreshing salads, and hearty noodle soups, every dish showcases the power of plant-based ingredients in Chinese cuisine. The restaurant’s calming, nature-inspired decor, dominated by bamboo accents and green hues, adds to the wellness-focused dining experience. Bamboo Harmony not only caters to those on a plant-based diet but also invites all food lovers to discover a healthier side of Chinese cuisine.",
                images: [
                    "https://utfs.io/f/95a190a1-e7f1-4821-9e6b-b3e7dc6ea691-mw5fxa.jpeg",
                    "https://utfs.io/f/da8252fe-35b3-4a82-894e-e0c07cd300cb-mw5fx9.jpeg",
                    "https://utfs.io/f/49151786-fa3b-4f69-91c9-d57d31cedb36-mw5fx8.jpeg",
                    "https://utfs.io/f/4be6436d-dd1e-47b5-9819-4ae774e45e38-mw5fx7.jpeg",
                    "https://utfs.io/f/051d45b3-9ea3-4fc3-8044-a45eb9e7520d-mw5fx6.jpeg",
                    "https://utfs.io/f/96a431ae-202e-479d-89a1-843a9cbe6e47-mw5fx5.jpeg",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "bamboo-harmony",
                location_id: montrealLocationId,
                cuisine_id: chineseCuisineId,
            },

            {
                name: "Silk Road",
                main_image: "https://utfs.io/f/45bcdebb-c6f5-4bba-854b-9aad5237df16-jsmtz4.png",
                price: PRICE.CHEAP,
                description: "Drawing inspiration from the historical trade route, Silk Road serves a range of flavors spanning China's varied culinary map. Signature dishes like cumin-scented Xinjiang skewers, hearty Shaanxi biang biang noodles, and delicate Cantonese dim sum narrate the unique story of the country's gastronomic landscape. The decor reflects elements of Chinese culture, with wall art depicting scenes from different regions along the Silk Road. This restaurant is more than just a dining spot; it's a place where food tells stories of tradition, culture, and ancient trade connections.",
                images: [
                    "https://utfs.io/f/95a190a1-e7f1-4821-9e6b-b3e7dc6ea691-mw5fxa.jpeg",
                    "https://utfs.io/f/da8252fe-35b3-4a82-894e-e0c07cd300cb-mw5fx9.jpeg",
                    "https://utfs.io/f/49151786-fa3b-4f69-91c9-d57d31cedb36-mw5fx8.jpeg",
                    "https://utfs.io/f/4be6436d-dd1e-47b5-9819-4ae774e45e38-mw5fx7.jpeg",
                    "https://utfs.io/f/051d45b3-9ea3-4fc3-8044-a45eb9e7520d-mw5fx6.jpeg",
                    "https://utfs.io/f/96a431ae-202e-479d-89a1-843a9cbe6e47-mw5fx5.jpeg",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "silk-road",
                location_id: kingstonLocationId,
                cuisine_id: chineseCuisineId,
            },

            {
                name: "Red Lantern",
                main_image: "https://utfs.io/f/24b09217-5169-4590-bac1-69debb9273d7-jsmtz3.jpeg",
                price: PRICE.REGULAR,
                description: "For those who enjoy the tingling sensation of spice-laden dishes, Red Lantern caters to their palate with its specialty in bold Hunan and Sichuan cuisines. Amidst an ambiance marked by vibrant red lanterns and traditional Chinese artwork, guests can explore a variety of dishes like flavorful mapo tofu, spicy hot pots, and fiery kung pao chicken, each resonating with robust flavors and spices. A carefully curated selection of beers and wines complements the menu, providing relief from the heat and balancing the overall dining experience.",
                images: [
                    "https://utfs.io/f/95a190a1-e7f1-4821-9e6b-b3e7dc6ea691-mw5fxa.jpeg",
                    "https://utfs.io/f/da8252fe-35b3-4a82-894e-e0c07cd300cb-mw5fx9.jpeg",
                    "https://utfs.io/f/49151786-fa3b-4f69-91c9-d57d31cedb36-mw5fx8.jpeg",
                    "https://utfs.io/f/4be6436d-dd1e-47b5-9819-4ae774e45e38-mw5fx7.jpeg",
                    "https://utfs.io/f/051d45b3-9ea3-4fc3-8044-a45eb9e7520d-mw5fx6.jpeg",
                    "https://utfs.io/f/96a431ae-202e-479d-89a1-843a9cbe6e47-mw5fx5.jpeg",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "red-lantern",
                location_id: hamiltonLocationId,
                cuisine_id: chineseCuisineId,
            },

            {
                name: "Imperial Wok",
                main_image: "https://utfs.io/f/4dd61086-f710-44ae-867b-f0a4471cfdde-jsmtz2.webp",
                price: PRICE.EXPENSIVE,
                description: "Where traditional Chinese cooking meets elegant fine dining, Imperial Wok provides an upscale experience of Chinese cuisine. The restaurant shines particularly for its exquisite seafood offerings, such as lobster doused in aromatic black bean sauce and crispy whole seabass served with tangy ginger-soy dressing. Every dish is meticulously prepared, reflecting the chefs' dedication to quality and detail. The ambiance, characterized by sleek decor, warm lighting, and ornate table settings, makes it an ideal destination for special occasions or corporate gatherings. With attentive, personalized service, dining at Imperial Wok feels like being part of an exclusive gastronomic show.",
                images: [
                    "https://utfs.io/f/95a190a1-e7f1-4821-9e6b-b3e7dc6ea691-mw5fxa.jpeg",
                    "https://utfs.io/f/da8252fe-35b3-4a82-894e-e0c07cd300cb-mw5fx9.jpeg",
                    "https://utfs.io/f/49151786-fa3b-4f69-91c9-d57d31cedb36-mw5fx8.jpeg",
                    "https://utfs.io/f/4be6436d-dd1e-47b5-9819-4ae774e45e38-mw5fx7.jpeg",
                    "https://utfs.io/f/051d45b3-9ea3-4fc3-8044-a45eb9e7520d-mw5fx6.jpeg",
                    "https://utfs.io/f/96a431ae-202e-479d-89a1-843a9cbe6e47-mw5fx5.jpeg",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "imperial-wok",
                location_id: niagaraLocationId,
                cuisine_id: chineseCuisineId,
            },

            // Japanese -----------------------------------------------------------
            {
                name: "Sakura Sushi",
                main_image: "https://utfs.io/f/90972843-c9ea-4748-8a5b-a2e76d3a8925-qq3dyx.webp",
                price: PRICE.CHEAP,
                description: "Experience the delicate artistry and finesse of sushi making at Sakura Sushi. This authentic sushi bar specializes in traditional nigiri, sashimi, and maki rolls, all prepared and presented with unparalleled precision by expert chefs. From silky slices of raw fish to beautifully crafted rolls, every dish captures the essence of Japanese flavors. Decorated in a minimalist style inspired by Japanese aesthetics, with tranquil Sakura (cherry blossom) murals adorning the walls, the restaurant embodies serenity and refinement. Coupled with an extensive sake selection, Sakura Sushi provides a memorable journey into Japan's iconic culinary tradition.",
                images: [
                    "https://utfs.io/f/93ee23bf-9cce-4efb-aba0-ee4fae91b90b-nmks0u.jpeg",
                    "https://utfs.io/f/78870017-b23f-49a7-8a79-f1559c42a8e5-nmks0v.webp",
                    "https://utfs.io/f/09b52127-2efb-4b0d-83ce-ac6706ab599b-nmks0w.jpeg",
                    "https://utfs.io/f/9342f1af-6197-475e-8d95-29e5547f1224-nmks0x.jpeg",
                    "https://utfs.io/f/f2beb1fe-d05c-48c6-8f8b-1ecbad892f1d-nmks0y.jpeg",
                    "https://utfs.io/f/4fbfda1f-8aca-45f4-8009-1e5eac9d7228-nmks0z.jpeg",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "sakura-sushi",
                location_id: toronoLocationId,
                cuisine_id: japaneseCuisineId,
            },

            {
                name: "Kaiseki Ryori",
                main_image: "https://utfs.io/f/d090e24f-7fd0-4158-9890-ed8a7ccb9e4d-qq3dyy.jpeg",
                price: PRICE.REGULAR,
                description: "Embark on a gastronomic journey that tells the story of Japan's seasonal offerings and culinary heritage at Kaiseki Ryori. This upscale establishment is renowned for its multi-course kaiseki meals - a ritualistic dining experience that weaves together the freshest seasonal ingredients into a tapestry of tastes and textures. Each dish is a work of art, showcasing the subtle complexity of Japanese cuisine and reflecting nature's transient beauty. The restaurant's elegant interiors exude tranquility, featuring traditional Japanese decor and private tatami rooms, enhancing the exclusive and immersive kaiseki experience.",
                images: [
                    "https://utfs.io/f/93ee23bf-9cce-4efb-aba0-ee4fae91b90b-nmks0u.jpeg",
                    "https://utfs.io/f/78870017-b23f-49a7-8a79-f1559c42a8e5-nmks0v.webp",
                    "https://utfs.io/f/09b52127-2efb-4b0d-83ce-ac6706ab599b-nmks0w.jpeg",
                    "https://utfs.io/f/9342f1af-6197-475e-8d95-29e5547f1224-nmks0x.jpeg",
                    "https://utfs.io/f/f2beb1fe-d05c-48c6-8f8b-1ecbad892f1d-nmks0y.jpeg",
                    "https://utfs.io/f/4fbfda1f-8aca-45f4-8009-1e5eac9d7228-nmks0z.jpeg",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "kaiseki-ryori",
                location_id: ottawaLocationId,
                cuisine_id: japaneseCuisineId,
            },

            {
                name: "Ramen-Ya Hiroshi",
                main_image: "https://utfs.io/f/31580d22-81d6-4ac0-9567-448f21d12cec-qq3dyz.jpeg",
                price: PRICE.EXPENSIVE,
                description: "If you're seeking comfort in a bowl, look no further than Ramen-Ya Hiroshi. Celebrated for its richly flavored broths and perfectly cooked noodles, this cozy ramen shop offers various types of ramen including shoyu (soy-based), miso (fermented soybean), and tonkotsu (pork bone). Each bowl can be customized with an array of toppings like chashu pork, soft-boiled eggs, bamboo shoots, and green onions. The eatery's warm, casual atmosphere, with its mural of Hiroshi - the friendly ramen master, invites guests to slurp down their ramen in traditional Japanese style.",
                images: [
                    "https://utfs.io/f/93ee23bf-9cce-4efb-aba0-ee4fae91b90b-nmks0u.jpeg",
                    "https://utfs.io/f/78870017-b23f-49a7-8a79-f1559c42a8e5-nmks0v.webp",
                    "https://utfs.io/f/09b52127-2efb-4b0d-83ce-ac6706ab599b-nmks0w.jpeg",
                    "https://utfs.io/f/9342f1af-6197-475e-8d95-29e5547f1224-nmks0x.jpeg",
                    "https://utfs.io/f/f2beb1fe-d05c-48c6-8f8b-1ecbad892f1d-nmks0y.jpeg",
                    "https://utfs.io/f/4fbfda1f-8aca-45f4-8009-1e5eac9d7228-nmks0z.jpeg",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "ramen-ya-hiroshi",
                location_id: montrealLocationId,
                cuisine_id: japaneseCuisineId,
            },

            {
                name: "Izakaya Tanuki",
                main_image: "https://utfs.io/f/8843ef49-de33-467a-bcc7-fa7b9156af31-qq3dz0.jpeg",
                price: PRICE.CHEAP,
                description: "At Izakaya Tanuki, experience the vibrant energy and camaraderie characteristic of a typical Japanese pub. Serving an impressive array of small plates ranging from sizzling yakitori (grilled skewers) to fresh sashimi, crispy tempura, and comforting hot pots, it's a paradise for food lovers. With its rustic decor, lively ambiance, and long communal tables promoting friendly conversation, Izakaya Tanuki is the perfect place to unwind after a long day. An extensive list of sake, shochu, and Japanese beers further enhances the convivial dining experience.",
                images: [
                    "https://utfs.io/f/93ee23bf-9cce-4efb-aba0-ee4fae91b90b-nmks0u.jpeg",
                    "https://utfs.io/f/78870017-b23f-49a7-8a79-f1559c42a8e5-nmks0v.webp",
                    "https://utfs.io/f/09b52127-2efb-4b0d-83ce-ac6706ab599b-nmks0w.jpeg",
                    "https://utfs.io/f/9342f1af-6197-475e-8d95-29e5547f1224-nmks0x.jpeg",
                    "https://utfs.io/f/f2beb1fe-d05c-48c6-8f8b-1ecbad892f1d-nmks0y.jpeg",
                    "https://utfs.io/f/4fbfda1f-8aca-45f4-8009-1e5eac9d7228-nmks0z.jpeg",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "izakaya-tanuki",
                location_id: kingstonLocationId,
                cuisine_id: japaneseCuisineId,
            },

            {
                name: "Tempura Tenshi",
                main_image: "https://utfs.io/f/0bbf7b53-9120-4279-9db7-e4f4cddac4bb-qq3dz1.jpeg",
                price: PRICE.REGULAR,
                description: "Immerse yourself in the world of light, crispy tempura at Tempura Tenshi. This specialty restaurant is dedicated to the art of tempura, serving a variety of seafood and vegetables enrobed in a delicate batter and fried to golden perfection. Each dish is a testament to the freshness of its ingredients and the skillful technique of the tempura chefs. The open kitchen design allows guests to watch as their dishes are prepared, adding an engaging dimension to the dining experience. With its modern yet warm interiors and thoughtful service, Tempura Tenshi offers a heavenly taste of one of Japan's most beloved culinary traditions.",
                images: [
                    "https://utfs.io/f/93ee23bf-9cce-4efb-aba0-ee4fae91b90b-nmks0u.jpeg",
                    "https://utfs.io/f/78870017-b23f-49a7-8a79-f1559c42a8e5-nmks0v.webp",
                    "https://utfs.io/f/09b52127-2efb-4b0d-83ce-ac6706ab599b-nmks0w.jpeg",
                    "https://utfs.io/f/9342f1af-6197-475e-8d95-29e5547f1224-nmks0x.jpeg",
                    "https://utfs.io/f/f2beb1fe-d05c-48c6-8f8b-1ecbad892f1d-nmks0y.jpeg",
                    "https://utfs.io/f/4fbfda1f-8aca-45f4-8009-1e5eac9d7228-nmks0z.jpeg",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "tempura-tenshi",
                location_id: hamiltonLocationId,
                cuisine_id: japaneseCuisineId,
            },

            {
                name: "Teppanyaki Tori",
                main_image: "https://utfs.io/f/6b2c4ca2-4193-47e7-9fdf-99cda79142a9-qq3dz2.jpeg",
                price: PRICE.EXPENSIVE,
                description: "Experience the excitement and flavor of teppanyaki-style cooking at Teppanyaki Tori. Watch as talented chefs showcase their culinary skills, preparing mouthwatering dishes on a hot iron griddle right before your eyes. From succulent meats to grilled vegetables and fresh seafood, each menu item promises a feast for the senses. The lively atmosphere, combined with the interactive nature of teppanyaki, makes for an entertaining and memorable dining experience. Whether you're celebrating a special occasion or simply craving impeccable Japanese cuisine, Teppanyaki Tori delivers on all fronts.",
                images: [
                    "https://utfs.io/f/93ee23bf-9cce-4efb-aba0-ee4fae91b90b-nmks0u.jpeg",
                    "https://utfs.io/f/78870017-b23f-49a7-8a79-f1559c42a8e5-nmks0v.webp",
                    "https://utfs.io/f/09b52127-2efb-4b0d-83ce-ac6706ab599b-nmks0w.jpeg",
                    "https://utfs.io/f/9342f1af-6197-475e-8d95-29e5547f1224-nmks0x.jpeg",
                    "https://utfs.io/f/f2beb1fe-d05c-48c6-8f8b-1ecbad892f1d-nmks0y.jpeg",
                    "https://utfs.io/f/4fbfda1f-8aca-45f4-8009-1e5eac9d7228-nmks0z.jpeg",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "teppanyaki-tori",
                location_id: niagaraLocationId,
                cuisine_id: japaneseCuisineId,
            },

            // Thai -----------------------------------------------------------
            {
                name: "Bangkok Bites",
                main_image: "https://utfs.io/f/9cb59d93-3102-47b2-b030-ea34dbfb2993-8yetw2.jpeg",
                price: PRICE.CHEAP,
                description: "Step into Bangkok Bites for a taste of Thailand's buzzing street food culture. This vibrant restaurant serves an eclectic mix of dishes from every corner of Thailand, featuring classics like pad Thai, green curry, and mango sticky rice. The bustling open kitchen, colorful decor, and friendly service create an atmosphere reminiscent of a lively Bangkok food market.",
                images: [
                    "https://utfs.io/f/f0d0110e-f4d6-4fb6-9d29-428070e70834-c1xfu5.webp",
                    "https://utfs.io/f/a9a54670-c220-41f7-a409-ed4a603f86d1-c1xfu4.jpeg",
                    "https://utfs.io/f/152ab787-b08a-48a0-9674-2dc2e71dbf7c-c1xfu3.webp",
                    "https://utfs.io/f/262895c4-7e72-4316-a458-53450d43bf6d-c1xfu2.jpeg",
                    "https://utfs.io/f/4e7d87ec-81dc-445f-87b4-72199b539d65-c1xfu1.webp",
                    "https://utfs.io/f/ffc6be6a-3878-4175-b997-c2a00a2231d0-c1xfu0.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "bangkok-bites",
                location_id: toronoLocationId,
                cuisine_id: thaiCuisineId,
            },

            {
                name: "Golden Elephant",
                main_image: "https://utfs.io/f/0cb9c3f1-9cda-4a2f-ba35-332c116bb25b-8yetw1.jpeg",
                price: PRICE.REGULAR,
                description: "Golden Elephant brings the elegance and sophistication of Thai cuisine to life. This upscale eatery offers a thoughtfully curated menu of traditional Thai dishes with contemporary twists. From succulent roasted duck in red curry to delicate seafood stir-fry, each dish showcases the balance of flavors inherent to Thai cooking. Set in a luxurious decor with carved wood accents and gold detailing, Golden Elephant promises a memorable dining experience.",
                images: [
                    "https://utfs.io/f/f0d0110e-f4d6-4fb6-9d29-428070e70834-c1xfu5.webp",
                    "https://utfs.io/f/a9a54670-c220-41f7-a409-ed4a603f86d1-c1xfu4.jpeg",
                    "https://utfs.io/f/152ab787-b08a-48a0-9674-2dc2e71dbf7c-c1xfu3.webp",
                    "https://utfs.io/f/262895c4-7e72-4316-a458-53450d43bf6d-c1xfu2.jpeg",
                    "https://utfs.io/f/4e7d87ec-81dc-445f-87b4-72199b539d65-c1xfu1.webp",
                    "https://utfs.io/f/ffc6be6a-3878-4175-b997-c2a00a2231d0-c1xfu0.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "golden-elephant",
                location_id: ottawaLocationId,
                cuisine_id: thaiCuisineId,
            },

            {
                name: "Isaan Spice",
                main_image: "https://utfs.io/f/73cb88e8-f827-4f7f-a4b6-15e4451c4a02-8yetw0.jpeg",
                price: PRICE.EXPENSIVE,
                description: "Experience the bold flavors of Northeastern Thailand at Isaan Spice. Known for its spicy salads, grilled meats, and sticky rice, this restaurant explores a lesser-known but incredibly flavorful region of Thai cuisine. With its rustic interior and warm hospitality, Isaan Spice transports you straight to the heartland of Thailand.",
                images: [
                    "https://utfs.io/f/f0d0110e-f4d6-4fb6-9d29-428070e70834-c1xfu5.webp",
                    "https://utfs.io/f/a9a54670-c220-41f7-a409-ed4a603f86d1-c1xfu4.jpeg",
                    "https://utfs.io/f/152ab787-b08a-48a0-9674-2dc2e71dbf7c-c1xfu3.webp",
                    "https://utfs.io/f/262895c4-7e72-4316-a458-53450d43bf6d-c1xfu2.jpeg",
                    "https://utfs.io/f/4e7d87ec-81dc-445f-87b4-72199b539d65-c1xfu1.webp",
                    "https://utfs.io/f/ffc6be6a-3878-4175-b997-c2a00a2231d0-c1xfu0.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "isaan-spice",
                location_id: montrealLocationId,
                cuisine_id: thaiCuisineId,
            },

            {
                name: "Pad Thai Paradise",
                main_image: "https://utfs.io/f/d26f7569-4a17-4980-be4f-f7f2410f4304-8yetvz.jpeg",
                price: PRICE.CHEAP,
                description: "Specializing in one of Thailand's most beloved dishes, Pad Thai Paradise serves up a variety of versions of the iconic stir-fried noodle dish. Whether you prefer it with shrimp, chicken, tofu, or veggies, this casual eatery ensures a satisfying, flavor-packed meal with every visit.",
                images: [
                    "https://utfs.io/f/f0d0110e-f4d6-4fb6-9d29-428070e70834-c1xfu5.webp",
                    "https://utfs.io/f/a9a54670-c220-41f7-a409-ed4a603f86d1-c1xfu4.jpeg",
                    "https://utfs.io/f/152ab787-b08a-48a0-9674-2dc2e71dbf7c-c1xfu3.webp",
                    "https://utfs.io/f/262895c4-7e72-4316-a458-53450d43bf6d-c1xfu2.jpeg",
                    "https://utfs.io/f/4e7d87ec-81dc-445f-87b4-72199b539d65-c1xfu1.webp",
                    "https://utfs.io/f/ffc6be6a-3878-4175-b997-c2a00a2231d0-c1xfu0.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "pad-thai-paradise",
                location_id: kingstonLocationId,
                cuisine_id: thaiCuisineId,
            },

            {
                name: "Coconut Grove",
                main_image: "https://utfs.io/f/7e305b40-5487-44de-81fd-8aa1ce7e6e44-8yetvy.jpeg",
                price: PRICE.REGULAR,
                description: "At Coconut Grove, savor the coastal cuisine of Southern Thailand, known for its abundant use of coconut and fresh seafood. From rich, creamy curries to tangy tom yum soup, every dish captures the essence of beachside dining in Thailand. The tropical-themed decor adds to the laid-back ambiance, providing a culinary getaway.",
                images: [
                    "https://utfs.io/f/f0d0110e-f4d6-4fb6-9d29-428070e70834-c1xfu5.webp",
                    "https://utfs.io/f/a9a54670-c220-41f7-a409-ed4a603f86d1-c1xfu4.jpeg",
                    "https://utfs.io/f/152ab787-b08a-48a0-9674-2dc2e71dbf7c-c1xfu3.webp",
                    "https://utfs.io/f/262895c4-7e72-4316-a458-53450d43bf6d-c1xfu2.jpeg",
                    "https://utfs.io/f/4e7d87ec-81dc-445f-87b4-72199b539d65-c1xfu1.webp",
                    "https://utfs.io/f/ffc6be6a-3878-4175-b997-c2a00a2231d0-c1xfu0.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "coconut-grove",
                location_id: hamiltonLocationId,
                cuisine_id: thaiCuisineId,
            },

            {
                name: "Chada Street",
                main_image: "https://utfs.io/f/c5c9301d-d7eb-463f-8901-d5a9ec389bfe-8yetvx.webp",
                price: PRICE.EXPENSIVE,
                description: "Chada Street offers an adventurous Thai street food experience in a trendy, modern setting. Serving everything from hearty noodle soups and spicy salads to flavorful skewers and refreshing Thai iced tea, this eatery lets you explore the diverse flavors of Thai cuisine. The urban-chic design, adorned with graffiti art and neon signs, adds a touch of cool Bangkok street vibe.",
                images: [
                    "https://utfs.io/f/f0d0110e-f4d6-4fb6-9d29-428070e70834-c1xfu5.webp",
                    "https://utfs.io/f/a9a54670-c220-41f7-a409-ed4a603f86d1-c1xfu4.jpeg",
                    "https://utfs.io/f/152ab787-b08a-48a0-9674-2dc2e71dbf7c-c1xfu3.webp",
                    "https://utfs.io/f/262895c4-7e72-4316-a458-53450d43bf6d-c1xfu2.jpeg",
                    "https://utfs.io/f/4e7d87ec-81dc-445f-87b4-72199b539d65-c1xfu1.webp",
                    "https://utfs.io/f/ffc6be6a-3878-4175-b997-c2a00a2231d0-c1xfu0.webp",
                ],
                open_time: "11:00:00.000Z",
                close_time: "21:00:00.000Z",
                slug: "chada-street",
                location_id: niagaraLocationId,
                cuisine_id: thaiCuisineId,
            },
        ]
    })

    console.log("Finished initializing restaurant table.")

    const restaurants = await prisma.restaurant.findMany()
    const casadelsolId = restaurants.find((restaurant) => restaurant.name === "Casa Del Sol")?.id || 1
    const elcharrolocoId = restaurants.find((restaurant) => restaurant.name === "El Charro Loco")?.id || 1
    const fiestaId = restaurants.find((restaurant) => restaurant.name === "Fiesta De Mariscos")?.id || 1
    const puebloId = restaurants.find((restaurant) => restaurant.name === "Pueblo Viejo Cantina")?.id || 1
    const aztecaID = restaurants.find((restaurant) => restaurant.name === "Azteca Taquería")?.id || 1
    const verdeID = restaurants.find((restaurant) => restaurant.name === "Verde Mesa")?.id || 1
    
    const latrattoriaId = restaurants.find((restaurant) => restaurant.name === "La Trattoria Di Roma")?.id || 1
    const quattroId = restaurants.find((restaurant) => restaurant.name === "Quattro Stagioni")?.id || 1
    const vesuvioId = restaurants.find((restaurant) => restaurant.name === "Vesuvio Pizzeria")?.id || 1
    const tuscanId = restaurants.find((restaurant) => restaurant.name === "Tuscan Terrace")?.id || 1
    const venetianId = restaurants.find((restaurant) => restaurant.name === "Venetian Rialto")?.id || 1
    const sicilianId = restaurants.find((restaurant) => restaurant.name === "Sicilian Sun")?.id || 1

    const jadedragonId = restaurants.find((restaurant) => restaurant.name === "Jade Dragon")?.id || 1
    const goldenlotusId = restaurants.find((restaurant) => restaurant.name === "Golden Lotus")?.id || 1
    const bambooId = restaurants.find((restaurant) => restaurant.name === "Bamboo Harmony")?.id || 1
    const silkroadId = restaurants.find((restaurant) => restaurant.name === "Silk Road")?.id || 1
    const redlanternId = restaurants.find((restaurant) => restaurant.name === "Red Lantern")?.id || 1
    const iperialwokId = restaurants.find((restaurant) => restaurant.name === "Imperial Wok")?.id || 1

    const sakuraId = restaurants.find((restaurant) => restaurant.name === "Sakura Sushi")?.id || 1
    const kaisekiId = restaurants.find((restaurant) => restaurant.name === "Kaiseki Ryori")?.id || 1
    const ramenyaId = restaurants.find((restaurant) => restaurant.name === "Ramen-Ya Hiroshi")?.id || 1
    const izakayaId = restaurants.find((restaurant) => restaurant.name === "Izakaya Tanuki")?.id || 1
    const tempuraId = restaurants.find((restaurant) => restaurant.name === "Tempura Tenshi")?.id || 1
    const teppanyakiId = restaurants.find((restaurant) => restaurant.name === "Teppanyaki Tori")?.id || 1
    
    const bangkokId = restaurants.find((restaurant) => restaurant.name === "Bangkok Bites")?.id || 1
    const goldenId = restaurants.find((restaurant) => restaurant.name === "Golden Elephant")?.id || 1
    const isaanId = restaurants.find((restaurant) => restaurant.name === "Isaan Spice")?.id || 1
    const padthaiId = restaurants.find((restaurant) => restaurant.name === "Pad Thai Paradise")?.id || 1
    const coconutId = restaurants.find((restaurant) => restaurant.name === "Coconut Grove")?.id || 1
    const chadaId = restaurants.find((restaurant) => restaurant.name === "Chada Street")?.id || 1

    await prisma.item.createMany({
        data: [
            // casadelsolId
            {
                name: "Chiles Rellenos",
                description: "Fire-roasted poblano peppers stuffed with melting Oaxaca cheese",
                price: "$7.99",
                restaurant_id: casadelsolId
            },
            {
                name: "Tamales Casa Style",
                description: "Handmade corn masa filled with slow-cooked pork and steamed to perfection",
                price: "$10.99",
                restaurant_id: casadelsolId
            },
            {
                name: "Carne Asada Tacos",
                description: "Grilled marinated steak in soft corn tortillas topped with pico de gallo",
                price: "$8.99",
                restaurant_id: casadelsolId
            },
            {
                name: "Pollo en Mole Poblano",
                description: "Chicken bathed in a rich, dark mole sauce made from mixed chilies, spices, and chocolate",
                price: "$9.99",
                restaurant_id: casadelsolId
            },
            {
                name: "Enchiladas Suizas", 
                description: "Soft corn tortillas filled with chicken and smothered in a creamy green tomatillo salsa",
                price: "$11.99",
                restaurant_id: casadelsolId
            },
            {
                name: "Cochinita Pibil", 
                description: "Slow-roasted pork marinated in achiote and citrus juices, Yucatan style",
                price: "$16.99",
                restaurant_id: casadelsolId
            },
            {
                name: "Churros con Chocolate", 
                description: "Crispy fried dough dusted with sugar and served with warm chocolate dipping sauce",
                price: "$9.99",
                restaurant_id: casadelsolId
            },
            {
                name: "Horchata", 
                description: "Traditional Mexican rice drink flavored with cinnamon and vanilla",
                price: "$17.99",
                restaurant_id: casadelsolId
            },
            //elcharrolocoId
            {
                name: "Carnitas Tacos", 
                description: "Slow-cooked pork served in warm tortillas with chopped onions, cilantro, and salsa verde",
                price: "$7.99",
                restaurant_id: elcharrolocoId
            },
            {
                name: "Pozole Rojo", 
                description: "Spicy red soup with hominy corn and shredded chicken",
                price: "$10.99",
                restaurant_id: elcharrolocoId
            },
            {
                name: "Elote Callejero", 
                description: "Grilled street corn slathered in creamy mayo, cotija cheese, and chili powder",
                price: "$8.99",
                restaurant_id: elcharrolocoId
            },
            {
                name: "Albondigas Soup", 
                description: "Traditional meatball soup in a savory tomato broth with seasonal vegetables",
                price: "$9.99",
                restaurant_id: elcharrolocoId
            },
            {
                name: "Chiles en Nogada", 
                description: "Poblano pepper filled with picadillo (meat and fruit mix) topped with walnut cream sauce and pomegranate seeds",
                price: "$11.99",
                restaurant_id: elcharrolocoId
            },
            {
                name: "Flautas de Pollo", 
                description: "Crispy chicken-filled tortillas topped with lettuce, cream, and cheese",
                price: "$16.99",
                restaurant_id: elcharrolocoId
            },
            {
                name: "Tres Leches Cake", 
                description: "Soft sponge cake soaked in three varieties of milk and topped with whipped cream",
                price: "$9.99",
                restaurant_id: elcharrolocoId
            },
            {
                name: "Margarita Clásica", 
                description: "Classic margarita made with tequila, lime juice, and triple sec",
                price: "$17.99",
                restaurant_id: elcharrolocoId
            },
            //fiestaId
            {
                name: "Ceviche Fiesta Style", 
                description: "Fresh fish marinated in citrus juices, mixed with tomatoes, onions, jalapeños and cilantro",
                price: "$7.99",
                restaurant_id: fiestaId
            },
            {
                name: "Camaron a la Diabla", 
                description: "Shrimp cooked in spicy tomato sauce served with rice and beans",
                price: "$10.99",
                restaurant_id: fiestaId
            },
            {
                name: "Pescado al Ajillo", 
                description: "Pan-fried fish fillet served with a garlic and guajillo chili sauce",
                price: "$8.99",
                restaurant_id: fiestaId
            },
            {
                name: "Seafood Paella", 
                description: "Traditional Spanish rice dish loaded with a variety of seafood, cooked with saffron and Mexican spices",
                price: "$9.99",
                restaurant_id: fiestaId
            },
            {
                name: "Tostadas de Atun", 
                description: "Crisp tortillas topped with fresh tuna, avocado, and a chipotle mayo dressing",
                price: "$11.99",
                restaurant_id: fiestaId
            },
            {
                name: "Caldo de Mariscos", 
                description: "Hearty seafood soup with shrimp, fish, mussels, octopus, and vegetables",
                price: "$16.99",
                restaurant_id: fiestaId
            },
            {
                name: "Flan de Coco", //
                description: "Creamy coconut flan with a luscious caramel topping",
                price: "$9.99",
                restaurant_id: fiestaId
            },
            {
                name: "Michelada",
                description: "Spicy beer cocktail with lime juice, assorted sauces, spices, and peppers",
                price: "$17.99",
                restaurant_id: fiestaId
            },
            //puebloId
            {
                name: "Queso Fundido",
                description: "Melted cheese served bubbling hot with chorizo and roasted poblano peppers",
                price: "$7.99",
                restaurant_id: puebloId
            },
            {
                name: "Chiles en Nogada", 
                description: "Roasted poblano pepper filled with ground meat and fruit, topped with a creamy walnut sauce and pomegranate seeds",
                price: "$10.99",
                restaurant_id: puebloId
            },
            {
                name: "Mole Poblano", 
                description: "Tender chicken simmered in a complex sauce of chilies, spices, and chocolate",
                price: "$8.99",
                restaurant_id: puebloId
            },
            {
                name: "Tacos al Pastor", 
                description: "Marinated pork served on corn tortillas with pineapple, cilantro, and onions",
                price: "$9.99",
                restaurant_id: puebloId
            },
            {
                name: "Barbacoa de Borrego", 
                description: "Slow-cooked lamb in a rich adobo sauce served with tortillas",
                price: "$11.99",
                restaurant_id: puebloId
            },
            {
                name: "Arroz con Leche", 
                description: "Creamy rice pudding spiced with cinnamon and garnished with raisins",
                price: "$16.99",
                restaurant_id: puebloId
            },
            {
                name: "Sopa Azteca",
                description: "Traditional tortilla soup with avocado, cheese, sour cream, and pasilla chile",
                price: "$9.99",
                restaurant_id: puebloId
            },
            {
                name: "Margarita de Tamarindo",
                description: "Tangy tamarind margarita with a hint of spicy salt rim",
                price: "$17.99",
                restaurant_id: puebloId
            },
            //aztecaID
            {
                name: "Quinoa Ensalada",
                description: "Quinoa salad with roasted vegetables, black beans, avocado, and a citrus vinaigrette",
                price: "$7.99",
                restaurant_id: aztecaID
            },
            {
                name: "Veggie Tacos",
                description: "Soft corn tortillas filled with grilled seasonal vegetables and topped with salsa verde",
                price: "$10.99",
                restaurant_id: aztecaID
            },
            {
                name: "Chiles Rellenos Veganos",
                description: "Fire-roasted poblano peppers stuffed with quinoa and black beans, served with tomato sauce",
                price: "$8.99",
                restaurant_id: aztecaID
            },
            {
                name: "Enchiladas de Verduras",
                description: "Rolled corn tortillas filled with a medley of veggies and smothered in a tangy tomatillo sauce",
                price: "$9.99",
                restaurant_id: aztecaID
            },
            {
                name: "Vegan Choco Flan",
                description: "Dairy-free chocolate flan paired with almond cream",
                price: "$11.99",
                restaurant_id: aztecaID
            },
            {
                name: "Green Monster Juice",
                description: "Healthy and refreshing juice blend of kale, apple, lemon, and ginger",
                price: "$16.99",
                restaurant_id: aztecaID
            },
            {
                name: "Sopa Azteca",
                description: "Traditional tortilla soup with avocado, cheese, sour cream, and pasilla chile",
                price: "$9.99",
                restaurant_id: aztecaID
            },
            {
                name: "Margarita de Tamarindo",
                description: "Tangy tamarind margarita with a hint of spicy salt rim",
                price: "$17.99",
                restaurant_id: aztecaID
            },
            //verdeID
            {
                name: "Quinoa Ensalada",
                description: "Quinoa salad with roasted vegetables, black beans, avocado, and a citrus vinaigrette",
                price: "$7.99",
                restaurant_id: verdeID
            },
            {
                name: "Veggie Tacos",
                description: "Soft corn tortillas filled with grilled seasonal vegetables and topped with salsa verde",
                price: "$10.99",
                restaurant_id: verdeID
            },
            {
                name: "Chiles Rellenos Veganos",
                description: "Fire-roasted poblano peppers stuffed with quinoa and black beans, served with tomato sauce",
                price: "$8.99",
                restaurant_id: verdeID
            },
            {
                name: "Enchiladas de Verduras",
                description: "Rolled corn tortillas filled with a medley of veggies and smothered in a tangy tomatillo sauce",
                price: "$9.99",
                restaurant_id: verdeID
            },
            {
                name: "Vegan Choco Flan",
                description: "Dairy-free chocolate flan paired with almond cream",
                price: "$11.99",
                restaurant_id: verdeID
            },
            {
                name: "Green Monster Juice",
                description: "Healthy and refreshing juice blend of kale, apple, lemon, and ginger",
                price: "$16.99",
                restaurant_id: verdeID
            },
            {
                name: "Sopa Azteca",
                description: "Traditional tortilla soup with avocado, cheese, sour cream, and pasilla chile",
                price: "$9.99",
                restaurant_id: verdeID
            },
            {
                name: "Margarita de Tamarindo",
                description: "Tangy tamarind margarita with a hint of spicy salt rim",
                price: "$17.99",
                restaurant_id: verdeID
            },
            //latrattoriaId
            {
                name: "Antipasto All'Italiana",
                description: "A traditional starter platter filled with an assortment of Italian cured meats, cheeses, marinated vegetables, and olives",
                price: "$6.00",
                restaurant_id: latrattoriaId
            },
            {
                name: "Risotto Ai Funghi Porcini",
                description: "Creamy Arborio rice slowly cooked in a rich broth, mixed with earthy porcini mushrooms and finished with Parmesan cheese",
                price: "$29.00",
                restaurant_id: latrattoriaId
            },
            {
                name: "Pasta Alla Carbonara",
                description: "A Roman classic made with al dente spaghetti tossed in a smooth, creamy sauce of eggs, Pecorino Romano cheese, pancetta, and a touch of black pepper",
                price: "$32.00",
                restaurant_id: latrattoriaId
            },
            {
                name: "Melanzane Alla Parmigiana",
                description: "Layers of thinly sliced eggplant, tangy tomato sauce, mozzarella, and basil baked to perfection and topped with Parmesan cheese.",
                price: "$36.00",
                restaurant_id: latrattoriaId
            },
            {
                name: "Osso Buco Alla Milanese",
                description: "Slowly braised veal shanks cooked in a white wine and vegetable broth, served traditionally with gremolata and saffron-infused risotto",
                price: "$85.00",
                restaurant_id: latrattoriaId
            },
            {
                name: "Pizza Margherita",
                description: "The classic Neapolitan pizza topped with sweet San Marzano tomatoes, fresh mozzarella and aromatic basil leaves",
                price: "$44.00",
                restaurant_id: latrattoriaId
            },
            {
                name: "Tiramisu",
                description: "A timeless Italian dessert made from layers of espresso-dipped ladyfingers and sweet mascarpone cream",
                price: "$28.00",
                restaurant_id: latrattoriaId
            },
            {
                name: "Gelato Artigianale",
                description: "Handcrafted Italian ice cream available in a variety of flavors",
                price: "$58.00",
                restaurant_id: latrattoriaId
            },
            //quattroId
            {
                name: "Antipasto All'Italiana",
                description: "A traditional starter platter filled with an assortment of Italian cured meats, cheeses, marinated vegetables, and olives",
                price: "$6.00",
                restaurant_id: quattroId
            },
            {
                name: "Risotto Ai Funghi Porcini",
                description: "Creamy Arborio rice slowly cooked in a rich broth, mixed with earthy porcini mushrooms and finished with Parmesan cheese",
                price: "$29.00",
                restaurant_id: quattroId
            },
            {
                name: "Pasta Alla Carbonara",
                description: "A Roman classic made with al dente spaghetti tossed in a smooth, creamy sauce of eggs, Pecorino Romano cheese, pancetta, and a touch of black pepper",
                price: "$32.00",
                restaurant_id: quattroId
            },
            {
                name: "Melanzane Alla Parmigiana",
                description: "Layers of thinly sliced eggplant, tangy tomato sauce, mozzarella, and basil baked to perfection and topped with Parmesan cheese.",
                price: "$36.00",
                restaurant_id: quattroId
            },
            {
                name: "Osso Buco Alla Milanese",
                description: "Slowly braised veal shanks cooked in a white wine and vegetable broth, served traditionally with gremolata and saffron-infused risotto",
                price: "$85.00",
                restaurant_id: quattroId
            },
            {
                name: "Pizza Margherita",
                description: "The classic Neapolitan pizza topped with sweet San Marzano tomatoes, fresh mozzarella and aromatic basil leaves",
                price: "$44.00",
                restaurant_id: quattroId
            },
            {
                name: "Tiramisu",
                description: "A timeless Italian dessert made from layers of espresso-dipped ladyfingers and sweet mascarpone cream",
                price: "$28.00",
                restaurant_id: quattroId
            },
            {
                name: "Gelato Artigianale",
                description: "Handcrafted Italian ice cream available in a variety of flavors",
                price: "$58.00",
                restaurant_id: quattroId
            },
            //vesuvioId
            {
                name: "Antipasto All'Italiana",
                description: "A traditional starter platter filled with an assortment of Italian cured meats, cheeses, marinated vegetables, and olives",
                price: "$6.00",
                restaurant_id: vesuvioId
            },
            {
                name: "Risotto Ai Funghi Porcini",
                description: "Creamy Arborio rice slowly cooked in a rich broth, mixed with earthy porcini mushrooms and finished with Parmesan cheese",
                price: "$29.00",
                restaurant_id: vesuvioId
            },
            {
                name: "Pasta Alla Carbonara",
                description: "A Roman classic made with al dente spaghetti tossed in a smooth, creamy sauce of eggs, Pecorino Romano cheese, pancetta, and a touch of black pepper",
                price: "$32.00",
                restaurant_id: vesuvioId
            },
            {
                name: "Melanzane Alla Parmigiana",
                description: "Layers of thinly sliced eggplant, tangy tomato sauce, mozzarella, and basil baked to perfection and topped with Parmesan cheese.",
                price: "$36.00",
                restaurant_id: vesuvioId
            },
            {
                name: "Osso Buco Alla Milanese",
                description: "Slowly braised veal shanks cooked in a white wine and vegetable broth, served traditionally with gremolata and saffron-infused risotto",
                price: "$85.00",
                restaurant_id: vesuvioId
            },
            {
                name: "Pizza Margherita",
                description: "The classic Neapolitan pizza topped with sweet San Marzano tomatoes, fresh mozzarella and aromatic basil leaves",
                price: "$44.00",
                restaurant_id: vesuvioId
            },
            {
                name: "Tiramisu",
                description: "A timeless Italian dessert made from layers of espresso-dipped ladyfingers and sweet mascarpone cream",
                price: "$28.00",
                restaurant_id: vesuvioId
            },
            {
                name: "Gelato Artigianale",
                description: "Handcrafted Italian ice cream available in a variety of flavors",
                price: "$58.00",
                restaurant_id: vesuvioId
            },
            //tuscanId
            {
                name: "Antipasto All'Italiana",
                description: "A traditional starter platter filled with an assortment of Italian cured meats, cheeses, marinated vegetables, and olives",
                price: "$6.00",
                restaurant_id: tuscanId
            },
            {
                name: "Risotto Ai Funghi Porcini",
                description: "Creamy Arborio rice slowly cooked in a rich broth, mixed with earthy porcini mushrooms and finished with Parmesan cheese",
                price: "$29.00",
                restaurant_id: tuscanId
            },
            {
                name: "Pasta Alla Carbonara",
                description: "A Roman classic made with al dente spaghetti tossed in a smooth, creamy sauce of eggs, Pecorino Romano cheese, pancetta, and a touch of black pepper",
                price: "$32.00",
                restaurant_id: tuscanId
            },
            {
                name: "Melanzane Alla Parmigiana",
                description: "Layers of thinly sliced eggplant, tangy tomato sauce, mozzarella, and basil baked to perfection and topped with Parmesan cheese.",
                price: "$36.00",
                restaurant_id: tuscanId
            },
            {
                name: "Osso Buco Alla Milanese",
                description: "Slowly braised veal shanks cooked in a white wine and vegetable broth, served traditionally with gremolata and saffron-infused risotto",
                price: "$85.00",
                restaurant_id: tuscanId
            },
            {
                name: "Pizza Margherita",
                description: "The classic Neapolitan pizza topped with sweet San Marzano tomatoes, fresh mozzarella and aromatic basil leaves",
                price: "$44.00",
                restaurant_id: tuscanId
            },
            {
                name: "Tiramisu",
                description: "A timeless Italian dessert made from layers of espresso-dipped ladyfingers and sweet mascarpone cream",
                price: "$28.00",
                restaurant_id: tuscanId
            },
            {
                name: "Gelato Artigianale",
                description: "Handcrafted Italian ice cream available in a variety of flavors",
                price: "$58.00",
                restaurant_id: tuscanId
            },
            //venetianId
            {
                name: "Antipasto All'Italiana",
                description: "A traditional starter platter filled with an assortment of Italian cured meats, cheeses, marinated vegetables, and olives",
                price: "$6.00",
                restaurant_id: venetianId
            },
            {
                name: "Risotto Ai Funghi Porcini",
                description: "Creamy Arborio rice slowly cooked in a rich broth, mixed with earthy porcini mushrooms and finished with Parmesan cheese",
                price: "$29.00",
                restaurant_id: venetianId
            },
            {
                name: "Pasta Alla Carbonara",
                description: "A Roman classic made with al dente spaghetti tossed in a smooth, creamy sauce of eggs, Pecorino Romano cheese, pancetta, and a touch of black pepper",
                price: "$32.00",
                restaurant_id: venetianId
            },
            {
                name: "Melanzane Alla Parmigiana",
                description: "Layers of thinly sliced eggplant, tangy tomato sauce, mozzarella, and basil baked to perfection and topped with Parmesan cheese.",
                price: "$36.00",
                restaurant_id: venetianId
            },
            {
                name: "Osso Buco Alla Milanese",
                description: "Slowly braised veal shanks cooked in a white wine and vegetable broth, served traditionally with gremolata and saffron-infused risotto",
                price: "$85.00",
                restaurant_id: venetianId
            },
            {
                name: "Pizza Margherita",
                description: "The classic Neapolitan pizza topped with sweet San Marzano tomatoes, fresh mozzarella and aromatic basil leaves",
                price: "$44.00",
                restaurant_id: venetianId
            },
            {
                name: "Tiramisu",
                description: "A timeless Italian dessert made from layers of espresso-dipped ladyfingers and sweet mascarpone cream",
                price: "$28.00",
                restaurant_id: venetianId
            },
            {
                name: "Gelato Artigianale",
                description: "Handcrafted Italian ice cream available in a variety of flavors",
                price: "$58.00",
                restaurant_id: venetianId
            },
            //sicilianId
            {
                name: "Antipasto All'Italiana",
                description: "A traditional starter platter filled with an assortment of Italian cured meats, cheeses, marinated vegetables, and olives",
                price: "$6.00",
                restaurant_id: sicilianId
            },
            {
                name: "Risotto Ai Funghi Porcini",
                description: "Creamy Arborio rice slowly cooked in a rich broth, mixed with earthy porcini mushrooms and finished with Parmesan cheese",
                price: "$29.00",
                restaurant_id: sicilianId
            },
            {
                name: "Pasta Alla Carbonara",
                description: "A Roman classic made with al dente spaghetti tossed in a smooth, creamy sauce of eggs, Pecorino Romano cheese, pancetta, and a touch of black pepper",
                price: "$32.00",
                restaurant_id: sicilianId
            },
            {
                name: "Melanzane Alla Parmigiana",
                description: "Layers of thinly sliced eggplant, tangy tomato sauce, mozzarella, and basil baked to perfection and topped with Parmesan cheese.",
                price: "$36.00",
                restaurant_id: sicilianId
            },
            {
                name: "Osso Buco Alla Milanese",
                description: "Slowly braised veal shanks cooked in a white wine and vegetable broth, served traditionally with gremolata and saffron-infused risotto",
                price: "$85.00",
                restaurant_id: sicilianId
            },
            {
                name: "Pizza Margherita",
                description: "The classic Neapolitan pizza topped with sweet San Marzano tomatoes, fresh mozzarella and aromatic basil leaves",
                price: "$44.00",
                restaurant_id: sicilianId
            },
            {
                name: "Tiramisu",
                description: "A timeless Italian dessert made from layers of espresso-dipped ladyfingers and sweet mascarpone cream",
                price: "$28.00",
                restaurant_id: sicilianId
            },
            {
                name: "Gelato Artigianale",
                description: "Handcrafted Italian ice cream available in a variety of flavors",
                price: "$58.00",
                restaurant_id: sicilianId
            },


            //jadedragonId
            {
                name: "Kung Pao Chicken",
                description: "Diced chicken stir-fried with peanuts and chili in a savory sauce",
                price: "$15.00",
                restaurant_id: jadedragonId
            },
            {
                name: "Mapo Tofu",
                description: "Soft tofu and minced meat cooked in a fiery Sichuan sauce",
                price: "$12.00",
                restaurant_id: jadedragonId
            },
            {
                name: "Peking Duck",
                description: "Roasted duck served with pancakes, spring onions, cucumber, and sweet bean sauce",
                price: "$16.00",
                restaurant_id: jadedragonId
            },
            {
                name: "Xiao Long Bao",
                description: "Shanghai-style soup dumplings filled with minced pork and rich broth",
                price: "$16.00",
                restaurant_id: jadedragonId
            },
            {
                name: "Char Siu Bao",
                description: "Steamed buns stuffed with barbecued pork, a dim sum staple",
                price: "$20.00",
                restaurant_id: jadedragonId
            },
            {
                name: "Chow Mein",
                description: "Stir-fried noodles with vegetables and optional meat or tofu",
                price: "$38.00",
                restaurant_id: jadedragonId
            },
            {
                name: "Sweet and Sour Pork",
                description: "Deep-fried pork bites in tangy-sweet sauce with bell peppers and pineapple",
                price: "$28.00",
                restaurant_id: jadedragonId
            },
            {
                name: "Mango Sago Pomelo Dessert",
                description: "A refreshing dessert of mangoes, tapioca pearls, pomelo in a chilled mango cream",
                price: "$25.00",
                restaurant_id: jadedragonId
            },
            //goldenlotusId
            {
                name: "Kung Pao Chicken",
                description: "Diced chicken stir-fried with peanuts and chili in a savory sauce",
                price: "$15.00",
                restaurant_id: goldenlotusId
            },
            {
                name: "Mapo Tofu",
                description: "Soft tofu and minced meat cooked in a fiery Sichuan sauce",
                price: "$12.00",
                restaurant_id: goldenlotusId
            },
            {
                name: "Peking Duck",
                description: "Roasted duck served with pancakes, spring onions, cucumber, and sweet bean sauce",
                price: "$16.00",
                restaurant_id: goldenlotusId
            },
            {
                name: "Xiao Long Bao",
                description: "Shanghai-style soup dumplings filled with minced pork and rich broth",
                price: "$16.00",
                restaurant_id: goldenlotusId
            },
            {
                name: "Char Siu Bao",
                description: "Steamed buns stuffed with barbecued pork, a dim sum staple",
                price: "$20.00",
                restaurant_id: goldenlotusId
            },
            {
                name: "Chow Mein",
                description: "Stir-fried noodles with vegetables and optional meat or tofu",
                price: "$38.00",
                restaurant_id: goldenlotusId
            },
            {
                name: "Sweet and Sour Pork",
                description: "Deep-fried pork bites in tangy-sweet sauce with bell peppers and pineapple",
                price: "$28.00",
                restaurant_id: goldenlotusId
            },
            {
                name: "Mango Sago Pomelo Dessert",
                description: "A refreshing dessert of mangoes, tapioca pearls, pomelo in a chilled mango cream",
                price: "$25.00",
                restaurant_id: goldenlotusId
            },
            //bambooId
            {
                name: "Kung Pao Chicken",
                description: "Diced chicken stir-fried with peanuts and chili in a savory sauce",
                price: "$15.00",
                restaurant_id: bambooId
            },
            {
                name: "Mapo Tofu",
                description: "Soft tofu and minced meat cooked in a fiery Sichuan sauce",
                price: "$12.00",
                restaurant_id: bambooId
            },
            {
                name: "Peking Duck",
                description: "Roasted duck served with pancakes, spring onions, cucumber, and sweet bean sauce",
                price: "$16.00",
                restaurant_id: bambooId
            },
            {
                name: "Xiao Long Bao",
                description: "Shanghai-style soup dumplings filled with minced pork and rich broth",
                price: "$16.00",
                restaurant_id: bambooId
            },
            {
                name: "Char Siu Bao",
                description: "Steamed buns stuffed with barbecued pork, a dim sum staple",
                price: "$20.00",
                restaurant_id: bambooId
            },
            {
                name: "Chow Mein",
                description: "Stir-fried noodles with vegetables and optional meat or tofu",
                price: "$38.00",
                restaurant_id: bambooId
            },
            {
                name: "Sweet and Sour Pork",
                description: "Deep-fried pork bites in tangy-sweet sauce with bell peppers and pineapple",
                price: "$28.00",
                restaurant_id: bambooId
            },
            {
                name: "Mango Sago Pomelo Dessert",
                description: "A refreshing dessert of mangoes, tapioca pearls, pomelo in a chilled mango cream",
                price: "$25.00",
                restaurant_id: bambooId
            },
            //silkroadId
            {
                name: "Kung Pao Chicken",
                description: "Diced chicken stir-fried with peanuts and chili in a savory sauce",
                price: "$15.00",
                restaurant_id: silkroadId
            },
            {
                name: "Mapo Tofu",
                description: "Soft tofu and minced meat cooked in a fiery Sichuan sauce",
                price: "$12.00",
                restaurant_id: silkroadId
            },
            {
                name: "Peking Duck",
                description: "Roasted duck served with pancakes, spring onions, cucumber, and sweet bean sauce",
                price: "$16.00",
                restaurant_id: silkroadId
            },
            {
                name: "Xiao Long Bao",
                description: "Shanghai-style soup dumplings filled with minced pork and rich broth",
                price: "$16.00",
                restaurant_id: silkroadId
            },
            {
                name: "Char Siu Bao",
                description: "Steamed buns stuffed with barbecued pork, a dim sum staple",
                price: "$20.00",
                restaurant_id: silkroadId
            },
            {
                name: "Chow Mein",
                description: "Stir-fried noodles with vegetables and optional meat or tofu",
                price: "$38.00",
                restaurant_id: silkroadId
            },
            {
                name: "Sweet and Sour Pork",
                description: "Deep-fried pork bites in tangy-sweet sauce with bell peppers and pineapple",
                price: "$28.00",
                restaurant_id: silkroadId
            },
            {
                name: "Mango Sago Pomelo Dessert",
                description: "A refreshing dessert of mangoes, tapioca pearls, pomelo in a chilled mango cream",
                price: "$25.00",
                restaurant_id: silkroadId
            },
            //redlanternId
            {
                name: "Kung Pao Chicken",
                description: "Diced chicken stir-fried with peanuts and chili in a savory sauce",
                price: "$15.00",
                restaurant_id: redlanternId
            },
            {
                name: "Mapo Tofu",
                description: "Soft tofu and minced meat cooked in a fiery Sichuan sauce",
                price: "$12.00",
                restaurant_id: redlanternId
            },
            {
                name: "Peking Duck",
                description: "Roasted duck served with pancakes, spring onions, cucumber, and sweet bean sauce",
                price: "$16.00",
                restaurant_id: redlanternId
            },
            {
                name: "Xiao Long Bao",
                description: "Shanghai-style soup dumplings filled with minced pork and rich broth",
                price: "$16.00",
                restaurant_id: redlanternId
            },
            {
                name: "Char Siu Bao",
                description: "Steamed buns stuffed with barbecued pork, a dim sum staple",
                price: "$20.00",
                restaurant_id: redlanternId
            },
            {
                name: "Chow Mein",
                description: "Stir-fried noodles with vegetables and optional meat or tofu",
                price: "$38.00",
                restaurant_id: redlanternId
            },
            {
                name: "Sweet and Sour Pork",
                description: "Deep-fried pork bites in tangy-sweet sauce with bell peppers and pineapple",
                price: "$28.00",
                restaurant_id: redlanternId
            },
            {
                name: "Mango Sago Pomelo Dessert",
                description: "A refreshing dessert of mangoes, tapioca pearls, pomelo in a chilled mango cream",
                price: "$25.00",
                restaurant_id: redlanternId
            },
            //iperialwokId
            {
                name: "Kung Pao Chicken",
                description: "Diced chicken stir-fried with peanuts and chili in a savory sauce",
                price: "$15.00",
                restaurant_id: iperialwokId
            },
            {
                name: "Mapo Tofu",
                description: "Soft tofu and minced meat cooked in a fiery Sichuan sauce",
                price: "$12.00",
                restaurant_id: iperialwokId
            },
            {
                name: "Peking Duck",
                description: "Roasted duck served with pancakes, spring onions, cucumber, and sweet bean sauce",
                price: "$16.00",
                restaurant_id: iperialwokId
            },
            {
                name: "Xiao Long Bao",
                description: "Shanghai-style soup dumplings filled with minced pork and rich broth",
                price: "$16.00",
                restaurant_id: iperialwokId
            },
            {
                name: "Char Siu Bao",
                description: "Steamed buns stuffed with barbecued pork, a dim sum staple",
                price: "$20.00",
                restaurant_id: iperialwokId
            },
            {
                name: "Chow Mein",
                description: "Stir-fried noodles with vegetables and optional meat or tofu",
                price: "$38.00",
                restaurant_id: iperialwokId
            },
            {
                name: "Sweet and Sour Pork",
                description: "Deep-fried pork bites in tangy-sweet sauce with bell peppers and pineapple",
                price: "$28.00",
                restaurant_id: iperialwokId
            },
            {
                name: "Mango Sago Pomelo Dessert",
                description: "A refreshing dessert of mangoes, tapioca pearls, pomelo in a chilled mango cream",
                price: "$25.00",
                restaurant_id: iperialwokId
            },

            //sakuraId
            {
                name: "Sushi Moriawase",
                description: "Assorted sushi platter featuring various types of fresh fish",
                price: "$14.00",
                restaurant_id: sakuraId
            },
            {
                name: "Shoyu Ramen",
                description: "Soy-based broth ramen served with noodles, pork slices, and green onions",
                price: "$14.00",
                restaurant_id: sakuraId
            },
            {
                name: "Tempura Udon",
                description: "Thick noodle soup topped with crispy tempura prawns or vegetables",
                price: "$14.00",
                restaurant_id: sakuraId
            },
            {
                name: "Tonkatsu",
                description: "Breaded and deep-fried pork cutlet, usually served with cabbage and rice",
                price: "$14.00",
                restaurant_id: sakuraId
            },
            {
                name: "Yakitori",
                description: "Grilled chicken skewers seasoned with teriyaki sauce",
                price: "$32.00",
                restaurant_id: sakuraId
            },
            {
                name: "Unagi Don",
                description: "Grilled eel served over a bowl of steamed rice",
                price: "$44.00",
                restaurant_id: sakuraId
            },
            {
                name: "Chawanmushi",
                description: "Savory egg custard steamed in a cup, often with added ingredients like shrimp or mushrooms",
                price: "$24.00",
                restaurant_id: sakuraId
            },
            {
                name: "Matcha Ice Cream",
                description: "Creamy ice cream made with matcha (green tea) powder",
                price: "$32.00",
                restaurant_id: sakuraId
            },
            //kaisekiId
            {
                name: "Sushi Moriawase",
                description: "Assorted sushi platter featuring various types of fresh fish",
                price: "$14.00",
                restaurant_id: kaisekiId
            },
            {
                name: "Shoyu Ramen",
                description: "Soy-based broth ramen served with noodles, pork slices, and green onions",
                price: "$14.00",
                restaurant_id: kaisekiId
            },
            {
                name: "Tempura Udon",
                description: "Thick noodle soup topped with crispy tempura prawns or vegetables",
                price: "$14.00",
                restaurant_id: kaisekiId
            },
            {
                name: "Tonkatsu",
                description: "Breaded and deep-fried pork cutlet, usually served with cabbage and rice",
                price: "$14.00",
                restaurant_id: kaisekiId
            },
            {
                name: "Yakitori",
                description: "Grilled chicken skewers seasoned with teriyaki sauce",
                price: "$32.00",
                restaurant_id: kaisekiId
            },
            {
                name: "Unagi Don",
                description: "Grilled eel served over a bowl of steamed rice",
                price: "$44.00",
                restaurant_id: kaisekiId
            },
            {
                name: "Chawanmushi",
                description: "Savory egg custard steamed in a cup, often with added ingredients like shrimp or mushrooms",
                price: "$24.00",
                restaurant_id: kaisekiId
            },
            {
                name: "Matcha Ice Cream",
                description: "Creamy ice cream made with matcha (green tea) powder",
                price: "$32.00",
                restaurant_id: kaisekiId
            },
            //ramenyaId
            {
                name: "Sushi Moriawase",
                description: "Assorted sushi platter featuring various types of fresh fish",
                price: "$14.00",
                restaurant_id: ramenyaId
            },
            {
                name: "Shoyu Ramen",
                description: "Soy-based broth ramen served with noodles, pork slices, and green onions",
                price: "$14.00",
                restaurant_id: ramenyaId
            },
            {
                name: "Tempura Udon",
                description: "Thick noodle soup topped with crispy tempura prawns or vegetables",
                price: "$14.00",
                restaurant_id: ramenyaId
            },
            {
                name: "Tonkatsu",
                description: "Breaded and deep-fried pork cutlet, usually served with cabbage and rice",
                price: "$14.00",
                restaurant_id: ramenyaId
            },
            {
                name: "Yakitori",
                description: "Grilled chicken skewers seasoned with teriyaki sauce",
                price: "$32.00",
                restaurant_id: ramenyaId
            },
            {
                name: "Unagi Don",
                description: "Grilled eel served over a bowl of steamed rice",
                price: "$44.00",
                restaurant_id: ramenyaId
            },
            {
                name: "Chawanmushi",
                description: "Savory egg custard steamed in a cup, often with added ingredients like shrimp or mushrooms",
                price: "$24.00",
                restaurant_id: ramenyaId
            },
            {
                name: "Matcha Ice Cream",
                description: "Creamy ice cream made with matcha (green tea) powder",
                price: "$32.00",
                restaurant_id: ramenyaId
            },
            //izakayaId
            {
                name: "Sushi Moriawase",
                description: "Assorted sushi platter featuring various types of fresh fish",
                price: "$14.00",
                restaurant_id: izakayaId
            },
            {
                name: "Shoyu Ramen",
                description: "Soy-based broth ramen served with noodles, pork slices, and green onions",
                price: "$14.00",
                restaurant_id: izakayaId
            },
            {
                name: "Tempura Udon",
                description: "Thick noodle soup topped with crispy tempura prawns or vegetables",
                price: "$14.00",
                restaurant_id: izakayaId
            },
            {
                name: "Tonkatsu",
                description: "Breaded and deep-fried pork cutlet, usually served with cabbage and rice",
                price: "$14.00",
                restaurant_id: izakayaId
            },
            {
                name: "Yakitori",
                description: "Grilled chicken skewers seasoned with teriyaki sauce",
                price: "$32.00",
                restaurant_id: izakayaId
            },
            {
                name: "Unagi Don",
                description: "Grilled eel served over a bowl of steamed rice",
                price: "$44.00",
                restaurant_id: izakayaId
            },
            {
                name: "Chawanmushi",
                description: "Savory egg custard steamed in a cup, often with added ingredients like shrimp or mushrooms",
                price: "$24.00",
                restaurant_id: izakayaId
            },
            {
                name: "Matcha Ice Cream",
                description: "Creamy ice cream made with matcha (green tea) powder",
                price: "$32.00",
                restaurant_id: izakayaId
            },
            //tempuraId
            {
                name: "Sushi Moriawase",
                description: "Assorted sushi platter featuring various types of fresh fish",
                price: "$14.00",
                restaurant_id: tempuraId
            },
            {
                name: "Shoyu Ramen",
                description: "Soy-based broth ramen served with noodles, pork slices, and green onions",
                price: "$14.00",
                restaurant_id: tempuraId
            },
            {
                name: "Tempura Udon",
                description: "Thick noodle soup topped with crispy tempura prawns or vegetables",
                price: "$14.00",
                restaurant_id: tempuraId
            },
            {
                name: "Tonkatsu",
                description: "Breaded and deep-fried pork cutlet, usually served with cabbage and rice",
                price: "$14.00",
                restaurant_id: tempuraId
            },
            {
                name: "Yakitori",
                description: "Grilled chicken skewers seasoned with teriyaki sauce",
                price: "$32.00",
                restaurant_id: tempuraId
            },
            {
                name: "Unagi Don",
                description: "Grilled eel served over a bowl of steamed rice",
                price: "$44.00",
                restaurant_id: tempuraId
            },
            {
                name: "Chawanmushi",
                description: "Savory egg custard steamed in a cup, often with added ingredients like shrimp or mushrooms",
                price: "$24.00",
                restaurant_id: tempuraId
            },
            {
                name: "Matcha Ice Cream",
                description: "Creamy ice cream made with matcha (green tea) powder",
                price: "$32.00",
                restaurant_id: tempuraId
            },
            //teppanyakiId
            {
                name: "Sushi Moriawase",
                description: "Assorted sushi platter featuring various types of fresh fish",
                price: "$14.00",
                restaurant_id: teppanyakiId
            },
            {
                name: "Shoyu Ramen",
                description: "Soy-based broth ramen served with noodles, pork slices, and green onions",
                price: "$14.00",
                restaurant_id: teppanyakiId
            },
            {
                name: "Tempura Udon",
                description: "Thick noodle soup topped with crispy tempura prawns or vegetables",
                price: "$14.00",
                restaurant_id: teppanyakiId
            },
            {
                name: "Tonkatsu",
                description: "Breaded and deep-fried pork cutlet, usually served with cabbage and rice",
                price: "$14.00",
                restaurant_id: teppanyakiId
            },
            {
                name: "Yakitori",
                description: "Grilled chicken skewers seasoned with teriyaki sauce",
                price: "$32.00",
                restaurant_id: teppanyakiId
            },
            {
                name: "Unagi Don",
                description: "Grilled eel served over a bowl of steamed rice",
                price: "$44.00",
                restaurant_id: teppanyakiId
            },
            {
                name: "Chawanmushi",
                description: "Savory egg custard steamed in a cup, often with added ingredients like shrimp or mushrooms",
                price: "$24.00",
                restaurant_id: teppanyakiId
            },
            {
                name: "Matcha Ice Cream",
                description: "Creamy ice cream made with matcha (green tea) powder",
                price: "$32.00",
                restaurant_id: teppanyakiId
            },

            //bangkokId
            {
                name: "Pad Thai",
                description: "Stir-fried rice noodles with eggs, tofu or shrimp, peanuts, and bean sprouts",
                price: "$14.95",
                restaurant_id: bangkokId
            },
            {
                name: "Tom Yum Soup",
                description: "Spicy and sour soup with shrimp, mushrooms, and fragrant herbs",
                price: "$18.95",
                restaurant_id: bangkokId
            },
            {
                name: "Green Curry",
                description: "Creamy coconut milk-based curry with green chili, eggplant, bell peppers, and basil",
                price: "$9.95",
                restaurant_id: bangkokId
            },
            {
                name: "Massaman Curry",
                description: "Rich, sweet curry with flavors of cinnamon and nutmeg, usually made with potatoes and beef",
                price: "$34.95",
                restaurant_id: bangkokId
            },
            {
                name: "Som Tam",
                description: "Spicy green papaya salad with tomatoes, long beans, peanuts, and lime juice",
                price: "$18.95",
                restaurant_id: bangkokId
            },
            {
                name: "Khao Pad",
                description: "Thai-style fried rice, often served with chicken, shrimp, or crab",
                price: "$33.95",
                restaurant_id: bangkokId
            },
            {
                name: "Moo Ping",
                description: "Grilled pork skewers marinated in a sweet and tangy sauce",
                price: "$18.95",
                restaurant_id: bangkokId
            },
            {
                name: "Mango Sticky Rice",
                description: "Sweet dessert made from glutinous rice, fresh mango slices, and coconut milk",
                price: "$18.95",
                restaurant_id: bangkokId
            },
            //goldenId
            {
                name: "Pad Thai",
                description: "Stir-fried rice noodles with eggs, tofu or shrimp, peanuts, and bean sprouts",
                price: "$14.95",
                restaurant_id: goldenId
            },
            {
                name: "Tom Yum Soup",
                description: "Spicy and sour soup with shrimp, mushrooms, and fragrant herbs",
                price: "$18.95",
                restaurant_id: goldenId
            },
            {
                name: "Green Curry",
                description: "Creamy coconut milk-based curry with green chili, eggplant, bell peppers, and basil",
                price: "$9.95",
                restaurant_id: goldenId
            },
            {
                name: "Massaman Curry",
                description: "Rich, sweet curry with flavors of cinnamon and nutmeg, usually made with potatoes and beef",
                price: "$34.95",
                restaurant_id: goldenId
            },
            {
                name: "Som Tam",
                description: "Spicy green papaya salad with tomatoes, long beans, peanuts, and lime juice",
                price: "$18.95",
                restaurant_id: goldenId
            },
            {
                name: "Khao Pad",
                description: "Thai-style fried rice, often served with chicken, shrimp, or crab",
                price: "$33.95",
                restaurant_id: goldenId
            },
            {
                name: "Moo Ping",
                description: "Grilled pork skewers marinated in a sweet and tangy sauce",
                price: "$18.95",
                restaurant_id: goldenId
            },
            {
                name: "Mango Sticky Rice",
                description: "Sweet dessert made from glutinous rice, fresh mango slices, and coconut milk",
                price: "$18.95",
                restaurant_id: goldenId
            },
            //isaanId
            {
                name: "Pad Thai",
                description: "Stir-fried rice noodles with eggs, tofu or shrimp, peanuts, and bean sprouts",
                price: "$14.95",
                restaurant_id: isaanId
            },
            {
                name: "Tom Yum Soup",
                description: "Spicy and sour soup with shrimp, mushrooms, and fragrant herbs",
                price: "$18.95",
                restaurant_id: isaanId
            },
            {
                name: "Green Curry",
                description: "Creamy coconut milk-based curry with green chili, eggplant, bell peppers, and basil",
                price: "$9.95",
                restaurant_id: isaanId
            },
            {
                name: "Massaman Curry",
                description: "Rich, sweet curry with flavors of cinnamon and nutmeg, usually made with potatoes and beef",
                price: "$34.95",
                restaurant_id: isaanId
            },
            {
                name: "Som Tam",
                description: "Spicy green papaya salad with tomatoes, long beans, peanuts, and lime juice",
                price: "$18.95",
                restaurant_id: isaanId
            },
            {
                name: "Khao Pad",
                description: "Thai-style fried rice, often served with chicken, shrimp, or crab",
                price: "$33.95",
                restaurant_id: isaanId
            },
            {
                name: "Moo Ping",
                description: "Grilled pork skewers marinated in a sweet and tangy sauce",
                price: "$18.95",
                restaurant_id: isaanId
            },
            {
                name: "Mango Sticky Rice",
                description: "Sweet dessert made from glutinous rice, fresh mango slices, and coconut milk",
                price: "$18.95",
                restaurant_id: isaanId
            },
            //padthaiId
            {
                name: "Pad Thai",
                description: "Stir-fried rice noodles with eggs, tofu or shrimp, peanuts, and bean sprouts",
                price: "$14.95",
                restaurant_id: padthaiId
            },
            {
                name: "Tom Yum Soup",
                description: "Spicy and sour soup with shrimp, mushrooms, and fragrant herbs",
                price: "$18.95",
                restaurant_id: padthaiId
            },
            {
                name: "Green Curry",
                description: "Creamy coconut milk-based curry with green chili, eggplant, bell peppers, and basil",
                price: "$9.95",
                restaurant_id: padthaiId
            },
            {
                name: "Massaman Curry",
                description: "Rich, sweet curry with flavors of cinnamon and nutmeg, usually made with potatoes and beef",
                price: "$34.95",
                restaurant_id: padthaiId
            },
            {
                name: "Som Tam",
                description: "Spicy green papaya salad with tomatoes, long beans, peanuts, and lime juice",
                price: "$18.95",
                restaurant_id: padthaiId
            },
            {
                name: "Khao Pad",
                description: "Thai-style fried rice, often served with chicken, shrimp, or crab",
                price: "$33.95",
                restaurant_id: padthaiId
            },
            {
                name: "Moo Ping",
                description: "Grilled pork skewers marinated in a sweet and tangy sauce",
                price: "$18.95",
                restaurant_id: padthaiId
            },
            {
                name: "Mango Sticky Rice",
                description: "Sweet dessert made from glutinous rice, fresh mango slices, and coconut milk",
                price: "$18.95",
                restaurant_id: padthaiId
            },
            //coconutId
            {
                name: "Pad Thai",
                description: "Stir-fried rice noodles with eggs, tofu or shrimp, peanuts, and bean sprouts",
                price: "$14.95",
                restaurant_id: coconutId
            },
            {
                name: "Tom Yum Soup",
                description: "Spicy and sour soup with shrimp, mushrooms, and fragrant herbs",
                price: "$18.95",
                restaurant_id: coconutId
            },
            {
                name: "Green Curry",
                description: "Creamy coconut milk-based curry with green chili, eggplant, bell peppers, and basil",
                price: "$9.95",
                restaurant_id: coconutId
            },
            {
                name: "Massaman Curry",
                description: "Rich, sweet curry with flavors of cinnamon and nutmeg, usually made with potatoes and beef",
                price: "$34.95",
                restaurant_id: coconutId
            },
            {
                name: "Som Tam",
                description: "Spicy green papaya salad with tomatoes, long beans, peanuts, and lime juice",
                price: "$18.95",
                restaurant_id: coconutId
            },
            {
                name: "Khao Pad",
                description: "Thai-style fried rice, often served with chicken, shrimp, or crab",
                price: "$33.95",
                restaurant_id: coconutId
            },
            {
                name: "Moo Ping",
                description: "Grilled pork skewers marinated in a sweet and tangy sauce",
                price: "$18.95",
                restaurant_id: coconutId
            },
            {
                name: "Mango Sticky Rice",
                description: "Sweet dessert made from glutinous rice, fresh mango slices, and coconut milk",
                price: "$18.95",
                restaurant_id: coconutId
            },
            //chadaId
            {
                name: "Pad Thai",
                description: "Stir-fried rice noodles with eggs, tofu or shrimp, peanuts, and bean sprouts",
                price: "$14.95",
                restaurant_id: chadaId
            },
            {
                name: "Tom Yum Soup",
                description: "Spicy and sour soup with shrimp, mushrooms, and fragrant herbs",
                price: "$18.95",
                restaurant_id: chadaId
            },
            {
                name: "Green Curry",
                description: "Creamy coconut milk-based curry with green chili, eggplant, bell peppers, and basil",
                price: "$9.95",
                restaurant_id: chadaId
            },
            {
                name: "Massaman Curry",
                description: "Rich, sweet curry with flavors of cinnamon and nutmeg, usually made with potatoes and beef",
                price: "$34.95",
                restaurant_id: chadaId
            },
            {
                name: "Som Tam",
                description: "Spicy green papaya salad with tomatoes, long beans, peanuts, and lime juice",
                price: "$18.95",
                restaurant_id: chadaId
            },
            {
                name: "Khao Pad",
                description: "Thai-style fried rice, often served with chicken, shrimp, or crab",
                price: "$33.95",
                restaurant_id: chadaId
            },
            {
                name: "Moo Ping",
                description: "Grilled pork skewers marinated in a sweet and tangy sauce",
                price: "$18.95",
                restaurant_id: chadaId
            },
            {
                name: "Mango Sticky Rice",
                description: "Sweet dessert made from glutinous rice, fresh mango slices, and coconut milk",
                price: "$18.95",
                restaurant_id: chadaId
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
                restaurant_id: casadelsolId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: elcharrolocoId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: fiestaId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: puebloId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: aztecaID,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: verdeID,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: latrattoriaId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: quattroId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: vesuvioId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: tuscanId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: venetianId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: sicilianId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: jadedragonId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: goldenlotusId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: bambooId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: silkroadId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: redlanternId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: iperialwokId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: sakuraId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: kaisekiId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: ramenyaId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: izakayaId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: tempuraId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: teppanyakiId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: bangkokId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: goldenId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: isaanId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: padthaiId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: coconutId,
                user_id: userLaithId,
            },
            {
                first_name: "Laith",
                last_name: "Harb",
                text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
                rating: 5,
                restaurant_id: chadaId,
                user_id: userLaithId,
            },

            //Josh Allen
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: casadelsolId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: elcharrolocoId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: fiestaId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: puebloId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: aztecaID,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: verdeID,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: latrattoriaId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: quattroId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: vesuvioId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: tuscanId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: venetianId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: sicilianId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: jadedragonId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: goldenlotusId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: bambooId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: silkroadId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: redlanternId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: iperialwokId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: sakuraId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: kaisekiId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: ramenyaId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: izakayaId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: tempuraId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: teppanyakiId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: bangkokId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: goldenId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: isaanId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: padthaiId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: coconutId,
                user_id: userJoshId,
            },
            {
                first_name: "Josh",
                last_name: "Allen",
                text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
                rating: 5,
                restaurant_id: chadaId,
                user_id: userJoshId,
            },
            //LeBron James
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: casadelsolId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: elcharrolocoId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: fiestaId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: puebloId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: aztecaID,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: verdeID,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: latrattoriaId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: quattroId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: vesuvioId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: tuscanId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: venetianId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: sicilianId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: jadedragonId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: goldenlotusId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: bambooId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: silkroadId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: redlanternId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: iperialwokId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: sakuraId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: kaisekiId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: ramenyaId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: izakayaId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: tempuraId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: teppanyakiId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: bangkokId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: goldenId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: isaanId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: padthaiId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: coconutId,
                user_id: userLeBronId,
            },
            {
                first_name: "LeBron",
                last_name: "James",
                text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
                rating: 5,
                restaurant_id: chadaId,
                user_id: userLeBronId,
            },

            //Cassidy
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: casadelsolId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: elcharrolocoId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: fiestaId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: puebloId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: aztecaID,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: verdeID,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: latrattoriaId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: quattroId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: vesuvioId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: tuscanId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: venetianId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: sicilianId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: jadedragonId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: goldenlotusId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: bambooId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: silkroadId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: redlanternId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: iperialwokId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: sakuraId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: kaisekiId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: ramenyaId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: izakayaId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: tempuraId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: teppanyakiId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: bangkokId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: goldenId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: isaanId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: padthaiId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: coconutId,
                user_id: userCassidyId,
            },
            {
                first_name: "Cassidy",
                last_name: "Marksom",
                text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
                rating: 4,
                restaurant_id: chadaId,
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