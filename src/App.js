import './css/App.css';
import { Routes , Route } from "react-router-dom"
import { Navbar } from "./components/navbar/Navbar"
import { Home } from "./pages/home/Home"
import { VideoWatch } from "./pages/video-watch/VideoWatch"
function App() {
  return (
    <div className="App">
      <Navbar/>
      {/* <VideoWatch/> */}
      <Routes>
        <Route path="/" element={ <Home/> } ></Route>
        <Route path="/watch/:id"  element={ <VideoWatch/> } ></Route>
      </Routes>
    </div>
  );
}

export default App;
