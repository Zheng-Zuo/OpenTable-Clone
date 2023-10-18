"use client"

import { useGlobalStates } from "@/components/ContextApi/GlobalStatesProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { KeyboardEvent } from "react"


const SearchBar = () => {

    const router = useRouter()
    const {
        searchText,
        setSearchText,
        setFilters,
        setShouldRedirect,
        setActivePriceButtons
    } = useGlobalStates()

    const handleClick = () => {
        const newFilters = { locations: [], cuisines: [], prices: [] }
        setFilters(newFilters)
        setShouldRedirect(false)
        setActivePriceButtons([])

        router.push(`/search?query=${searchText}`)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === 'Return') {
            handleClick()
        }
    }

    return (
        <div className='text-left text-lg py-3 flex 
                  max-sm:flex-col justify-center items-center gap-2'>
            <Input
                className="rounded lg:mr-3 p-2 w-[50%]"
                type="text"
                placeholder="City, cuisine or name"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <Button className="rounded bg-red-600 px-9 py-2 
                      text-white max-sm:w-[50%]"
                onClick={handleClick}
            >
                Let&apos;s go
            </Button>
        </div>
    )
}

export default SearchBar
