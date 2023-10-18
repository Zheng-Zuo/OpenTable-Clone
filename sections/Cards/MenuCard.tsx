import { Item } from "@prisma/client"

interface Props {
  items: Item[]
}

const MenuCard = ({ items }: Props) => {
  return (
    <div id="menu" className='bg-white mt-5'>
      <div className='mt-4 pb-1 mb-1'>
        <h1 className='font-bold text-4xl'>Menu</h1>
      </div>

      <div className='flex flex-wrap justify-between'>
        {items.map((item) => (
          <div className='border rounded p-3 w-[49%] mb-3' key={item.id} >
            <h3 className='font-bold text-lg'>{item.name}</h3>
            <p className='font-light mt-1 text-sm'>
              {item.description}
            </p>
            <p className='mt-7'>{item.price}</p>
          </div>
        ))
        }
      </div>

    </div>
  )
}

export default MenuCard
