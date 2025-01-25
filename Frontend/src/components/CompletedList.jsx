import React, { useContext, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const CompletedList = () => {
    const { todos, setTodos, completedTodos, setCompletedTodos, email, setEmail, userId, setUserId } = useContext(UserDataContext);

    useEffect(() => {
        const fetchUserProfileAndTodos = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No token found");
                return;
            }

            // Fetch user profile
            const profileResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const userData = profileResponse.data.userInformation;
            setEmail(userData.email);
            setUserId(userData._id);

            // Fetch todos for the user
            const todosResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/todolist/getItem/${userData._id}`);
            console.log("Fetched todos:", todosResponse.data);

            // Ensure `todoItems` property exists
            const todoItems = todosResponse.data.todoItems || [];
            setCompletedTodos(todoItems.filter((item) => item.completed !== false));
        };

        fetchUserProfileAndTodos();
    }, [setCompletedTodos]);

    // Move todo back to incomplete list
    const againInCompleted = async (id, isCompleted) => {
        const updateData = {
            completed: !isCompleted,
            email: email,
        };
        // Update the todo item on the server
        const statusResponse = await axios.put(`${import.meta.env.VITE_BASE_URL}/todolist/updateItem/status/${id}`, updateData);


        const todosResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/todolist/getItem/${userId}`);
        console.log("Fetched todos:", todosResponse.data);

        // Ensure `todoItems` property exists
        const todoItems = todosResponse.data.todoItems || [];
        setCompletedTodos(todoItems.filter((item) => item.completed !== false));
        setTodos(todoItems.filter((item) => item.completed !== true))
        // Update the local state
        // const updatedCompleted = completedTodos.filter((todo) => todo._id !== id);
        // const todoTask = completedTodos.find((todo) => todo._id === id);
        // setCompletedTodos(updatedCompleted);
        // setTodos([...todos, { ...todoTask, completed: false }]);
    };

    // Delete a todo item
    const deleteItem = async (id) => {
        const deleteData = {
            email: email
        };

        await axios.delete(`${import.meta.env.VITE_BASE_URL}/todolist/deleteItem/${id}`, { data: deleteData });
        console.log("Item deleted");

        const updatedCompleted = completedTodos.filter((todo) => todo._id !== id);
        setCompletedTodos(updatedCompleted);
    };

    return (
        <div>
            {completedTodos.map((e, idx) => {
                return (
                    <div key={idx} className='bg-white rounded-lg shadow-xl flex flex-col justify-center items-start p-4 mb-4'>
                        <div key={e._id} className='flex flex-col justify-between'>
                            <div className='flex flex-row'>
                                <div className=''>
                                    <form className='w-[500px] text-xl font-medium flex flex-row justify-start items-center gap-4'>
                                        <input
                                            className='relative h-5 w-5'
                                            type="checkbox"
                                            name='completed'
                                            checked={e.completed}
                                            onChange={() => againInCompleted(e._id, e.completed)}
                                        />
                                        <h1 className='flex justify-center items-center'>{e.title}</h1>
                                    </form>
                                </div>
                                <div className='w-[50px] text-xl font-medium flex flex-row justify-start items-center gap-4'>
                                    <Trash2
                                        onClick={() => deleteItem(e._id)}
                                        className='text-red-600 cursor-pointer'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CompletedList;