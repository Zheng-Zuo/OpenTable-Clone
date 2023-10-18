import SearchBar from "./Shared/SearchBar"

const Header_Home = () => {
    return (
        <header>
            <div className='h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2'>
                <div className='text-center mt-10 flex flex-col justify-between'>
                    <h1 className='text-white text-5xl max-lg:text-4xl max-sm:text-3xl font-bold mb-8'>
                        Find Your table for any occasion
                    </h1>
                    <SearchBar />
                </div>
            </div>
        </header>
    )
}

export default Header_Home
