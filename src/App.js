import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import BarraLateral from './components/layout/BarraLateral/BarraLateral';
import Navbar from './components/layout/NavBar/Navbar';
import './index.css';
import Home from './pages/Home/Home';
function App() {
  return (
    <div className="pagina">
    <Router className="pagina">
      <Navbar/>
      <BarraLateral/>
        <Routes>
          <Route exact path="/" element={<Home />} > </Route>

        </Routes>
    </Router>
      
    </div>
  );
}

export default App;
