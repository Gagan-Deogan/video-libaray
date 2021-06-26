import { useState } from "react";
import { useSnakbarContext } from "./context/SnakbarProvider";
import { Navbar } from "./components/Navbar";
import { Snakbar } from "./components/Snakbar";
import { Navigation } from "./components/Navigation";
function App() {
  const [isNavbarOpen, setNavbarToggle] = useState();
  const { snakbarStatus } = useSnakbarContext();
  return (
    <div
      className={` dis-grid body-layout  ${
        isNavbarOpen ? "aside-expand " : "aside-shrink"
      } `}>
      <Navbar isNavbarOpen={isNavbarOpen} setNavbarToggle={setNavbarToggle} />
      <main className="column padding-16 w12">
        <Navigation />
      </main>
      {snakbarStatus["isShow"] === true && <Snakbar></Snakbar>}
    </div>
  );
}

export default App;
