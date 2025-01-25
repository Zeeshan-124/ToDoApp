import React, { useContext, useState } from 'react'
import NavigationBar from '../components/NavigationBar'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { UserDataContext } from '../context/UserContext'
import CompletedList from '../components/CompletedList'




const HomePage = () => {

    const [navBtn, setNavBtn] = useState(true)
    const [expanded, setExpanded] = useState(true)

    // const [title2, setTitle2] = useState('');
    // const [body2, setBody2] = useState('');

    const { todos, setTodos, completedTodos, setCompletedTodos } = useContext(UserDataContext)
    return (
        <div className='h-screen w-screen overflow-auto'>
            <NavigationBar navBtn={navBtn} setNavBtn={setNavBtn} />
            {navBtn ?
                <div className='h-full w-full p-10 flex flex-col justify-start items-center bg-[#f3f4f6] gap-6 '>
                    <TodoForm todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} >Create new task</TodoForm>
                    <TodoList expanded={expanded} setExpanded={setExpanded} />
                </div> :
                <div className='h-full w-full p-10 flex flex-col justify-start items-center bg-[#f3f4f6] gap-6 '>
                    <CompletedList />
                </div>}
        </div>
    )
}

export default HomePage