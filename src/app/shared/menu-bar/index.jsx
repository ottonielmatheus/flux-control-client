import React from 'react';
import './index.scss';

import { Sidenav, Nav, Icon, Tooltip, Whisper } from 'rsuite';

import auth from '../../protected-route/Auth';


function MenuBar ({ current, switchTo }) {

  return (
    <div id="menu">
      <Sidenav activeKey={current}>
        <Sidenav.Header>
          <div>
            <div id="user-actions" className="h-box">
              <a href="#configs">
                <Whisper placement="auto" trigger="hover"
                  speaker={
                    <Tooltip>
                      Configurações
                    </Tooltip>
                  }>
                  <Icon icon="gear-circle" />
                </Whisper>
              </a>
              <a href="#sair">
              <Whisper placement="auto" trigger="hover"
                speaker={
                  <Tooltip>
                    Sair
                  </Tooltip>
                }>
                <Icon icon="sign-out" onClick={() => auth.logout()} />
              </Whisper>
              </a>
            </div>
            <div id="user-info" className="h-box">
              <div className="img"
                style={{
                  backgroundImage: `url('https:api.adorable.io/avatars/100/abott@adorable.png')`
                }}
              >
              </div>
              <div className="name v-box">
                <b id="user-role">Gerente</b>
                <span className="user-name">Ottoniel Matheus</span>
              </div>
            </div>
          </div>
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav>
            <Nav.Item eventKey={'register'} icon={<Icon icon="car" />}
              onClick={() => switchTo('register')}
            >
              Registrar
            </Nav.Item>
            <Nav.Item eventKey={'timeline'} icon={<Icon icon="realtime" />}
              onClick={async () => switchTo('timeline')}
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