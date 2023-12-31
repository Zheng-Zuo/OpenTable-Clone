import { useState } from "react"
import axios from "axios"

interface Props {
    slug: string;
    day: string;
    time: string;
    partySize: string;
}

export default function useAvailabilities() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState<{ time: string; available: boolean }[] | null>(null)

    const fetchAvailabilities = async ({ slug, day, time, partySize }: Props) => {
        setLoading(true)

        try {
            const response = await axios.get(`/api/restaurant/${slug}/availability`,
                {
                    params: {
                        day,
                        time,
                        partySize,
                    }
                })
            setLoading(false)
            setData(response.data)
        } catch (error: any) {
            setLoading(false)
            setError(error.response.data.errorMessage)
        }
    }

    return { loading, data, error, fetchAvailabilities }
}