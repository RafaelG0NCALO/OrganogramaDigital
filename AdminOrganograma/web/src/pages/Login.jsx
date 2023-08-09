import { EnvelopeSimple, Lock } from "phosphor-react";
import React, { useState } from "react";
import Button from "../components/button/button";
import InputField from "../components/inputField";

const Login = () => {
  const [nome, setNome] = useState("");
  const [nomeValido, setNomeValido] = useState(true);
  const [senha, setSenha] = useState("");
  const [senhaValida, setSenhaValida] = useState(true);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const handleSenhaChange = (event) => {
    const { value } = event.target;
    setSenha(value.trim());
    setSenhaValida(value.trim() !== "");
  };

  const handleToggleRegistro = () => {
    setMostrarRegistro(!mostrarRegistro);
  };

  const handleNomeChange = (event) => {
    const { value } = event.target;
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      setNome(value);
      setNomeValido(true);
    } else {
      setNome(value);
      setNomeValido(false);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (nome.trim() === "") {
      setNomeValido(false);
      return;
    } else if (senha.trim() == "") {
      setSenhaValida(false);
      return;
    }
  };

  return (
    <div className="h-full flex items-center justify-evenly w-full max-w-5xl m-auto flex-wrap select-none">
      <div className="flex m-auto flex-1 min-w-[300px] w-full p-2 max-w-md flex-col justify-center items-center">
        
        <h1 className="text-5xl max-md:text-3xl texte-left py-2 font-bold truncate text-[#333] dark:text-white">
          Faça seu login
          <br />
          na plataforma
        </h1>
      </div>
        <>
          <div className="flex-1 relative min-w-[300px] p-10 drop-shadow-md dark:bg-[#202024] rounded-md bg-white shadow-md ">
            <form className="transition flex flex-col" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-7 mb-2">
                <InputField
                  id="nome"
                  label="Nome Completo"
                  value={nome}
                  onChange={handleNomeChange}
                  placeholder="Nome Completo"
                  valid={nomeValido}
                  infoError="Preencha o Nome"
                  icon={<EnvelopeSimple />}
                  type="text"
                />

                <div>
                  <InputField
                    id="senha"
                    label="Senha"
                    value={senha}
                    onChange={handleSenhaChange}
                    placeholder="Senha"
                    valid={senhaValida}
                    infoError="Preencha a Senha"
                    icon={<Lock />}
                    type="password"
                  />
                  <p className="text-base text-end mt-1 font-semibold text-blue-700 dark:text-blue-600 cursor-pointer">
                    Esqueci minha senha ?
                  </p>
                </div>
              </div>
              <Button text="Entrar" />
            </form>
  
          </div>
        </>
    </div>
  );
};

export default Login;
