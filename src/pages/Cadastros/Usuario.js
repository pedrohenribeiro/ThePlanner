import { useState } from 'react';
import axios from "axios";

function Usuario(){

    const [dadosUsuario, setDadosUsuario] = useState({
        nomeUsuario: '',
    });
    
    const atualizarUsuario = (e) => {
        const { name, value } = e.target;
        setDadosUsuario({
            ...dadosUsuario,
            [name]: value
        });
    };

    async function cadastrarUsuario() {
        console.log("Cadastrar Usuario");
        try {
            console.log("Adicionando Usuario", dadosUsuario);
            await axios.post('http://localhost:8080/usuarioAdicionar', dadosUsuario);
        } catch (error) {
            console.error("Erro ao adicionar usuario:", error);
        }
    };
    return(
        <div>
            <input
                type="text"
                name="nomeUsuario"
                value={dadosUsuario.nomeUsuario}
                onChange={atualizarUsuario}
                placeholder="nomeUsuario"
            />
            <button onClick={(e) => { cadastrarUsuario() }}>Enviar</button>
        </div>
    )
}

export default Usuario