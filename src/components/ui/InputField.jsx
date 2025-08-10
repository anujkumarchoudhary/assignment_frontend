import React from 'react';

const InputField = ({ label, required, type, name, value, onChange, placeholder }) => {
    return (
        <div>
            <p className='py-1.5'>
                {label} {required && <span className='text-red-400'>*</span>}
            </p>
            {type === "file" ? (
                <input
                    type="file"
                    name={name}
                    onChange={onChange}
                    className='outline-none border-2 border-yellow-500 rounded-md px-2 py-1 w-full file:mr-4 file:py-1 file:px-3 file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-white hover:file:bg-yellow-600'
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className='outline-none border-2 border-yellow-500 rounded-md px-2 py-1 w-full'
                />
            )}
        </div>
    );
};

export default InputField;
