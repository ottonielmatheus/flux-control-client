import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

import { Sidenav, Nav, Icon, Tooltip, Whisper } from 'rsuite';

import auth from '../../routes/protected-route/Auth';


function MenuBar ({ history, current }) {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    const [firstName, middleName] = session.user.name.split(' ');
    session.user.name = `${firstName} ${middleName}`;
    setCurrentUser(session.user);
  }, []);

  return (
    <div id="menu">
      <Sidenav activeKey={current}>
        <Sidenav.Header>
          <div>
            <div id="user-actions" className="h-box">
              <Link to="/flux-control-client/settings">
                <Whisper placement="auto" trigger="hover"
                  speaker={
                    <Tooltip>
                      Configurações
                    </Tooltip>
                  }>
                  <Icon icon="gear-circle" />
                </Whisper>
              </Link>
              <Link to="/flux-control-client/login" onClick={() => auth.logout()}>
              <Whisper placement="auto" trigger="hover"
                speaker={
                  <Tooltip>
                    Sair
                  </Tooltip>
                }>
                <Icon icon="sign-out" />
              </Whisper>
              </Link>
            </div>
            <div id="user-info" className="h-box">
              <div className="img"
                style={{
                  backgroundImage: `url('https:api.adorable.io/avatars/100/abott@adorable.png')`
                }}
              >
              </div>
              <div className="name v-box">
                <b id="user-role">
                  {
                    {
                      admin: 'Administrador',
                      manager: 'Gerente',
                      operator: 'Operador'

                    }[currentUser?.role]
                  }
                </b>
                <span className="user-name">{currentUser?.name}</span>
              </div>
            </div>
          </div>
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav>
<<<<<<< HEAD
            <Nav.Item eventKey={'register'} icon={<Icon icon="car" />}
=======
            <Nav.Item eventKey={'register'} icon={<Icon icon="exchange" />}
>>>>>>> url routes & user infos
              onClick={() => history.push('/flux-control-client/register')}
            >
              Registrar
            </Nav.Item>
            <Nav.Item eventKey={'timeline'} icon={<Icon icon="realtime" />}
              onClick={() => history.push('/flux-control-client/timeline')}
            >
              Linha do tempo
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
}

export default MenuBar;