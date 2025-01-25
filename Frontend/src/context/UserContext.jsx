import React, { createContext, useState } from 'react'

export const UserDataContext = createContext()

const UserContext = ({ children }) => {

    const [email, setEmail] = useState()
    const [userId, setUserId] = useState()
    const [todos, setTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const value = {
        todos,
        setTodos,
        completedTodos,
        setCompletedTodos,
        user,
        setUser,
        isLoading,
        setIsLoading,
        email,
        setEmail,
        userId,
        setUserId
    };

    return (
        <div>
            <UserDataContext.Provider value={value}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext