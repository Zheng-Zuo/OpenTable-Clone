const Header_Restaurant = ({name}:{name: string}) => {
  return (
    <header className="h-96 overflow-hidden">
      <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] 
        h-full flex justify-center items-center">
        <h1 className="text-7xl max-lg:text-6xl max-sm:text-4xl text-white captitalize text-shadow text-center">
          {name}
        </h1>
      </div>
    </header>
  )
}

export default Header_Restaurant
