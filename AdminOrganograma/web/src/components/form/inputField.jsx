import { Warning } from 'phosphor-react';
import React from "react";

const InputField = ({
  placeholder,
  ErroName,
  label,
  icon,
  Valid,
  borderValue,
  onChange,
  onFocus,
  onBlur,
  value,
  validMsg,
  name
}) => {

  return (
    <div className="relative flex flex-col flex-1 w-full my-3">
    <input
      className={` border-2 dark:bg-transparent bg-white rounded-md pl-10 peer h-14 w-full dark:text-white text-slate-800 placeholder-transparent placeholder:pl-2 focus:placeholder-gray-500 focus:outline-none focus:border-2
      ${!Valid ? 
        borderValue
        ? "border-red-500 focus:border-red-500" 
        : "dark:focus:border-violet-500 dark:border-gray-600"
        : "dark:focus:border-violet-500 dark:border-gray-600"
      }`}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      name={name}
    />

    {validMsg ? (
      <p className="absolute right-2 -top-5 text-red-500 text-sm flex items-center gap-2">
        <Warning /> {ErroName}
      </p>
    ) : (
      ""
    )}
    <label className={`${!Valid ? 
    borderValue
    ? "text-red-500 peer-focus:text-red-500" 
    : "text-gray-600 dark:text-gray-600 dark:peer-focus:text-violet-500"
    : "text-gray-600 dark:text-gray-600 dark:peer-focus:text-violet-500"
  } absolute whitespace-nowrap
   left-9 -top-3 px-1 text-base bg-transparent peer-focus:text-base peer-placeholder-shown:text-lg peer-placeholder-shown:top-3 pointer-events-none peer-focus:-top-3 dark:bg-[#222222] bg-white peer-focus:transition-all
    peer-focus-visible:transition-all`}>
  {label}
</label>

    <div className={`${!Valid ? 
      borderValue ?
      'text-red-500 peer-focus:text-red-500' 
      : 'text-gray-600 peer-focus:text-violet-500' 
      :'text-gray-600 peer-focus:text-violet-500'} w-10 h-14 absolute flex items-center justify-center left-0 p-2`}>
      {icon}
    </div>
  </div>
  )
}

export default InputField