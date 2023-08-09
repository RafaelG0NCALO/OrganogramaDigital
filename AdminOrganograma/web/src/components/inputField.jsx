import React, { useState } from "react";
import { Eye, EyeClosed } from "phosphor-react";

const InputField = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  valid,
  infoError,
  icon,
  type = "text",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div
      className={`flex flex-col rounded-md relative ${
        valid ? "" : "border-red-500"
      }`}
    >
      <input
        id={id}
        placeholder={placeholder}
        type={inputType}
        value={value}
        onChange={onChange}
        className={`border-2 ${
          !valid
            ? "border-red-500 focus:border-red-500"
            : "dark:border-gray-600 dark:focus:border-violet-600 border-gray-400 focus:border-violet-600"
        } bg-transparent rounded-md pl-10 peer h-14 w-full dark:text-white text-slate-700 placeholder-transparent placeholder:pl-1 focus:placeholder-gray-700 focus:outline-none focus:border-2`}
      />
      <label
        className={`${
          !valid
            ? "peer-focus:text-red-500"
            : "dark:peer-focus:text-violet-600 peer-focus:text-blue-700"
        } text-gray-600 absolute dark:bg-[#202024] bg-white peer-focus:transition-all left-9 -top-3 px-1 text-base peer-focus:text-base peer-placeholder-shown:text-lg peer-placeholder-shown:top-3 pointer-events-none peer-focus:-top-3 ${
          valid ? "" : "text-red-500"
        }`}
        htmlFor={id}
      >
        {label}
      </label>
      <div
        className={`absolute ${
          !valid
            ? "peer-focus:text-red-500 text-red-500"
            : "peer-focus:text-blue-700 dark:peer-focus:text-violet-600 text-gray-400 dark:text-gray-500"
        } h-full w-10 p-2 flex items-center justify-center`}
      >
        {icon}
      </div>
      {type === "password" && (
        <div
          className={`absolute right-3 top-1/2 -translate-y-1/2 text-violet-600 transition-all cursor-pointer`}
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <Eye /> : <EyeClosed />}
        </div>
      )}
      {!valid && (
        <p className="absolute -top-7 right-1 text-red-500 text-sm mt-1">
          {infoError}
        </p>
      )}
    </div>
  );
};

export default InputField;
