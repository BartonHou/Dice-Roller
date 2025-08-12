import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import  MainNavBar from './components/NavBar'
import About from './components/Car'
import Home from './components/Home'
import RollDice from './components/RollADice';
import DrawACard from './components/DrawACard';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<MainNavBar />}>
          <Route index element={<Home />} />
          <Route path="roll_a_dice" element={<RollDice/>}/>
          <Route path="/roll_multiple_dice" element={<DrawACard/>}/>
          <Route path="draw_a_card" element={<DrawACard/>}/>
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
