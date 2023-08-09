import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import pessoas from "../../assets/data/Func.json";

const CardPessoa = ({ data }) => {
  const hoje = new Date();

  return (
    <>
      {data.map((pessoa) => {
        let estaDeFerias = false;
        let corDoFundo = "opacity-100";
        const pessoaAtual = pessoas.find((p) => p._id === pessoa._id);
        const INICIORECESSO = pessoaAtual?.INICIORECESSO || null;
        const FINALRECESSO = pessoaAtual?.FINALRECESSO || null;

        if (INICIORECESSO && FINALRECESSO) {
          const INICIORECESSOSplit = INICIORECESSO.split("/");
          const FINALRECESSOSplit = FINALRECESSO.split("/");
          const INICIORECESSODate = new Date(
            hoje.getFullYear(),
            parseInt(INICIORECESSOSplit[1]) - 1,
            parseInt(INICIORECESSOSplit[0])
          );
          const FINALRECESSODate = new Date(
            hoje.getFullYear(),
            parseInt(FINALRECESSOSplit[1]) - 1,
            parseInt(FINALRECESSOSplit[0])
          );
          estaDeFerias = hoje >= INICIORECESSODate && hoje <= FINALRECESSODate;
          corDoFundo = estaDeFerias ? "opacity-50" : "opacity-100";
        }

        const verificarTempoAtual = (HORARIOENTRADA, HORARIOSAIDA) => {
          const agora = new Date();
          const horaAtual = agora.getHours();
          const minutoAtual = agora.getMinutes();

          const horaEntrada = parseInt(HORARIOENTRADA?.split(":")[0]);
          const minutoEntrada = parseInt(HORARIOENTRADA?.split(":")[1]);

          const horaSaida = parseInt(HORARIOSAIDA?.split(":")[0]);
          const minutoSaida = parseInt(HORARIOSAIDA?.split(":")[1]);

          const tempoAtual = horaAtual * 60 + minutoAtual;
          const tempoEntrada = horaEntrada * 60 + minutoEntrada;
          const tempoSaida = horaSaida * 60 + minutoSaida;

          return tempoAtual >= tempoEntrada && tempoAtual <= tempoSaida;
        };

        return (
          <Link
            to={`/funcionarios/${pessoa._id}`}
            key={pessoa._id}
            className='w-full animate-sideBlur bg-gray-100 dark:bg-[#222222] shadow relative p-2 flex items-center justify-center h-72 rounded-lg overflow-hidden'
          >
            <span
              className={`z-20 text-xs font-semibold bg-yellow-400 absolute top-1 left-1 rounded-md py-1 px-2 ${estaDeFerias ? "flex" : "hidden"
                }`}
            >
              FÉRIAS
            </span>
            <div
              className={`w-full flex flex-col justify-between h-full pt-4 ${corDoFundo}`}
            >

              <div className="absolute left-1 top-1 text-[10px] dark:text-gray-300 font-semibold">
                {verificarTempoAtual(pessoa.HORARIOENTRADA, pessoa.HORARIOSAIDA)  && !estaDeFerias ? "ONLINE" : "OFF"}
              </div>


              <div>
                <div className="flex justify-center">
                  <div
                    className={`w-32 h-32 rounded-full overflow-hidden relative before:w-28 before:rounded-full
                   before:h-28 before:border-[1px]  before:absolute before:left-2 before:top-2 before:z-10 
                   ${verificarTempoAtual(
                      pessoa.HORARIOENTRADA,
                      pessoa.HORARIOSAIDA
                    ) && !estaDeFerias
                        ? "before:border-blue-400"
                        : "before:border-white"
                      }`}
                  >
                    <div className="flex items-center justify-center w-4 h-4 bg-white absolute z-10 rounded-full right-6 top-3">
                      <div
                        className={`w-3 h-3 rounded-full border-2 ${verificarTempoAtual(
                          pessoa.HORARIOENTRADA,
                          pessoa.HORARIOSAIDA
                        ) && !estaDeFerias
                          ? "bg-blue-500"
                          : "bg-gray-300"
                          }`}
                      ></div>
                    </div>
                    <LazyLoadImage
                      src={pessoa.IMG}
                      alt=""
                      className="w-full rounded-full h-full object-cover"
                      effect="blur"
                      height="100%"
                      width="100%"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex flex-col text-center pt-5">
                    <span className="font-semibold text-lg text-ligthColor dark:text-darkColor truncate">
                      {pessoa.NOME}
                    </span>
                    <span className="text-ligthColor dark:text-darkColor truncate">
                      {pessoa.EMAIL}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-gray-300 border-t-[1px] w-full text-center p-2">
                <span className="font-semibold text-base text-ligthColor dark:text-darkColor">
                  {pessoa.FUNCAO}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default CardPessoa;
