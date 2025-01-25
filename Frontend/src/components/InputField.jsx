import React from 'react'

const InputField = ({ type, value, setValue, placeholder, children, nme }) => {
    return (
        <div className='w-full'>
            <label className="block text-sm w-full font-medium text-gray-700">
                {children}
            </label>
            <input
                type={type}
                name={nme}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="bg-[#eeeeee] border-gray-300 text-gray-900 text-sm rounded-lg block mt-2 mb-2 p-2 w-full focus:ring-2 focus:outline-none focus:ring-blue-500"
                placeholder={placeholder}
                required
            />
        </div>
    )
}

export default InputField