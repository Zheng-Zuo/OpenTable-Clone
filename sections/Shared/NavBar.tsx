"use client"

import Link from "next/link"
import { Button } from "../../components/ui/button"
import AuthModal from "../Modals/AuthModal"
import { useGlobalStates } from "@/components/ContextApi/GlobalStatesProvider"
import useAuth from "@/hooks/useAuth"
import Image from "next/image"
import { IoIosRestaurant } from "react-icons/io";

const NavBar = () => {
  const { authState: { data }, checkCookie } = useGlobalStates()
  const { signout } = useAuth()

  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        <div className="flex text-red-600 items-center">
          <IoIosRestaurant />
          <div >
            {/* <Image
            src="https://cdn.otstatic.com/cfe/14/images/opentable-logo-153e80.svg"
            alt="logo"
            width={150}
            height={100}
          /> */}
            ReserveSeat
          </div>
        </div>
      </Link>

      <div>
        {checkCookie ? null : (
          <div className="flex justify-between gap-2">
            {data ? (
              <Button
                className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
                onClick={signout}
              >
                Sign out
              </Button>) : (
              <>
                <AuthModal isSignIn={true} />
                <AuthModal isSignIn={false} />
              </>
            )}
          </div>
        )}
      </div>


    </nav >

  )
}

export default NavBar