"use client"

import { useGlobalStates } from "@/components/ContextApi/GlobalStatesProvider";
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { filterToString } from "@/lib/utils";
import { Cuisine, Location } from "@prisma/client"
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, MouseEvent } from "react";

interface priceButton {
    id: number;
    symbol: string;
    value: string;
    description: string;
}

const priceButtons: priceButton[] = [
    { id: 1, symbol: "$$", value: "CHEAP", description: "$40 or less" },
    { id: 2, symbol: "$$$", value: "REGULAR", description: "$41 to $65" },
    { id: 3, symbol: "$$$$", value: "EXPENSIVE", description: "$65 or more" }
]

interface Props {
    cuisines: Cuisine[];
    locations: Location[];
}

const SearchCard = ({ cuisines, locations }: Props) => {
    const router = useRouter()
    const {
        filters,
        setFilters,
        shouldRedirect,
        setShouldRedirect,
        activePriceButtons,
        setActivePriceButtons,
    } = useGlobalStates()

    const handleFilterChange = (type: "locations" | "cuisines" | "prices",
        e: ChangeEvent<HTMLInputElement>,
    ) => {
        const newFilters = { ...filters }
        if (e.target.checked) {
            newFilters[type] = [...newFilters[type], e.target.value]
        } else {
            newFilters[type] = newFilters[type].filter(v => v !== e.target.value)
        }
        setFilters(newFilters)
        setShouldRedirect(true)
    }

    const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleFilterChange("locations", e)
    }

    const handleCuisineChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleFilterChange("cuisines", e)
    }

    const handlePriceChange = (value: string) => {
        const newFilters = { ...filters }
        if (newFilters.prices.includes(value)) {
            newFilters.prices = newFilters.prices.filter(v => v !== value)
            setActivePriceButtons(activePriceButtons.filter(button => button !== value))
        } else {
            newFilters.prices.push(value)
            setActivePriceButtons([...activePriceButtons, value])
        }
        setFilters(newFilters)
        setShouldRedirect(true)
    }

    useEffect(() => {
        if (!shouldRedirect) return
        router.push(`/search?filters=${filterToString(filters)}`)
    }, [filters, shouldRedirect]);

    return (
        <div>
            <div className="border-b pb-4">
                <h1 className="mb-2">Region</h1>

                {locations.map((location, i) => {
                    const checked = filters.locations.includes(location.name)
                    return (
                        <div
                            key={i}
                            className="flex gap-2 justify-start items-center"
                        >
                            <input
                                type="checkbox"
                                id={`input-${location.name}`}
                                onChange={(e) => handleLocationChange(e)}
                                value={location.name}
                                checked={checked}
                            />
                            <label
                                htmlFor={`input-${location.name}`}
                                className="font-light text-reg capitalize"
                            >
                                {location.name}
                            </label>
                        </div>
                    )
                })
                }
            </div>

            <div className="border-b pb-3">
                <h1 className="mb-2">Cuisine</h1>

                {cuisines.map((cuisine, i) => {
                    const checked = filters.cuisines.includes(cuisine.name)
                    return (
                        <div
                            key={i}
                            className="flex gap-2 justify-start items-center"
                        >
                            <input
                                type="checkbox"
                                id={`input-${cuisine.name}`}
                                onChange={(e) => handleCuisineChange(e)}
                                checked={checked}
                                value={cuisine.name}
                            />
                            <label
                                htmlFor={`input-${cuisine.name}`}
                                className="font-light text-reg capitalize"
                            >
                                {cuisine.name}
                            </label>
                        </div>
                    )
                })
                }


            </div>

            <div className="mt-3 pb-4">
                <h1 className="mb-2">Price</h1>
                <div className="flex w-full max-xl:flex-col">
                    <TooltipProvider>
                        {priceButtons.map((item, index) => (
                            <Tooltip key={index}>
                                <TooltipTrigger asChild>
                                    <Button
                                        value={item.value}
                                        variant="outline"
                                        className={`flex-1 font-light text-reg 
                                          ${activePriceButtons.includes(item.value) ? 'bg-slate-400' : ''}`}
                                        onClick={
                                            () => handlePriceChange(item.value)
                                        }
                                    >
                                        {item.symbol}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{item.description}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </TooltipProvider>
                </div>
            </div>
        </div>
    )
}

export default SearchCard
