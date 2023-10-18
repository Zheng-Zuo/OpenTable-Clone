import { SearchParams } from "@/app/search/page"
import SearchBar from "./Shared/SearchBar"

const Header_Search = () => {
    return (
        <header className='bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2'>
            <SearchBar />
        </header>
    )
}

export default Header_Search