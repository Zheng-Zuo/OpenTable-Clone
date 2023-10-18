import Link from "next/link"

const NavBar_Restaurant = () => {
    return (
        <nav className='flex text-reg border-b border-solid border-gray-300 pb-2'>
            <Link href="#overview" className="mr-7">Overview</Link>
            <Link href="#photo" className="mr-7">Photo</Link>
            <Link href="#menu" className="mr-7">Menu</Link>
            <Link href="#review" className="mr-7">Review</Link>
        </nav>
    )
}

export default NavBar_Restaurant