import React, { useContext, useState } from 'react';
import axios from 'axios';
import InputField from './InputField';
import Button from './Button';
import TextArea from './TextArea';
import { UserDataContext } from '../context/UserContext';

export const TodoForm = ({ todos, setTodos, children }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const { email, setEmail, userId, setUserId } = useContext(UserDataContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        if (token) {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;
            setEmail(data.userInformation.email);
            setUserId(data.userInformation._id);
        }

        const userData = {
            title: title,
            description: body,
            email: email,
        };

        console.log('userdata: ', userData);

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/todolist/addItem`, userData);
        console.log("Item created:", response.data);

        // Update the todos state with the new item
        const newTodo = {
            _id: response.data.todoItem._id, // Use _id instead of id
            title: response.data.todoItem.title,
            description: response.data.todoItem.description,
            completed: response.data.todoItem.completed,
            expanded: false, // Default expanded state
        };
        setTodos([...todos, newTodo]);

        // Clear the form fields
        setTitle('');
        setBody('');
    };

    return (
        <div className='bg-white rounded-lg shadow-xl flex flex-col justify-center items-center p-4 '>
            <h1 className='text-2xl block w-[550px] text-start my-4'>{children}</h1>
            <form onSubmit={handleSubmit} method='post' className="w-[550px] my-4">
                <InputField
                    type={"text"}
                    value={title}
                    setValue={setTitle}
                    placeholder={"Enter task title"}
                    name='title'
                >
                    Task Title
                </InputField>
                <TextArea
                    value={body}
                    setValue={setBody}
                    placeholder={"Enter task description"}
                    name='description'
                >
                    Task Description
                </TextArea>
                <Button>Create Task</Button>
            </form>
        </div>
    );
};

export default TodoForm;