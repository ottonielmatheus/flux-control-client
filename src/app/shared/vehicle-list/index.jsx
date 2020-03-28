import React, { useState, useEffect } from 'react';
import './index.scss';

import socket from '../../requests/socket/socket.client';
import Vehicle from '../../shared/vehicle';


function VehicleList ({ company }) {

  const [showAll, setShowAll] = useState(false);
  const [fleet, setFleet] = useState(company.fleet.slice(0, 3));

  const changeView = (all) => {
    all ? setFleet(company.fleet) : setFleet(company.fleet.slice(0, 3));
    setShowAll(all);
  }

  useEffect(() => {
    socket.open();
    socket.on('vehicle-action', v => {
      company.fleet = company.fleet.map(vehicle => (vehicle.id === v.id) ? v : vehicle);
      changeView(showAll);
    });
    return () => { socket.close() }
  }, []);

  return (
    <>
      <div className="vehicle-card-list h-box">

        {fleet.map(vehicle => (
          <Vehicle key={vehicle.id}
            companyName={company.name}
            vehicle={vehicle}
          />
        ))}

      </div>
      {company.fleet.length > 3 ?
        <a className="show-more"
          href={`#${company.name.toLowerCase()}-exibir-${showAll ? 'mais' : 'menos'}`}
          onClick={(e) => { changeView(!showAll) }}
        >{`exibir ${showAll ? 'menos' : 'mais'}`}</a>
      : null}
    </>
  );
}

export default VehicleList;