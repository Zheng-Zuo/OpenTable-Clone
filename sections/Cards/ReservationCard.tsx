"use client"

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { partySizes, times } from '@/constants'
import DatePicker from "react-datepicker"
import { useState } from 'react'
import useAvailabilities from '@/hooks/useAvailabilities'
import { CircularProgress } from '@mui/material'
import Link from 'next/link'
import { Time, convertToDisplayTime } from '@/lib/utils'


const ReservationCard = (
    { openTime, closeTime, slug }: { openTime: string; closeTime: string; slug: string }
) => {
    const { data, loading, error, fetchAvailabilities } = useAvailabilities()
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
    const [day, setDay] = useState(new Date().toISOString().split("T")[0])
    const [time, setTime] = useState(openTime)
    const [partySize, setPartySize] = useState("2")

    const handleChangeDate = (date: Date | null) => {
        if (date) {
            setDay(date.toISOString().split("T")[0])
            return setSelectedDate(date)
        }
        return setSelectedDate(null)
    }

    const handleClick = () => {
        fetchAvailabilities({
            slug,
            day,
            time,
            partySize
        })
    }

    const filterTimeByRestaurantOpenWindow = () => {
        const timesInWindow: typeof times = []
        let isWithinWindow = false
        times.forEach(time => {
            if (time.time === openTime) {
                isWithinWindow = true
            } else if (time.time === closeTime) {
                isWithinWindow = false
            }
            if (isWithinWindow) {
                timesInWindow.push(time)
            }
        })
        return timesInWindow
    }

    return (
        <div className="w-[90%] bg-white rounded p-3 shadow">
            <div className='text-center border-b pb-2 font-bold'>
                <h4 className='mr-7 text-lg lg:hidden max-lg:text-reg'>Reservation</h4>
                <h4 className='mr-7 text-lg hidden lg:inline-block'>Make a Reservation</h4>
            </div>

            <div className="my-3 flex flex-col gap-2">
                <Label htmlFor="" className='font-bold'>Party size</Label>
                <Select
                    value={partySize}
                    onValueChange={(value) => setPartySize(value)}
                >
                    <SelectTrigger className="py-3 border-b font-light">
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-auto">
                        <SelectGroup>
                            <SelectLabel>Party size</SelectLabel>
                            {partySizes.map((size, idx) => (
                                <SelectItem value={size.value.toString()} key={idx} >
                                    {size.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex justify-between">
                <div className="flex flex-col w-[48%] gap-2">
                    <Label htmlFor='' className='font-bold'>Date</Label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => handleChangeDate(date)}
                        className="flex font-light h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        dateFormat="yy MMM d"
                        wrapperClassName="w-full"
                    />
                </div>
                <div className="flex flex-col w-[48%] gap-2">
                    <Label htmlFor='' className='font-bold'>Time</Label>
                    <Select
                        value={time}
                        onValueChange={(value) => setTime(value)}
                    >
                        <SelectTrigger className="py-3 border-b font-light">
                            <SelectValue placeholder="" />
                        </SelectTrigger>

                        <SelectContent className="max-h-60 overflow-auto">
                            <SelectGroup>
                                <SelectLabel>Time</SelectLabel>
                                {filterTimeByRestaurantOpenWindow().map((time, idx) => (
                                    <SelectItem value={time.time} key={idx} >
                                        {time.displayTime}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>

                    </Select>
                </div>
            </div>

            <div className="mt-5 flex justify-center">
                <Button
                    className='bg-red-600 rounded w-full px-4 text-white font-bold h-16'
                    onClick={handleClick}
                    disabled={loading}
                >
                    {loading ? <CircularProgress color="inherit" /> : "Find a Time"}
                </Button>
            </div>
            {data && data.length ? (
                <div className="mt-4">
                    <p className="text-reg">Select a Time</p>
                    <div className='flex flex-wrap mt-2 gap-3'>
                        {data.map((time, idx) => {
                            return time.available ? (
                                <Link
                                    key={idx}
                                    href={`/reserve/${slug}/?date=${day}T${time.time}&partySize=${partySize}`}
                                    className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white rounded"
                                >
                                    <p className='text-sm font-bold'
                                    >{convertToDisplayTime(time.time as Time)}</p>
                                </Link>) : (
                                <p className='bg-gray-300 p-2 w-24 rounded'></p>
                            )
                        })}
                    </div>
                </div>) : null}
        </div>
    )
}

export default ReservationCard
