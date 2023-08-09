import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Dashboard = lazy(() => import("../pages/dashboard"));
const Login = lazy(() => import("../pages/Login"));
const Details = lazy(() => import("../pages/details"));

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
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
