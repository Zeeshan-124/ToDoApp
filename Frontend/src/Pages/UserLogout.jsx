import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogout = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    localStorage.removeItem('token');
                    navigate('/');
                }
            } catch (error) {
                console.error('Logout failed:', error);
            }
        };

        logout();
    }, [navigate, token]); // Add dependencies

    return <div>Logging out...</div>;
};

export default UserLogout;
