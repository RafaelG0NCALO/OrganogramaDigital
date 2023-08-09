import { useLocation } from "react-router-dom";
import Routers from "../../routers/Routers";
import Header from "../header/header";
import logobbts from "../../assets/image/logobbts.png";

const Layout = () => {
  const location = useLocation();

  // Verifica se a rota atual é /login
  const isLoginPage = location.pathname === "/login";

  return (
    <div
      className={`p-3 h-[100%] flex items-center justify-center min-h-screen relative bg-fixed bg-[url('../assets/image/fundoLigth.png')] dark:bg-[url('../assets/image/fundoDark.png')] bg-cover w-full`}
    >
      {!isLoginPage ? (
        <Header />
      ) : (
        <div className="fixed top-0 flex items-center gap-3 py-4">
          <img src={logobbts} className="w-12" alt="Logo BBTS" />
          <h1 className="text-3xl font-black bg-gradient-to-r from-[#3e40e4] to-yellow-500 text-transparent bg-clip-text">
            BBTS
          </h1>
        </div>
      )}
      {/* Renderiza o Header apenas se não for a rota /login */}
      <Routers />
    </div>
  );
};

export default Layout;
