import { useState } from "react";
import { useSnakbar } from "./context/SnakbarProvider";
import { Navbar } from "./common-components/Navbar";
import { Snakbar } from "./common-components/Snakbar";
import { Navigation } from "./common-components/Navigation";
import { Interceptor } from "./common-components/Interceptor";

function App() {
  const [isNavbarOpen, setNavbarToggle] = useState();
  const { snakbarStatus } = useSnakbar();
  return (
    <div
      className={` dis-grid body-layout  ${
        isNavbarOpen ? "aside-expand " : "aside-shrink"
      } `}>
      <Interceptor />
      <Navbar isNavbarOpen={isNavbarOpen} setNavbarToggle={setNavbarToggle} />
      <main className="column padding-16 w12">
        <Navigation />
      </main>
      {snakbarStatus["isShow"] === true && <Snakbar></Snakbar>}
    </div>
  );
}

export default App;
