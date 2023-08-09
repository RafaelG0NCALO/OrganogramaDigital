const Button = ({ type, text, onClick }) => {
  return (
    <div type={type} onClick={onClick} className="overflow-hidden relative text-gray-200 
    before:absolute
    before:left-0
    before:h-12
    dark:before:bg-blue-800
    before:bg-blue-800
    hover:before:w-1/2 
    before:transition-all
    before:ease-in-out
    before:delay-150
    before:w-0
    cursor-pointer
    hover:shadow-boxButtonligth
    dark:hover:shadow-boxButton

    after:absolute
    after:right-0
    after:h-12
    dark:after:bg-blue-800
    after:bg-blue-800
    hover:after:w-[50%]
    after:transition-all
    after:ease-in-out
    after:delay-150
    after:w-0
    w-full flex items-center justify-center h-12 mt-2 font-semibold rounded-md transition-all duration-250 ease-in-out dark:bg-blue-700 bg-blue-600">
      <p className="z-20 text-lg font-semibold">{text}</p>
    </div>
  )
}

export default Button