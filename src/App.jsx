import { useState } from "react";
import { useSnakbarContext } from "./Context/SnakbarContext";
import { Navbar } from "./Components/Navbar";
import { Snakbar } from "./Components/Snakbar";
import { Navigation } from "./Components/Navigation";
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
