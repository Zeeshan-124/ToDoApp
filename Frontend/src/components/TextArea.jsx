import React from 'react'

const TextArea = ({ children, value, setValue, placeholder, nme }) => {
    return (
        <div >
            <label className="block text-sm font-medium text-gray-700">
                {children}
            </label>
            <textarea
                name={nme}
                value={value}
                rows="3"
                onChange={(e) => setValue(e.target.value)}
                className="bg-[#eeeeee] border-gray-300 text-gray-900 text-sm rounded-lg block w-full mt-2 mb-2 p-4 focus:ring-2 focus:outline-none focus:ring-blue-500"
                placeholder={placeholder}
                required></textarea>
        </div>
    )
}

export default TextArea