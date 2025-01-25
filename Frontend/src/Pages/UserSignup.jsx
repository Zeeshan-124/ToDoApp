import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const navigate = useNavigate()

    const { user, setUser } = useContext(UserDataContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const newUser = {
            fullName: {
                firstName: firstName,
                lastName: lastName
            },
            email: email,
            password: password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

        if (response.status === 201) {
            const data = response.data
            setUser(data.userInformation)
            localStorage.setItem('token', data.token)
            navigate('/home')
        }

        setEmail('')
        setPassword('')
        setFirstName('')
        setLastName('')
    }

    return (
        <div className='bg-white h-screen w-screen overflow-hidden flex justify-between flex-col'>
            <nav class="bg-[#2563eb] relative w-full flex flex-col justify-end shadow-sm">
                <h1 className='text-2xl font-bold text-white block w-full py-6 px-14'>Todo Application</h1>
            </nav>
            <div className='h-full w-full p-10 flex flex-col justify-start items-center bg-[#f3f4f6]'>
                <form
                    className='w-[550px] bg-white px-4 py-8 rounded-lg shadow-lg'
                    onSubmit={(e) => {
                        onSubmitHandler(e)
                    }}
                    method="post">
                    <div class="mb-2">
                        <label
                            for="username"
                            class=" text-sm font-medium text-gray-900">Enter username</label>
                        <div className='flex gap-2 mt-1'>
                            <input
                                type="text"
                                name="firstname"
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                }}
                                class="bg-[#eeeeee] border-gray-300 text-gray-900 text-sm w-1/2 rounded-lg block mt-2 mb-2 p-2 focus:ring-2 focus:outline-none focus:ring-blue-500"
                                placeholder="Firstname"
                                required />
                            <input
                                type="text"
                                name="lastname"
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value)
                                }}
                                class="bg-[#eeeeee] border-gray-300 text-gray-900 text-sm w-1/2 rounded-lg block mt-2 mb-2 p-2 focus:ring-2 focus:outline-none focus:ring-blue-500"
                                placeholder="Lastname" />
                        </div>
                    </div>
                    <div class="mb-2">
                        <label
                            for="email"
                            class=" text-sm font-medium text-gray-900">What's your email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            class="bg-[#eeeeee] border-gray-300 text-gray-900 text-sm rounded-lg block mt-2 mb-2 p-2 w-full focus:ring-2 focus:outline-none focus:ring-blue-500"
                            placeholder="email@example.com"
                            required />
                    </div>
                    <div class="mb-6">
                        <label
                            for="password"
                            class="text-sm font-medium text-gray-900">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            class="bg-[#eeeeee] border-gray-300 text-gray-900 text-sm rounded-lg block mt-2 mb-2 p-2 w-full focus:ring-2 focus:outline-none focus:ring-blue-500"
                            placeholder="Enter password"
                            required />
                    </div>
                    <button type="submit"
                        className='shadow-lg bg-[#2563eb] rounded-lg p-2 mb-4 w-full text-center text-xl font-semibold text-white active:scale-90'>
                        Register
                    </button>
                </form>
                <p className='w-[550px] my-2 text-center text-sm'>Already have an account? <Link to='/' className='text-blue-500 text-sm'>Login here</Link></p>
            </div>
        </div>
    )
}

export default UserSignup