import React from 'react'
import Link from 'next/link'
import { FaArrowCircleRight } from 'react-icons/fa'
import './styles.scss'

const Index = ({route="/"}) => {
    return (
        <Link href={route} className='more-section'>
            আরও খবর
            <FaArrowCircleRight />
        </Link>
    )
}

export default Index