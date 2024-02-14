import { Header } from "../components";
import Routers from "../Routers/Routers";

export const MainLayout = () => {
   return (
      <div className="wrapper">
         <Header />
         <div className="content">
            <Routers />
         </div>
      </div>
   );
};
