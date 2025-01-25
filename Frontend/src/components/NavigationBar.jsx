import React, { useEffect, useState } from 'react'
import { LogOut } from 'lucide-react'
import axios from 'axios';
import NavButtons from './NavButtons';
import { Link } from 'react-router-dom';
import Button from './Button';

const NavigationBar = ({ navBtn, setNavBtn }) => {

    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.log("Unauthorized");
                return;
            }

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/users/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Set the firstName in state
                setData(response.data.userInformation.fullName.firstName);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, [])


    console.log("firstName: ", data);





    return (
        <div>
            <nav className="bg-[#2563eb] relative w-full flex flex-col justify-end shadow-sm">
                <div className='flex flex-row justify-between items-center'>
                    <h1 className='text-2xl font-bold text-white block py-6 px-14'>Todo Application</h1>
                    <div className='flex flex-row justify-center items-center px-8'>
                        <h1 className='text-2xl font-bold text-white block px-2'>Hello {data}</h1>
                        <Link to='/user/logout' className='text-2xl font-bold text-white block px-2'><LogOut /></Link>
                    </div>
                </div>
                <div className='flex flex-row ml-8 '>
                    <NavButtons navBtn={navBtn} setNavBtn={setNavBtn} />
                </div>
            </nav>

            {/* Now for the todo form */}



        </div>
    )
}

export default NavigationBar