import React, { useState, useEffect } from 'react';
import './index.scss';

import MenuBar from '../shared/menu-bar';
import Settings from '../landing-page/settings';
import Register from '../landing-page/register';
import Timeline from '../landing-page/timeline';
import NotFound from '../shared/not-found';


function LandingPage ({ history, match, ...props }) {

  const [currentView, setCurrentView] = useState('register');

  useEffect(() => {
    if (match.params.view) {
      setCurrentView(match.params.view);
    } else {
      history.push('/flux-control-client/register');
    }
  }, [history, match.params.view]);

  return (
    <>
      <div id="geral" className="h-box">
        <MenuBar history={history} current={currentView} />
        <main id="screen">
          {
            {
              settings: <Settings />,
              register: <Register />,
              timeline: <Timeline />
            }[currentView] || <NotFound search={currentView} />
          }
        </main>
      </div>
    </>
  );
}

export default LandingPage;
