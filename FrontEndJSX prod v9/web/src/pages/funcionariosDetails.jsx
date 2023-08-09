import React, { useEffect, useState } from "react";
import BannerDetails from "../components/bannerDetails/BannerDetails";
import { useParams } from "react-router-dom";
import pessoas from "../assets/data/Func.jsx";
import erro404 from "../assets/images/erro404.png";
import CardPessoa from "../components/Cardpessoa/cardPessoa";
import { ArrowCircleDown, Warning } from 'phosphor-react';

const FuncionariosDetails = () => {
  const { id } = useParams();
  const [funcionario, setFuncionario] = useState(null);

  useEffect(() => {
    const funcionarioEncontrado = pessoas.find((pessoa) => pessoa._id === id);
    if (funcionarioEncontrado) {
      setFuncionario(funcionarioEncontrado);
    }
  }, [id]);

  if (!funcionario) {
    return (
      <div className="w-full max-w-lg overflow-hidden flex flex-col h-[70vh]">
        <h1 className="text-2xl text-center font-black dark:text-white">
          Funcionário não encontrado!
        </h1>
        <img src={erro404} alt="" className="w-full h-full object-cover" />
      </div>
    );
  }

  const relatedPeoples = pessoas.filter(
    (item) => item.GESTOR.toLowerCase() === funcionario.NOME.toLowerCase()
  );

  return (
    <div className="flex mt-20 flex-col w-full max-w-7xl max-md:mt-16 gap-3 relative overflow-hidden rounded-md">
      <title>Funcionarios - {funcionario.NOME}</title>
      <BannerDetails funcionario={funcionario} />
      <h1 className="w-full flex justify-center items-center gap-2 font-semibold text-xl my-3 text-blue-700">
        Equipe do {funcionario.NOME} <ArrowCircleDown className="mt-1" size={25} />
      </h1>
      <div className="w-full grid grid-cols-4 gap-3 max-lg:grid-cols-3  max-md:grid-cols-2 max-sm:grid-cols-1">
        {relatedPeoples.length > 0 ? (
          <CardPessoa data={relatedPeoples} />
        ) : (
          <div className="w-full flex justify-center items-center gap-2 font-semibold text-xl my-3 text-blue-700">
            Não possui equipe <Warning className="mt-1" size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FuncionariosDetails;
