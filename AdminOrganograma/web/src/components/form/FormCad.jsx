import {
  At,
  Briefcase,
  Cake,
  Calendar,
  Check,
  Clock,
  Folder,
  Gear,
  IdentificationBadge,
  IdentificationCard,
  Lock,
  MapPin,
  User,
} from "phosphor-react";
import React, { useState } from "react";
import ProgressBar from "../../components/form/ProgrssBar";
import InputField from "./inputField";

import TipoBd from "../../assets/data/Tipo";
import DivisaoBd from "../../assets/data/divisao";
import FuncaoBd from "../../assets/data/funcao";
import LocalizacaoBd from "../../assets/data/localizacao";
import GestorBd from "../../assets/data/Func.jsx";
import Select from "../form/Select";

import Confetti from "react-confetti";
import Button from "../button/button";

const FormCad = () => {
  const [step, setStep] = useState(1);
  const [sucesso, setSucesso] = useState();
  const [erro, setErro] = useState("");

  const [nome, setNome] = useState("");
  const [aniversario, setAniversario] = useState("");
  const [matricula, setMatricula] = useState("");
  const [email, setEmail] = useState("");

  const [horarioEntrada, setHorarioEntrada] = useState("");
  const [horarioSaida, setHorarioSaida] = useState("");
  const [inicioRecesso, setInicioRecesso] = useState("");
  const [finalRecesso, setFinalRecesso] = useState("");

  const Tipo = TipoBd.map((tipo) => tipo.Tipo);
  const [tipoSelecionado, setTipoSelecionado] = useState("");

  const Funcao = FuncaoBd.map((funcao) => funcao.Funcao);
  const [funcaoSelecionado, setFuncaoSelecionado] = useState("");

  const Gestor = GestorBd.map((gestor) => gestor.NOME);
  const [gestorSelecionado, setGestorSelecionado] = useState("");

  const Divisao = DivisaoBd.map((divisao) => divisao.divisao);
  const [divisaoSelecionada, setDvisisaoSelecionada] = useState("");

  const Localizacao = LocalizacaoBd.map(
    (localizacao) => localizacao.localizacao
  );
  const [localizacaoSelecionada, setLocalizacaoSelecionada] = useState("");

  const [img, setImg] = useState("");
  const [previewImg, setPreviewImg] = useState("");

  const handleImgChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Por favor, selecione um arquivo de imagem");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImg(file.name);
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeNome = (event) => {
    const value = event.target.value;
    setNome(value);
  };
  const isNomeValid =
    nome.length >= 8 &&
    /^[a-zA-Z\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\uFB00-\uFB06\s]+$/.test(
      nome
    );

  const handleChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const pessoaExistente = GestorBd.find((pessoa) => pessoa.EMAIL.trim() === email.trim());

  const handleChangeMatricula = (event) => {
    const value = event.target.value;
    if (!isNaN(Number(value))) {
      setMatricula(value);
    }
  };
  const isMatriculaValid = matricula.length >= 6;
  const matriculaExistente = GestorBd.find((pessoa) => pessoa.MATRICULA === matricula);

  const handleChangeHorarioEntrada = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    value = value.substring(0, 4);
    if (value.length > 2) {
      value = value.replace(/(\d{2})(\d)/, "$1:$2");
    }
    const hour = value.slice(0, 2);
    const minute = value.slice(3, 5);
    if (hour !== "" && Number(hour) > 23) {
      value = "23:" + minute;
    }
    if (minute !== "" && Number(minute) > 59) {
      value = hour + ":59";
    }
    setHorarioEntrada(value);
  };
  const isHorarioEntradaValid = horarioEntrada.length >= 5;

  const handleChangeHorarioSaida = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    value = value.substring(0, 4);
    if (value.length > 2) {
      value = value.replace(/(\d{2})(\d)/, "$1:$2");
    }
    const hour = value.slice(0, 2);
    const minute = value.slice(3, 5);
    if (hour !== "" && Number(hour) > 23) {
      value = "23:" + minute;
    }
    if (minute !== "" && Number(minute) > 59) {
      value = hour + ":59";
    }
    setHorarioSaida(value);
  };
  const isHorarioSaidaValid = horarioSaida.length >= 5;

  const handleChangeInicioRecesso = (event) => {
    const input = event.target;
    let value = input.value;
    value = value.replace(/\D/g, "");

    if (value.length > 2) {
      value = value.replace(/(\d{2})(\d)/, "$1/$2");
    }
    if (value.length > 5) {
      value = value.slice(0, 5);
    }
    const dd = value.slice(0, 2);
    if (dd !== "" && (Number(dd) < 0 || Number(dd) > 31)) {
      value = "31/";
    }
    const mm = value.slice(3, 5);
    if (mm !== "" && (Number(mm) < 0 || Number(mm) > 12)) {
      value = value.slice(0, 3) + "12";
    }
    setInicioRecesso(value);
  };
  const isInicioRecessoValid = inicioRecesso.length >= 5;

  const handleChangeFinalRecesso = (event) => {
    const input = event.target;
    let value = input.value;
    value = value.replace(/\D/g, "");

    if (value.length > 2) {
      value = value.replace(/(\d{2})(\d)/, "$1/$2");
    }
    if (value.length > 5) {
      value = value.slice(0, 5);
    }
    const dd = value.slice(0, 2);
    if (dd !== "" && (Number(dd) < 1 || Number(dd) > 31)) {
      value = "31/";
    }
    const mm = value.slice(3, 5);
    if (mm !== "" && (Number(mm) < 1 || Number(mm) > 12)) {
      value = value.slice(0, 3) + "12";
    }
    setFinalRecesso(value);
  };
  const isFinalRecessoValid = finalRecesso.length >= 5;

  const handleChangeAniversario = (event) => {
    const input = event.target;
    let value = input.value;
    value = value.replace(/\D/g, "");
    if (value.length > 2) {
      value = value.replace(/(\d{2})(\d)/, "$1/$2");
    }
    if (value.length > 5) {
      value = value.slice(0, 5);
    }
    const dd = value.slice(0, 2);
    if (dd !== "" && (Number(dd) < 1 || Number(dd) > 31)) {
      value = "31/";
    }
    const mm = value.slice(3, 5);
    if (mm !== "" && (Number(mm) < 1 || Number(mm) > 12)) {
      value = value.slice(0, 3) + "12";
    }
    setAniversario(value);
  };
  const isAniversarioValid = aniversario.length >= 5;


  const handleNext = () => {
    if (step === 1) {
      if (!nome || !email || !matricula || !img) {
        setErro("Por favor, preencha todos os campos.");
        return;
      } else if (!isNomeValid || !isEmailValid || !isMatriculaValid ) {
        setErro("");
        return;
      } else if (pessoaExistente) {
        setErro("Este email já está registrado.");
        return;
      } else if (matriculaExistente) {
        setErro("Matrícula já registrada.");
        return;
      }
    
    } else if (step === 2) {
      if (
        !tipoSelecionado ||
        !funcaoSelecionado ||
        !gestorSelecionado ||
        !divisaoSelecionada
      ) {
        setErro("Por favor, preencha todos os campos.");
        return;
      }
    } 
    setErro("");
    setStep(step + 1);
  };

  const handlePrev = () => {
    setErro("");
    setStep(step - 1);
  };

  const [showConfetti, setShowConfetti] = useState(false);
  const handleFormSubmit = () => {
    if (
      !horarioEntrada ||
      !isHorarioEntradaValid ||
      !horarioSaida ||
      !isHorarioSaidaValid ||
      !isInicioRecessoValid ||
      !inicioRecesso ||
      !finalRecesso ||
      !isFinalRecessoValid ||
      !aniversario ||
      !localizacaoSelecionada ||
      !isAniversarioValid
    ) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    const data = {
      img,
      nome,
      email,
      matricula,
      divisaoSelecionada,
      gestorSelecionado,
      tipoSelecionado,
      funcaoSelecionado,
      aniversario,
      horarioEntrada,
      horarioSaida,
      inicioRecesso,
      finalRecesso,
    };
    console.log("Dados do formulário:", data);

    setErro("");
    setHorarioEntrada("");
    setSucesso(true);

    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  const confettiComponent = showConfetti ? (
    <Confetti className="absolute w-full h-full" />
  ) : null;

  return (
    <>
      {sucesso ? (
        <>
          {confettiComponent}
          <div className="h-72 my-2 rounded-md flex flex-col items-center justify-center w-full max-w-3xl bg-purple-900 text-white font-semibold">
            <Check size={28} />
            Cadastrado com sucesso!
          </div>
        </>
      ) : (

        <div className="h-full flex items-center justify-center bg-white dark:bg-[#222222] p-2 rounded-md">
          <div className="mt-4 w-full flex flex-col gap-1 ">
            <ProgressBar step={step} />
            <p className="w-full text-center text-red-600 mt-2">{erro}</p>
            {step === 1 && (
              <>
                <div className="border-2 dark:border-gray-600 border-gray-200 my-2 bg-white dark:bg-[#111] flex gap-2 justify-center items-center p-1 rounded-md">
                  {previewImg && (
                    <div className="w-12 h-12 rounded-md overflow-hidden">
                      <img
                        src={previewImg}
                        alt="Imagem selecionada"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <label
                    htmlFor="file-input"
                    className="flex items-center justify-center relative bg-violet-500 dark:bg-[#1A1A1C] w-full h-12 rounded-md cursor-pointer"
                  >
                    <span className="text-white">Selecionar Imagem</span>
                    <input
                      id="file-input"
                      type="file"
                      accept="image/*"
                      onChange={handleImgChange}
                      className="sr-only"
                    />
                  </label>
                </div>
                <InputField
                  Valid={isNomeValid}
                  borderValue={!!nome}
                  onChange={handleChangeNome}
                  value={nome}
                  validMsg={nome ? !isNomeValid : false}
                  icon={<User />}
                  label="Nome completo"
                  ErroName="Nome inválido"
                  placeholder="Ex: Rafael Gonçalo"
                />

                <InputField
                  Valid={isEmailValid}
                  borderValue={!!email}
                  onChange={handleChangeEmail}
                  value={email}
                  validMsg={email ? !isEmailValid : false}
                  icon={<At />}
                  label="E-mail"
                  ErroName="E-mail inválido"
                  placeholder="Ex: Rafael@gmail.com"
                />
                <InputField
                  Valid={isMatriculaValid}
                  borderValue={!!matricula}
                  onChange={handleChangeMatricula}
                  value={matricula}
                  validMsg={matricula ? !isMatriculaValid : false}
                  icon={<IdentificationBadge />}
                  label="Matrícula"
                  ErroName="Matrícula inválida"
                  placeholder="Ex: 123256"
                />

              </>
            )}

            {step === 2 && (
              <div className="py-2">
                <Select
                  value={tipoSelecionado}
                  error={step === 2 && !tipoSelecionado && !!erro}
                  options={Tipo}
                  onChange={(option) => setTipoSelecionado(option)}
                  selecioneText="Selecione a seu Tipo"
                  icon={<IdentificationCard />}
                />
                <Select
                  value={funcaoSelecionado}
                  error={step === 2 && !funcaoSelecionado && !!erro}
                  options={Funcao}
                  onChange={(option) => setFuncaoSelecionado(option)}
                  selecioneText="Selecione a sua Função"
                  icon={<Gear />}
                />
                <Select
                  value={gestorSelecionado}
                  error={step === 2 && !gestorSelecionado && !!erro}
                  options={Gestor}
                  onChange={(option) => setGestorSelecionado(option)}
                  selecioneText="Selecione a seu gestor"
                  icon={<Briefcase />}
                />
                <Select
                  value={divisaoSelecionada}
                  error={step === 2 && !divisaoSelecionada && !!erro}
                  options={Divisao}
                  onChange={(option) => setDvisisaoSelecionada(option)}
                  selecioneText="Selecione a sua Divisão"
                  icon={<Folder />}
                />
              </div>
            )}

            {step === 3 && (
              <>
                <InputField
                  Valid={isAniversarioValid}
                  borderValue={!!aniversario}
                  onChange={handleChangeAniversario}
                  value={aniversario}
                  validMsg={aniversario ? !isAniversarioValid : false}
                  icon={<Cake />}
                  label="Aniversário"
                  ErroName="Aniversário inválida"
                  placeholder="Ex: 12/03"
                />
                <Select
                  value={localizacaoSelecionada}
                  error={step === 3 && !localizacaoSelecionada && !!erro}
                  options={Localizacao}
                  onChange={(option) => setLocalizacaoSelecionada(option)}
                  selecioneText="Selecione seu estado"
                  icon={<MapPin />}
                />
                <div className="flex items-center gap-2">
                <InputField
                  Valid={isHorarioEntradaValid}
                  borderValue={!!horarioEntrada}
                  onChange={handleChangeHorarioEntrada}
                  value={horarioEntrada}
                  validMsg={horarioEntrada ? !isHorarioEntradaValid : false}
                  icon={<Clock />}
                  label="Entrada"
                  ErroName="Inválido"
                  placeholder="Ex: 09:00"
                />
                <h1 className="font-semibold text-white">Até</h1>
                <InputField
                  Valid={isHorarioSaidaValid}
                  borderValue={!!horarioSaida}
                  onChange={handleChangeHorarioSaida}
                  value={horarioSaida}
                  validMsg={horarioSaida ? !isHorarioSaidaValid : false}
                  icon={<Clock />}
                  label="Saída"
                  ErroName="Inválido"
                  placeholder="Ex: 18:00"
                />
                </div>
                <div className="flex items-center gap-2">
                <InputField
                  Valid={isInicioRecessoValid}
                  borderValue={!!inicioRecesso}
                  onChange={handleChangeInicioRecesso}
                  value={inicioRecesso}
                  validMsg={inicioRecesso ? !isInicioRecessoValid : false}
                  icon={<Calendar />}
                  label="Recesso"
                  ErroName="Inválida"
                  placeholder="Ex: 04/05"
                />
                <h1 className="font-semibold text-white">Até</h1>
                <InputField
                  Valid={isFinalRecessoValid}
                  borderValue={!!finalRecesso}
                  onChange={handleChangeFinalRecesso}
                  value={finalRecesso}
                  validMsg={finalRecesso ? !isFinalRecessoValid : false}
                  icon={<Calendar />}
                  label="Recesso"
                  ErroName="Inválida"
                  placeholder="Ex: 19/05"
                />
                </div>
              </>
            )}

            <div className="flex justify-between mt-2 gap-2">
              {step > 1 && <Button text="Voltar" onClick={handlePrev} />}
              {step < 3 ? (
                <Button text="Proximo" onClick={handleNext} />
              ) : (
                <Button text="Enviar" onClick={handleFormSubmit} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormCad;
