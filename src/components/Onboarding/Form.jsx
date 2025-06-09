import { useState } from "react";

function Form({
  id,
  label,
  type,
  src,
  placeholder,
  value,
  handleChange,
  error,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`w-full ${error ? "mb-4" : "mb-1"}`}>
      <label
        htmlFor={id}
        className="satoshi font-bold align-middle text-[12px] leading-[18px]"
      >
        {label}
      </label>
      <div className="relative flex items-center mt-1 ">
        <img
          src={src}
          alt={`${src}-image`}
          className="absolute h-6 rounded-[6px] left-1.5 bg-white z-10"
        />
        {id === "password" && (
          <img
            src={open ? "eye-slash.svg" : "open-eye.svg"}
            onClick={() => setOpen(!open)}
            className="absolute right-6 z-10 cursor-pointer"
          />
        )}
        <div className="bg-[#FFFFFE] opacity-45 w-full rounded-lg">
          <input
            type={`${open && id === "password" ? "text" : type}`}
            name={id}
            id={id}
            placeholder={placeholder}
            className="border-2 border-white outline-white rounded-lg pl-10 py-1.5 w-full font-medium text-[#989c9c] text-sm "
            value={value}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="relative">
        {error && (
          <span
            className="text-red-400 text-xs absolute left-0
           max-w-full"
          >
            {error}
          </span>
        )}
      </div>
    </div>
  );
}

export default Form;
