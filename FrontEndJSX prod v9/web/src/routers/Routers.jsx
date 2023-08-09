import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Funcionarios = lazy(() => import("../pages/Funcionarios"));
const FuncionariosDetails = lazy(() => import("../pages/funcionariosDetails"));
const TestePage = lazy(() => import("../pages/teste"));

const Routers = () => {
  return (
    <Suspense
      fallback={
        <div className="fixed h-[100vh] w-[100vw] bg-slate-200 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-sky-500 animate-spin"></div>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Funcionarios />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="/TestePage" element={<TestePage/>} />
        <Route path="/funcionarios/:id" element={<FuncionariosDetails />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
