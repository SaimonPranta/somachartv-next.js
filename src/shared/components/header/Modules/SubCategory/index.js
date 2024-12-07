"use client"
import Link from 'next/link'
import React from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'

const Index = ({subCategories, routeInfo}) => {
    return (
        <>
            <button> <IoMdArrowDropdown /> </button>
            <ul>
                {
                    subCategories.map((subRouteInfo, subIndex) => {
                        return <li key={subRouteInfo._id} >
                            <Link href={`/topic/${routeInfo.route}/${subRouteInfo.route}`} >
                                {subRouteInfo.label}
                            </Link> 
                            </li>
                    })
                }
            </ul>
        </>
    )
}

export default Index