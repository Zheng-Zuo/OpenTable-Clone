import { BookingCard, BookingForm, NavBar } from "@/sections"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Reserve'
}

export default function Page({
    params,
    searchParams
}: {
    params: { slug: string };
    searchParams: { date: string; partySize: string }
}) {
    const { slug } = params
    const { date, partySize } = searchParams
    return (
        <>
            <div className="border-t h-[97%]">
                <div className="py-9 w-3/5 m-auto">
                    <BookingCard slug={slug} date={date} partySize={partySize} />
                    <div className="mt-10 max-w-[660px]">
                        <BookingForm slug={slug} date={date} partySize={partySize} />
                    </div>
                </div>
            </div>
        </>
    )
}