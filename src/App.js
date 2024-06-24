import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import BarraLateral from './components/layout/BarraLateral/BarraLateral';
import Navbar from './components/layout/NavBar/Navbar';
import Home from './pages/Home/Home';
import CadastrarTarefa from './pages/Cadastros/Tarefas';
import Projetos from './pages/Cadastros/Projetos';
import Usuario from './pages/Cadastros/Usuario';
function App() {
  return (
    <div className="pagina">
      <Router>
        <Navbar />
        <BarraLateral />
        <div className="conteudo">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/tarefas" element={<CadastrarTarefa />} />
            <Route exact path="/projetos" element={<Projetos />} />
            <Route exact path="/usuarios" element={<Usuario />} />
       
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
