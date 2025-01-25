import React, { useContext, useEffect, useState } from 'react';
import { Trash2, Edit2, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const TodoList = () => {
    const { todos, setTodos, completedTodos, setCompletedTodos, email, setEmail, userId, setUserId } = useContext(UserDataContext);
    const [editableTodo, setEditableTodo] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');

    // Fetch user profile and todos
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
            setTodos(todoItems.filter((item) => item.completed !== true))
            setCompletedTodos(todoItems.filter((item) => item.completed !== false));
        };

        fetchUserProfileAndTodos();
    }, [setEmail, setUserId, setTodos]);

    // Toggle expanded state
    const itemExpansion = async (id, isExpanded) => {

        const updateData = {
            expanded: isExpanded,
            email: email,
        }

        await axios.put(`${import.meta.env.VITE_BASE_URL}/todolist/updateItem/expansion/${id}`, updateData);

        const todosResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/todolist/getItem/${userId}`);

        // Ensure `todoItems` property exists
        const todoItems = todosResponse.data.todoItems || [];
        setTodos(todoItems.filter((item) => item.completed !== true))
        // const updatedTodos = todos.map((todo) =>
        //     todo._id === id ? { ...todo, expanded: !todo.expanded } : todo
        // );
        // setTodos(updatedTodos);
    };

    // Mark todo as completed or incomplete
    const whenCompleted = async (id, isCompleted) => {
        const updateData = {
            email: email,
            completed: !isCompleted
        };

        // Update the todo item on the server
        await axios.put(`${import.meta.env.VITE_BASE_URL}/todolist/updateItem/status/${id}`, updateData);


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

        const updatedTodos = todos.filter((todo) => todo._id !== id);
        setTodos(updatedTodos);
    };

    // Handle edit click
    const handleEditClick = (todo) => {
        setEditableTodo(todo._id);
        setEditTitle(todo.title);
        setEditBody(todo.description);
    };

    // Update a todo item
    const handleUpdateTodo = async (id) => {
        const updatedData = {
            title: editTitle,
            description: editBody,
            email: email
        };

        const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/todolist/updateItem/${id}`, updatedData);
        console.log("Item updated:", response.data);

        const updatedTodos = todos.map((todo) =>
            todo._id === id ? { ...todo, title: editTitle, description: editBody } : todo
        );
        setTodos(updatedTodos);
        setEditableTodo(null);
    };

    return (
        <div>
            {todos.map((e, idx) => {
                return editableTodo !== e._id ? (
                    <div key={idx} className="bg-white rounded-lg shadow-xl flex flex-col justify-center items-start p-4 mb-4">
                        <div className="flex flex-col justify-between">
                            <div className="flex flex-row">
                                <div>
                                    <form className="w-[450px] text-xl font-medium flex flex-row justify-start items-center gap-4">
                                        <input
                                            className="relative h-5 w-5"
                                            type="checkbox"
                                            name="completed"
                                            checked={e.completed} // Bind checked attribute
                                            onChange={() => whenCompleted(e._id, e.completed)} // Call whenCompleted on change
                                        />
                                        <h1 className="flex justify-center items-center">{e.title}</h1>
                                    </form>
                                </div>
                                <div className="w-[100px] text-xl font-medium flex flex-row justify-start items-center gap-4">
                                    <Edit2
                                        onClick={() => handleEditClick(e)}
                                        className="text-blue-600 cursor-pointer"
                                    />
                                    <Trash2 onClick={() => deleteItem(e._id)} className="text-red-600 cursor-pointer" />
                                    {e.expanded ? (
                                        <ChevronUp onClick={() => itemExpansion(e._id, false)} />
                                    ) : (
                                        <ChevronDown onClick={() => itemExpansion(e._id, true)} />
                                    )}
                                </div>
                            </div>
                            {e.expanded && <h1 className="w-[550px] py-6 px-9">{e.description}</h1>}
                        </div>
                    </div>
                ) : (
                    <div key={idx} className="bg-white rounded-lg shadow-xl flex flex-col justify-center items-start p-4 mb-4">
                        <form
                            onSubmit={(elem) => {
                                elem.preventDefault();
                                handleUpdateTodo(e._id);
                            }}
                            className="w-[550px] my-4"
                        >
                            <label className="block text-sm font-medium text-gray-700">Update title</label>
                            <input
                                className="bg-[#eeeeee] border-gray-300 text-gray-900 text-sm rounded-lg block mt-2 mb-2 p-2 w-full focus:ring-2 focus:outline-none focus:ring-blue-500"
                                type="text"
                                name='title'
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                            <label className="block text-sm font-medium text-gray-700">Update description</label>
                            <textarea
                                name='description'
                                value={editBody}
                                rows="2"
                                onChange={(e) => setEditBody(e.target.value)}
                                className="bg-[#eeeeee] border-gray-300 text-gray-900 text-sm rounded-lg block w-full mt-2 mb-2 p-4 focus:ring-2 focus:outline-none focus:ring-blue-500"
                                required
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 mt-6 bg-blue-600 text-white rounded-md active:bg-[#1d4ed8] active:scale-95"
                            >
                                Update task
                            </button>
                        </form>
                    </div>
                );
            })}
        </div>
    );
};

export default TodoList;