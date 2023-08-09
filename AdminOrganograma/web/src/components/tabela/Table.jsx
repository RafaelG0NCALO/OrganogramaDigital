import { Trash } from 'phosphor-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Table = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <table className='w-full border-spacing-y-2 border-separate'>
        <thead>
          <tr className=''>
            <th className=' p-1 dark:text-[#666] text-gray-700 '>Img</th>
            <th className=' p-1 dark:text-[#666] text-gray-700 '>Nome</th>
            <th className=' p-1 dark:text-[#666] text-gray-700 '>Matricula</th>
            <th className=' p-1 dark:text-[#666] text-gray-700 '>Tipo</th>
            <th className=' p-1 dark:text-[#666] text-gray-700 '>Função</th>
            <th className=' p-1 dark:text-[#666] text-gray-700 '>Divisão</th>
            <th className=' p-1 dark:text-[#666] text-gray-700 '>Editar</th>
            <th className=' p-1 dark:text-[#666] text-gray-700 '>Excluir</th>
          </tr>
        </thead>
        <tbody >
          {data?.map((item) => (

            <tr key={item._id} className='animate-sideBlur'>

              <td className='rounded-l-md bg-gray-200 dark:bg-[#222222] text-center flex justify-center items-center h-14 pt-1 px-2'>
                <div className='w-10 h-10 rounded-full overflow-hidden'>
                  <img className='w-full h-full object-cover' src={item.IMG} alt="" />
                </div>
              </td>

              <td className='bg-gray-200 dark:bg-[#222222] dark:text-gray-200 text-gray-700  text-center flex-1 min-w-[150px] max-w-[150px] px-1 truncate h-14 '>
                <div className='flex flex-col truncate'>
                  {item.NOME}
                  <div className='text-sm text-gray-500'>
                    {item.EMAIL}
                  </div>
                </div>
              </td>

              <td className='bg-gray-200 dark:bg-[#222222] dark:text-gray-200 text-gray-700  text-center flex-1 min-w-[150px] max-w-[150px] px-1 truncate'>{item.MATRICULA}</td>
              <td className='bg-gray-200 dark:bg-[#222222] dark:text-gray-200 text-gray-700  text-center flex-1 min-w-[150px] max-w-[150px] px-1 truncate'>{item.TIPO}</td>
              <td className='bg-gray-200 dark:bg-[#222222] dark:text-gray-200 text-gray-700  text-center flex-1 min-w-[150px] max-w-[150px] px-1 truncate'>{item.FUNCAO}</td>
              <td className='bg-gray-200 dark:bg-[#222222] dark:text-gray-200 text-gray-700  text-center flex-1 min-w-[150px] max-w-[150px] px-1 truncate'>{item.DIVISAO}</td>

              <td className=' text-center flex-1 w-28 truncate bg-gray-200 dark:bg-[#222222]'>
                <div onClick={toggleDropdown} className=' cursor-pointer w-[90%] h-10 bg-blue-300 flex items-center justify-center rounded-md px-2'>Excluir</div>
              </td>

              <td className=' text-center flex-1 w-28 truncate bg-gray-200 dark:bg-[#222222]'>
                <Link to={`/details/${item._id}`} className=' cursor-pointer w-[90%] h-10 bg-blue-300 flex items-center justify-center rounded-md px-2'>
                  Editar
                </Link>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      <div ref={dropdownRef} className="relative">
                {isOpen && (
                  <ul className="fixed left-0 top-0 h-full flex justify-center items-center p-4 w-full">
                    <li className="p-4 rounded-md dark:bg-[#222222] bg-white z-30">
                      <h1 className="text-lg dark:text-white mb-2">Excluir Funcionário ?</h1>
                      <div className="cursor-pointer flex gap-2 items-center rounded-md bg-red-500 justify-center p-1 text-white text-lg">
                        <p className="ml-2">Excluir</p>
                        <Trash className='mt-[2px]' size={20} />
                      </div>
                    </li>
                    <div onClick={() => { setIsOpen(false); }} className="z-10 fixed left-0 top-0 h-full w-full bg-[#00000079] justify-center flex items-center" ></div>
                  </ul>
                )}
              </div>
    </>
  )
}

export default Table