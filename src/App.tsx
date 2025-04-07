import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

const App: React.FC = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default App;
