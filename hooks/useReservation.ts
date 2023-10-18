import { useState } from "react";
import axios from "axios"

interface reservationInputType {
    slug: string;
    day: string;
    time: string;
    partySize: string;
    bookerFirstName: string;
    bookerLastName: string;
    bookerPhone: string;
    bookerEmail: string;
    bookerOccasion?: string;
    bookerRequest?: string;
    setDidBook(value: boolean): void;
}

export default function useReservation() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const createReservation = async ({
        slug,
        day,
        time,
        partySize,
        bookerFirstName,
        bookerLastName,
        bookerPhone,
        bookerEmail,
        bookerOccasion,
        bookerRequest,
        setDidBook,
    }: reservationInputType) => {
        setLoading(true)

        try {
            const response = await axios.post(
                `http://localhost:3000/api/restaurant/${slug}/reserve`,
                {
                    bookerFirstName,
                    bookerLastName,
                    bookerPhone,
                    bookerEmail,
                    bookerOccasion,
                    bookerRequest,
                },
                {
                    params: {
                        day,
                        time,
                        partySize
                    }
                }
            )

            setLoading(false)
            setDidBook(true)
            return response.data
        } catch (error: any) {
            setLoading(false)
            setError(error.response.data.errorMessage)
        }
    }

    return { loading, error, createReservation }
}