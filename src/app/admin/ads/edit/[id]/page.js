"use client"
import React, { useEffect, useState } from 'react';
import "./style.scss";
import AdminLayouts from '@/shared/layouts/AdminLayout/AdminLayouts';
import { BACKEND_URL } from '@/shared/constants/ulrList';
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter, useParams } from 'next/navigation';


const Page = () => {
    const [input, setInput] = useState({})
    const router = useRouter();
    const { id } = useParams()


    useEffect(() => {
        fetch(`${BACKEND_URL}/admin/ads?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.data) {
                    setInput(data.data)
                }
            }).catch((error) => {})
    }, [id])
   


    const handleBackNavigation = () => {
        router.push("/admin/ads")
    }

    const handleInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
 
        if (name === "newImg") {
            value = e.target.files[0]
        }
        setInput((state) => {
    
            return {
                ...state,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!input.title || !input.targetLink || !input.newImg) {
            return
        }

        const formData = new FormData()
        formData.append("data", JSON.stringify(input))
        if(input.newImg){
            formData.append("img", input.newImg)
        }
        fetch(`${BACKEND_URL}/admin/ads`, {
            method: 'PUT',
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.data) {
                    handleBackNavigation()
                }
            }).catch((error) => {})
    }

    return (
        <AdminLayouts>
            <div className='add-news-page'>
                <div className='title-container'>
                    <button onClick={handleBackNavigation}><MdArrowBackIosNew /> <span>Back</span></button>
                    <h6>Edit Ads</h6>
                </div>
                <div className='add-news'>
                    <form autoComplete='off' onSubmit={handleSubmit}>
                        <div>
                            <label>Title</label>
                            <input type='text' name='title' value={input.title || ""} placeholder='type here...' onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Target Link</label>
                            <input type='text' name='targetLink' value={input.targetLink || ""} placeholder='type here...' onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Chose Image</label>
                            <input type='file' accept="image/*" placeholder='chose' name="newImg" onChange={handleInputChange} />
                        </div>
                        {/* <div>
                            <Image src={URL.createObjectURL(input.images || "")} alt="" height="100"  />
                        </div> */}

                        <div className="action-btn-container">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayouts>
    );
};

export default Page;