import Link from 'next/link'
import React from 'react'
import { FaArrowCircleRight } from 'react-icons/fa'

const Index = ({route="/"}) => {
    return (
        <Link href={route} className='more-section'>
            আরও খবর
            <FaArrowCircleRight />
        </Link>
    )
}

export default Index