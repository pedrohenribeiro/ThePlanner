import { useState } from 'react';
import axios from "axios";

function Usuario(){

    const [dadosUsuario, setDadosUsuario] = useState({
        nome: '',
        senha: '',

    });

    const atualizarUsuario = (e) => {
        const { name, value } = e.target;
        setDadosUsuario({
            ...dadosUsuario,
            [name]: value
        });
    };
    return(
        <div>
            <input
                type="text"
                name="nome"
                value={dadosUsuario.nome}
                onChange={atualizarUsuario}
                placeholder="Título do Usuario"
            />
            <input
                type="text"
                name="senha"
                value={dadosUsuario.senha}
                onChange={atualizarUsuario}
                placeholder="Descrição do Usuario"
            />

        </div>
    )
}

export default Usuario