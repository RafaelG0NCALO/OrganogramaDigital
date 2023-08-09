import { User, Pen, At, Briefcase, Clock } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import pessoas from '../assets/data/Func.jsx';
import InputField from '../components/form/inputField';
import Select from '../components/form/Select';
import Button from '../components/button/button'

const Details = () => {
  const { id } = useParams();
  const [pessoa, setPessoa] = useState(null);
  const [erro, setErro] = useState("");
  const [imagemPreview, setImagemPreview] = useState(null);
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    const fetchPessoa = () => {
      const pessoaEncontrada = pessoas.find((p) => p._id === id);
      setPessoa(pessoaEncontrada);
      setImagemPreview(pessoaEncontrada.IMG);
    };
    fetchPessoa();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;



    if (name === "HORARIOENTRADA" || name === "HORARIOSAIDA") {
      let newValue = value.replace(/\D/g, "");
      newValue = newValue.substring(0, 4);
      if (newValue.length > 2) {
        newValue = newValue.replace(/(\d{2})(\d)/, "$1:$2");
      }
      const hour = newValue.slice(0, 2);
      const minute = newValue.slice(3, 5);
      if (hour !== "" && Number(hour) > 23) {
        newValue = "23:" + minute;
      }
      if (minute !== "" && Number(minute) > 59) {
        newValue = hour + ":59";
      }
      setPessoa((prevPessoa) => ({
        ...prevPessoa,
        [name]: newValue,
      }));
    }

    else if (name === "ANIVERSARIO" || name === "INICIORECESSO" || name === "FINALRECESSO") {
      let dateValue = value.replace(/\D/g, "");
      if (dateValue.length > 2) { dateValue = dateValue.replace(/(\d{2})(\d)/, "$1/$2") }
      if (dateValue.length > 5) { dateValue = dateValue.slice(0, 5) }
      const [dd, mm] = dateValue.split("/");
      if (dd && (Number(dd) > 31)) { dateValue = "31" }
      if (mm && (Number(mm) > 12)) { dateValue = dateValue.slice(0, 3) + "12" }

      setPessoa((prevPessoa) => ({
        ...prevPessoa,
        [name]: dateValue,
      }));
    }

    else {
      setPessoa((prevPessoa) => ({ ...prevPessoa, [name]: value, }));
      if (name === "IMG") {
        setImagemPreview(value);
      }
    }
  };


  const handleSelectChange = (name, value) => {
    setPessoa((prevPessoa) => ({
      ...prevPessoa,
      [name]: value,
    }));
  };

  const handleImagemSelecionada = (event) => {
    const imagemSelecionada = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImagemPreview(reader.result);
    };
    if (imagemSelecionada) {
      reader.readAsDataURL(imagemSelecionada);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (
      !pessoa.NOME ||
      !isNomeValid ||
      !pessoa.EMAIL ||
      !isEmailValid ||
      !isMatriculaValid ||
      !pessoa.MATRICULA ||
      !isAniversarioValid ||
      !pessoa.ANIVERSARIO ||
      !pessoa.HORARIOENTRADA ||
      !pessoa.HORARIOSAIDA ||
      !isHorarioEntradaValid ||
      !isHorarioSaidaValid
    ) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    setErro("");
    setSucesso(true);
    const pessoaAtualizada = { ...pessoa, IMG: imagemPreview };
    console.log(pessoaAtualizada);
  };

  if (!pessoa) {
    return <div>Carregando...</div>;
  }

  const isNomeValid =
    pessoa.NOME.length >= 8 &&
    /^[a-zA-Z\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\uFB00-\uFB06\s]+$/.test(
      pessoa.NOME
    );

  const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(pessoa.EMAIL);
  const isMatriculaValid = pessoa.MATRICULA.length >= 6;
  const isAniversarioValid = pessoa.ANIVERSARIO.length >= 5;
  const isHorarioEntradaValid = pessoa.HORARIOENTRADA.length >= 5;
  const isHorarioSaidaValid = pessoa.HORARIOSAIDA.length >= 5;
  const isInicioRecessoValid = pessoa.INICIORECESSO.length >= 5;
  const isFinalRecessoValid = pessoa.FINALRECESSO.length >= 5;

  const Gestor = pessoas.map((gestor) => gestor.NOME);
  const Tipo = pessoas.map((tipo) => tipo.TIPO);
  const Funcao = pessoas.map((funcao) => funcao.FUNCAO);
  const Divisao = pessoas.map((divisao) => divisao.DIVISAO);
  const Localizacao = pessoas.map((localizacao) => localizacao.LOCALIZACAO);

  return (
    <div className='w-full pt-8 h-full max-h-[100vh] flex justify-center items-center relative'>
      <div className="flex w-full h-full max-w-lg mx-auto items-center justify-center bg-white dark:bg-[#222222] p-2 rounded-md">
        <div className="mt-4 w-full flex flex-col gap-1">
          <p className="w-full text-center text-red-600 mt-2">{erro}</p>

          <form onSubmit={handleFormSubmit} >
            
              <div className="flex justify-between items-center flex-wrap-reverse">
                <div className='py-2 h-18'>
                  <p className='font-bold dark:text-white text-[#333] text-3xl'>Editar</p>
                  <p className='font-semibold dark:text-white text-[#333] text-lg'>{pessoa.NOME}</p>
                </div>
                <label htmlFor="imagemInput" className="relative cursor-pointer">
                  <div className="w-20 h-20 rounded-full bg-blue-600 overflow-hidden">
                    <img
                      src={imagemPreview}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <Pen className="absolute right-1 bottom-0 bg-[#222222] rounded-full p-1 cursor-pointer rotate-6 text-3xl text-white" />
                  <input
                    id="imagemInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImagemSelecionada}
                  />
                </label>
              </div>
              <div className='h-96 relative overflow-y-auto px-2'>
              <InputField
                Valid={isNomeValid}
                borderValue={!!pessoa.NOME}
                onChange={handleInputChange}
                value={pessoa.NOME}
                validMsg={pessoa.NOME ? !isNomeValid : false}
                icon={<User />}
                label="Nome completo"
                ErroName="Nome "
                placeholder="Ex: Rafael Gonçalo"
                name="NOME"
              />
              <InputField
                Valid={isEmailValid}
                borderValue={!!pessoa.EMAIL}
                onChange={handleInputChange}
                value={pessoa.EMAIL.trim()}
                validMsg={pessoa.EMAIL ? !isEmailValid : false}
                icon={<At />}
                label="E-mail"
                ErroName="E-mail "
                placeholder="Ex: Rafael@gmail.com"
                name="EMAIL"
              />
              <InputField
                Valid={isMatriculaValid}
                borderValue={!!pessoa.MATRICULA}
                onChange={handleInputChange}
                value={pessoa.MATRICULA}
                validMsg={pessoa.MATRICULA ? !isMatriculaValid : false}
                icon={<At />}
                label="Matrícula"
                ErroName=""
                placeholder="Ex: 341253"
                name="MATRICULA"
              />

              <Select
                value={pessoa.DIVISAO}
                error={!pessoa.DIVISAO && !!erro}
                options={Divisao}
                onChange={(value) => handleSelectChange("DIVISAO", value)}
                selecioneText="Selecione a sua Divisão"
                icon={<Briefcase />}
                name="DIVISAO"
              />
              <Select
                value={pessoa.TIPO}
                error={!pessoa.TIPO && !!erro}
                options={Tipo}
                onChange={(value) => handleSelectChange("TIPO", value)}
                selecioneText="Selecione a seu Tipo"
                icon={<Briefcase />}
                name="TIPO"
              />
              <Select
                value={pessoa.FUNCAO}
                error={!pessoa.FUNCAO && !!erro}
                options={Funcao}
                onChange={(value) => handleSelectChange("FUNCAO", value)}
                selecioneText="Selecione a seu Funcao"
                icon={<Briefcase />}
                name="FUNCAO"
              />
              <Select
                value={pessoa.GESTOR}
                error={!pessoa.GESTOR && !!erro}
                options={Gestor}
                onChange={(value) => handleSelectChange("GESTOR", value)}
                selecioneText="Selecione a seu Funcao"
                icon={<Briefcase />}
                name="GESTOR"
              />
              <div className='mt-6'>
                <InputField
                  Valid={isAniversarioValid}
                  borderValue={!!pessoa.ANIVERSARIO}
                  onChange={handleInputChange}
                  value={pessoa.ANIVERSARIO}
                  validMsg={pessoa.ANIVERSARIO ? !isAniversarioValid : false}
                  icon={<At />}
                  label="Aniversário"
                  ErroName=""
                  placeholder="Ex: 341253"
                  name="ANIVERSARIO"
                />
              </div>

              <Select
                value={pessoa.LOCALIZACAO}
                error={!pessoa.LOCALIZACAO && !!erro}
                options={Localizacao}
                onChange={(value) => handleSelectChange("LOCALIZACAO", value)}
                selecioneText="Selecione a Localizacao"
                icon={<Briefcase />}
                name="LOCALIZACAO"
              />

              <div className='flex gap-1 items-center'>
                <InputField
                  Valid={isHorarioEntradaValid}
                  borderValue={!!pessoa.HORARIOENTRADA}
                  onChange={handleInputChange}
                  value={pessoa.HORARIOENTRADA}
                  validMsg={pessoa.HORARIOENTRADA ? !isHorarioEntradaValid : false}
                  icon={<Clock />}
                  label="Entrada"
                  ErroName=""
                  placeholder="Ex: 09:00"
                  name="HORARIOENTRADA"
                />

                <h1 className="font-semibold text-white">Até</h1>

                <InputField
                  Valid={isHorarioSaidaValid}
                  borderValue={!!pessoa.HORARIOSAIDA}
                  onChange={handleInputChange}
                  value={pessoa.HORARIOSAIDA}
                  validMsg={pessoa.HORARIOSAIDA ? !isHorarioSaidaValid : false}
                  icon={<Clock />}
                  label="Saída"
                  ErroName=""
                  placeholder="Ex: 09:00"
                  name="HORARIOSAIDA"
                />

              </div>

              <div className='flex gap-1 items-center'>
                <InputField
                  Valid={isInicioRecessoValid}
                  borderValue={!!pessoa.INICIORECESSO}
                  onChange={handleInputChange}
                  value={pessoa.INICIORECESSO}
                  validMsg={pessoa.INICIORECESSO ? !isInicioRecessoValid : false}
                  icon={<Clock />}
                  label="Recesso"
                  ErroName=""
                  placeholder="Ex: 09/01"
                  name="INICIORECESSO"
                />

                <h1 className="font-semibold text-white">Até</h1>

                <InputField
                  Valid={isFinalRecessoValid}
                  borderValue={!!pessoa.FINALRECESSO}
                  onChange={handleInputChange}
                  value={pessoa.FINALRECESSO}
                  validMsg={pessoa.FINALRECESSO ? !isFinalRecessoValid : false}
                  icon={<Clock />}
                  label="Recesso"
                  ErroName=""
                  placeholder="Ex: 09/01"
                  name="FINALRECESSO"
                />

              </div>


            </div>
            <button className='w-full h-12 mt-2 rounded-md bg-blue-600 text-white font-semibold text-lg' type='submit'>Salvar Alterações</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Details;
