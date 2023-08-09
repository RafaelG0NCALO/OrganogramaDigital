import { MagnifyingGlass, Plus, X } from 'phosphor-react';
import React, { useState, useEffect } from 'react';

import pessoas from '../assets/data/Func.jsx';
import Table from '../components/tabela/Table';
import FormCad from '../components/form/FormCad';

const Dashboard = () => {
  const [searchText, setSearchText] = useState('');
  const [numDisplayed, setNumDisplayed] = useState(10);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredData = pessoas.filter((pessoa) =>
    pessoa.NOME.toLowerCase().includes(searchText.toLowerCase())
  );

  const handlePlusClick = () => {
    setIsPopupOpen(true);
  };

  const handleOverlayClick = () => {
    setIsPopupOpen(false);
  };

  const handleCloseClick = () => {
    setIsPopupOpen(false);
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if ( window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight)
      {setNumDisplayed(numDisplayed + 10);}
    };
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll);};
    },[numDisplayed]); 

  return (
    <section className='w-full relative min-h-screen pt-3'>
      <h1 className='w-full max-w-7xl m-auto text-gray-300 text-2xl font-semibold p-2'>
        Funcionários
      </h1>

      <div className='w-full max-w-7xl m-auto p-2'>
        <div className="gap-3 flex">
          <div className="flex relative w-full items-center rounded-md overflow-hidden border-2 border-gray-200 dark:border-[#222222] ">
            <input
              onChange={handleSearch}
              type="text"
              className="w-full h-10 p-2 outline-none bg-gray-200 dark:bg-[#222222] dark:text-white"
              placeholder="Search"
            />
            <MagnifyingGlass className="absolute right-0 flex items-center w-10 h-10 bg-gray-200 text-gray-600 dark:bg-[#222222] p-2 dark:text-white" />
          </div>
          <Plus
            onClick={handlePlusClick}
            className="cursor-pointer p-2 dark:bg-[#222222] hover:bg-gray-300 transition-all bg-gray-300 rounded-md flex items-center justify-center dark:text-white text-gray-600 w-10 h-10"
          />
        </div>

        <div className='overflow-x-auto rounded-md overflow-hidden p-1 min-h-full'>
          {filteredData.length > 0 ? (
            <Table data={filteredData.slice(0, numDisplayed)} />
          ) : (
            <p className="text-gray-500 text-center mt-4">Nenhum funcionário encontrado.</p>
          )}
        </div>

        {isPopupOpen && (
          <>
            <div
              className="fixed z-40 top-0 left-0 w-full h-full bg-[#111] bg-opacity-70 flex items-center justify-center"
              onClick={handleOverlayClick}
            />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md rounded-md">
              <div className="relative w-full h-full p-2">
                <FormCad />
                <button
                  className="absolute top-2.5 right-2.5 text-gray-600 bg-gray-200 dark:bg-[#1111117c] p-1 rounded-full dark:text-white"
                  onClick={handleCloseClick}
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
