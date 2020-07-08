import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';


function NotFound ({ search }) {

    return (
        <section id="not-found">
            <div className="content v-box">
                <h3>Ops! Nada por aqui</h3>
                <p>Não encontramos nada que corresponda à <b>"/{search}"</b> para você.</p>
                <br/>
                <p>Possíveis causas:</p>
                <ul>
                    <li>Rota inexistente</li>
                    <li>O serviço encontra-se indisponível</li>
                    <li>Você não tem permissão para acessar o recurso</li>
                </ul>

                <small>
                    <Link to="/">Voltar para o início</Link>
                </small>
            </div>
        </section>
    );
}

export default NotFound;