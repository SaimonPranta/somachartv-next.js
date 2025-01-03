import React from 'react'
import Header from "@/shared/components/header/header";
import EmployGrid from "@/app/employ/components/EmployGrid/Index"
import Loading from "@/shared/components/Loading/index";

const Page = () => {
    return (
        <Loading>
            <Header />
            <EmployGrid/>
        </Loading>
    )
}

export default Page