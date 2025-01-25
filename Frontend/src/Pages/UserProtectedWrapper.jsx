import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const UserProtectedWraper = ({ children }) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserDataContext)
    const { isLoading, setIsLoading } = useContext(UserDataContext)


    useEffect(() => {
        // Redirect if no token
        if (!token) {
            navigate('/');
            return;
        }



        // Fetch user profile
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log(response.data)

                if (response.status === 200) {
                    const data = response.data;
                    // console.log(data); // Will now run only once per component lifecycle
                    setUser(data.userInformation);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                localStorage.removeItem('token')
                navigate('/'); // Redirect to login on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [token, navigate, setIsLoading, setUser]);

    // Show loading screen while fetching
    if (isLoading) {
        return <div>Loading.....</div>;
    }

    return <>{children}</>;
};

export default UserProtectedWraper;