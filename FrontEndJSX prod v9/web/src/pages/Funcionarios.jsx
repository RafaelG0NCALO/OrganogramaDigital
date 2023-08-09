import { MagnifyingGlass } from "phosphor-react";
import { useEffect, useState } from "react";
import pessoas from "../assets/data/Func.jsx";
import CardPessoa from "../components/Cardpessoa/cardPessoa";

const Funcionarios = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const elementsPerScroll = 8;
  const [loadedElements, setLoadedElements] = useState(elementsPerScroll);

  const divisionButtons = [
    { division: "", label: "Todos" },
    { division: "SRE", label: "SRE" },
    { division: "CPS", label: "CPS" },
    { division: "MSSP", label: "MSSP" },
    { division: "CECOF", label: "CECOF" },
    { division: "CESEG", label: "CESEG" },
    { division: "GOVIT", label: "GOVIT" },
  ];

  const handleDivisionClick = (division) => {
    setSelectedDivision(division);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredPessoas = pessoas.filter((pessoa) => {
    const pessoaName = pessoa.NOME || "";
    const pessoaDivision = pessoa.DIVISAO || "";
    if (selectedDivision !== "") {
      return (
        pessoaName.toLowerCase().includes(searchValue.toLowerCase()) &&
        pessoaDivision === selectedDivision
      );
    } else {
      return pessoaName.toLowerCase().includes(searchValue.toLowerCase());
    }
  });

  const filteredGestor = pessoas.filter((pessoa) => {
    const pessoaDivision = pessoa.DIVISAO || "";
    if (selectedDivision !== "") {
      return (
        pessoaDivision === selectedDivision
      );
    }
  });

  const handleScroll = () => {
    const isScrolledToBottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;

    if (isScrolledToBottom) {
      setLoadedElements((prevLoadedElements) => prevLoadedElements + elementsPerScroll);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const filteredVisiblePessoas = filteredPessoas.slice(0, loadedElements);

  return (
    <>
      <title>Funcionarios</title>
      <div className="w-full min-h-screen pt-12">
        <div className="m-auto w-full max-w-7xl gap-2 p-2 flex-col relative h-full flex items-center justify-center">

          <div className="flex mt-4 z-30 items-center gap-2 w-full">
            <div className="flex relative w-full items-center rounded-md overflow-hidden border-2 dark:border-[#222222]">
              <input
                type="text"
                className="w-full h-10 p-2 outline-none dark:bg-[#222222] dark:text-white text-[#333]"
                placeholder="Search"
                value={searchValue} // Define o valor do input como o estado de pesquisa
                onChange={handleSearchChange} // Manipulador de eventos para atualizar o estado de pesquisa
              />
              <MagnifyingGlass className="absolute right-0 flex items-center w-10 h-10 bg-gray-200 dark:bg-[#222222] p-2 text-[#333] dark:text-white" />
            </div>
          </div>

          <div
            className="w-full flex gap-2 my-1 overflow-hidden overflow-x-auto noscrool">
            {divisionButtons.map((button) => (
              <button
                key={button.division}
                className={`flex-1 min-w-[90px] my-2 shadow rounded-md text-md dark:text-white h-10 ${selectedDivision === button.division ? "bg-blue-800 text-white" : "dark:bg-[#222222] bg-white"
                  }`}
                onClick={() => handleDivisionClick(button.division)}
              >
                {button.label}
              </button>
            ))}
          </div>

          <div className={`${selectedDivision ? "" : "hidden"} w-full overflow-hidden`}>

            <div className="flex justify-center ">
              <h1 className="relative text-center dark:text-white text-[#333] text-xl font-semibold mb-4 animate-sideBlur">
                Gestor
                <span className="absolute h-[2px] w-5 bg-blue-600 -bottom-1 left-0"/>
              </h1>
            </div>

            <div className="w-full max-w-lg m-auto">
              {filteredGestor.length > 0 && ( <>
                {pessoas.map((pessoa) => {
                  if (pessoa.NOME === filteredGestor[0].GESTOR) {
                    const filteredData = [pessoa]; // Cria um array com a pessoa filtrada
                    return <CardPessoa data={filteredData} key={pessoa.NOME} />;
                  }
                  return null;
                })}
                </>)}
            </div>

              <h1 className="relative text-center dark:text-white text-[#333] text-xl font-semibold my-4 animate-sideBlur">
                Equipe da divisão
                <div className="w-full h-[1px] bg-gray-400 opacity-50 my-3"/>
              </h1>
          
          </div>

          <div className="w-full grid grid-cols-4 gap-3 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
            <CardPessoa data={filteredVisiblePessoas} />
          </div>
          {loadedElements < filteredPessoas.length && (
            <div className="w-full flex items-center justify-center">
              <p className="text-gray-500">Carregando mais...</p>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Funcionarios;
