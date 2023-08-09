import React from 'react';
import { X } from 'phosphor-react';

const Popup = ({ mostrarPopup, setMostrarPopup, conteudo }) => {
  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      {mostrarPopup && (
        <div onClick={() => setMostrarPopup(false)} className='fixed px-2 top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-1 rounded shadow w-full max-w-lg flex flex-col items-end' onClick={handleContentClick}>
            <button onClick={() => setMostrarPopup(false)} className="flex items-center justify-center rounded-md h-7 w-7 bg-blue-200 text-blue-900" ><X /></button>
            <div className='w-full z-50'>
              {conteudo}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
