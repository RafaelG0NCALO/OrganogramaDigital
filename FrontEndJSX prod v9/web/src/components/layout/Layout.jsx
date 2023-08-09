import Routers from "../../routers/Routers";
import Header from "../header/header";

const Layout = () => {

  return (
    <div
      className={`p-3 h-[100%] flex items-center justify-center min-h-screen relative bg-[url('../assets/images/fundoLigth.png')] dark:bg-[url('../assets/images/fundoDark.png')] bg-cover bg-fixed w-full`}
    >
      <Header />
      <Routers />
    </div>
  );
};

export default Layout;
