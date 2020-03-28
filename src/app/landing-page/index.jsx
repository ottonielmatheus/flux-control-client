import React, { useState } from 'react';
import './index.scss';

import MenuBar from '../shared/menu-bar';
import Register from '../landing-page/register';
import Timeline from '../landing-page/timeline';


function LandingPage () {
  const [ switchScream, setSwitchScream ] = useState("register");

  return (
    <>
      <div id="geral" className="h-box">
        <MenuBar current={switchScream} switchTo={(screen) => { setSwitchScream(screen) }} />
        <main id="screen">
          {switchScream === 'register' && <Register />}
          {switchScream === 'timeline' && <Timeline />}
        </main>
      </div>
    </>
  );
}

export default LandingPage;
