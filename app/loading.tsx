import { Header_Home } from '@/sections'
import React from 'react'

const loading = () => {
    return (
        <div>
            <Header_Home />
            <section className='py-3 px-36 mt-10 flex flex-wrap justify-center'>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                    <div
                        key={num}
                        className='w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer'
                    />
                ))}
            </section>
        </div>
    )
}

export default loading
