import React, { useState, useEffect } from 'react';
import './index.scss';

import { Input, Button, Message } from 'rsuite';

import auth from '../routes/protected-route/Auth';


function Login ({ history }) {

  const [login, setLogin] = useState("login");
  const [password, setPassword] = useState("password");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (auth.isAuthenticated()) {
      history.push('/flux-control-client/');
    }
  });

  return (
    <main id="login">
      <div className="login">
        <div className="extra">
          <h2>Transparência</h2>
          <p>
            Aqui você pode ver a situação de todas as empresas de ônibus que utilizam do
            terminal rodoviário de <b>São José do Rio Preto</b>.
          </p>
          <a href="#mais-sobre">Vamos lá</a>
        </div>
        <section className="login-box">
        <div className="login-title">
          <h1>Login</h1>
        </div>
        <div className="login-field">
          <label htmlFor="email">Email</label>
          <Input id="email" type="text" placeholder="email@example.com" onChange={
            value => setLogin(value)
          } />
        </div>
        <div className="login-field">
          <label htmlFor="password">Senha</label>
          <Input id="password" type="password" onChange={
            value => setPassword(value)
          } />
        </div>
        <div className="messages v-box">
          { messages.map(message =>
            (<Message type="error" description={message} />))
          }
        </div>
        <Button className="login-submit"
          appearance="primary"
          onClick={(e) => {
            const button = e.target;
            button.disabled = true;
            setMessages([]);

            auth.login({ login, password },
              (authenticated) => {
                button.disabled = false;
                if (authenticated) {
                  history.push("/flux-control-client");
                } else {
                  let errors = [];
                  errors.push("Usuário e/ou senha incorreto(s)");
                  setMessages(errors);
                }
              }
            );
          }}
        >Entrar</Button>
      </section>
    </div>
    </main>
  );
}

export default Login;