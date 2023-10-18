"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { BookingValidation } from "@/lib/validations/BookingValidation"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import useReservation from "@/hooks/useReservation"
import { Alert, CircularProgress } from "@mui/material"

const BookingForm = ({
  slug,
  date,
  partySize,
}: {
  slug: string;
  date: string;
  partySize: string;
}) => {
  const [day, time] = date.split("T")
  const { error, loading, createReservation } = useReservation()
  const [didBook, setDidBook] = useState(false)

  const form = useForm({
    resolver: zodResolver(BookingValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      Email: "",
      Occasion: "",
      Requests: "",
    }
  })

  const onSubmit = async (values: z.infer<typeof BookingValidation>) => {
    const booking = await createReservation({
      slug,
      day,
      time,
      partySize,
      bookerFirstName: values.firstName,
      bookerLastName: values.lastName,
      bookerPhone: values.phoneNumber,
      bookerEmail: values.Email,
      bookerOccasion: values.Occasion,
      bookerRequest: values.Requests,
      setDidBook
    })
  }

  return (
    <>

      {
        error ? (
          <Alert severity="error" className='mb-4' >
            {error}
          </Alert >
        ) : null}

      {
        didBook ? (
          <div>
            <h1 className="font-bold text-center">You are all booked up.</h1>
            <p className="font-bold text-center">Enjoy your reservation!</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-wrap justify-center items-center gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="First name" {...field}
                          className="border rounded p-3 w-80"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Last name" {...field}
                          className="border rounded p-3 w-80"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Phone number" {...field}
                          className="border rounded p-3 w-80" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Email" {...field}
                          className="border rounded p-3 w-80" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Occasion"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Occasion (optional)" {...field}
                          className="border rounded p-3 w-80" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Requests"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Requests (optional)" {...field}
                          className="border rounded p-3 w-80" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="bg-red-600 w-full p-3 text-white font-bold rounded 
        disabled:bg-gray-300">
                  {loading ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "Complete reservation"
                  )}
                </Button>

                <p className="mt-4 text-sm text-center">
                  By clicking “Complete reservation” you agree to the OpenTable Terms
                  of Use and Privacy Policy. Standard text message rates may apply.
                  You may opt out of receiving text messages at any time.
                </p>
              </div>

            </form>
          </Form >)
      }
    </>
  )
}

export default BookingForm
