import { LazyLoadImage } from "react-lazy-load-image-component";
import logobbts from "../../assets/images/logobbts.png";

const BannerDetails = ({ funcionario }) => {
  const {
    IMG,
    NOME,
    MATRICULA,
    FUNCAO,
    EMAIL, 
    GESTOR,
    LOCALIZACAO,
    DIVISAO,
  } = funcionario;

  return (
    <div className="flex flex-col w-full max-w-7xl max-md:mt-16 gap-3 relative overflow-hidden rounded-md">
      <title>Funcionarios - {NOME}</title>
      <div className='bg-white dark:bg-[#222222] animate-sideBlur animation-delay-0s urounded-md shadow-sm relative flex flex-col'>

        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[280px] h-72 flex justify-center flex-col items-center z-10">
            <div className="w-32 h-32 rounded-full overflow-hidden relative before:w-28 before:rounded-full before:h-28 before:border-[1px] before:border-white before:absolute before:left-2 before:top-2 before:z-10">
              <div className="flex items-center justify-center w-4 h-4 bg-white absolute z-10 rounded-full right-6 top-3">
                <div className="w-3 h-3 rounded-full border-2 bg-gray-400"></div>
              </div>
              <LazyLoadImage
                src={IMG}
                alt=""
                className="w-full rounded-md h-full object-cover"
                effect="blur"
                height="100%"
                width="100%"
              />
            </div>
            <div className="flex flex-col text-center pt-5">
              <span className="font-semibold text-lg dark:text-gray-200 text-[#333]">
                {NOME}
              </span>
              <span className="dark:text-gray-200 text-gray-600">{EMAIL}</span>
              <span className="dark:text-gray-200 text-gray-600 flex flex-col">
                <span>Matrícula</span>
                {MATRICULA}
              </span>
            </div>
          </div>

          <div className="flex flex-1 min-w-[280px] flex-col justify-around w-60 h-72 p-5">
            <div className="flex items-center gap-3 justify-between text-left">
              <div className="flex-col flex text-left w-full">
                <span className="text-lg font-semibold dark:text-gray-200 text-gray-700">
                  Localidade
                </span>
                <span className="text-base  dark:text-gray-200 text-[#333]">
                  {LOCALIZACAO}
                </span>
              </div>
              <div className="flex-col flex text-left w-full">
                <span className="text-lg font-semibold dark:text-gray-200 text-gray-700">
                  Matrícula
                </span>
                <span className="text-base  dark:text-gray-200 text-[#333]">
                  {MATRICULA}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-between text-left">
              <div className="flex-col flex text-left w-full">
                <span className="text-lg font-semibold dark:text-gray-200 text-gray-700">
                  Gestor
                </span>
                <span className="text-base  dark:text-gray-200 text-[#333]">
                  {GESTOR}
                </span>
              </div>
              <div className="flex-col flex text-left w-full">
                <span className="text-lg font-semibold dark:text-gray-200 text-gray-700">
                  Divisão
                </span>
                <span className="text-base  dark:text-gray-200 text-[#333]">
                  {DIVISAO}
                </span>
              </div>
            </div>

            <div className="w-60 h-72 flex justify-center flex-col items-center object-cover opacity-20 absolute top-0 right-2 z-0">
              <LazyLoadImage
                src={logobbts}
                alt=""
                className="h-full w-full"
                effect="blur"
                height="100%"
                width="100%"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex h-10 justify-center items-center border-t-[1px] border-gray-300">
          <span className=" text-2xl dark:text-gray-200 text-[#333]">
            {FUNCAO}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BannerDetails;
