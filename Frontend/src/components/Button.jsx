import React from 'react'

const Button = ({ children }) => {
    return (
        <div>
            <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 mt-6 bg-blue-600 text-white rounded-md active:bg-[#1d4ed8] active:scale-95"
            >
                {children}
            </button>
        </div>
    )
}

export default Button