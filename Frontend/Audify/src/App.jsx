import {BrowserRouter , Routes , Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import BrowsePage from "./pages/BrowsePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import "./App.css";

function App(){
  return(
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/browse" element={<BrowsePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;