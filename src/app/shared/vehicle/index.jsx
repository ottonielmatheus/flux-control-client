import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.scss';

import moment from 'moment';
import { Button, Loader, Icon } from 'rsuite';

import * as CompaniesActions from '../../../store/actions/companies.actions';
import vehicleAPI from '../../requests/endpoints/vehicles.endpoint';
import socket from '../../requests/socket/socket.client';
import Timer from './timer';


const Vehicle = ({ companyName, vehicle, companies, selectVehicle }) => {

  const [loading, setLoading] = useState(false);

  const arrival = async (v) => {
    setLoading(true);
    const moment = await vehicleAPI.arrival(v.id);
    if (moment) {
      v.last_record = { moment, onGarage: true };
      socket.emit('vehicle-arrival', v);
    }
    setLoading(false);
  }

  const departure = async (v) => {
    setLoading(true);
    const moment = await vehicleAPI.departure(v.id);
    if (moment) {
      v.last_record = { moment, onGarage: false };
      socket.emit('vehicle-departure', v);
    }
    setLoading(false);
  }

  return (
    <>
      <div
        className={
          `vehicle-card h-box
          ${companies.selectedVehicle?.id === vehicle.id ? 'selected' : ''}
          ${loading ? 'pulse' : ''}`
        }
        onClick={e => selectVehicle(companies.selectedVehicle?.id === vehicle.id ? null : vehicle)}
      >
        {/* Timer */}
        {
          vehicle.last_record.onGarage ?
            <Timer
              start={vehicle.last_record.moment}
              max={moment.duration(15, 'minutes')}
              onEnd={() => { departure(vehicle) }}
            />
          : null
        }
        {/* Vehicle data */}
        <div className="vehicle-info v-box">
          <b className="license-plate">{vehicle.license_plate}</b>
          <span className="company-and-number">{companyName} <b className="number">#{vehicle.number}</b></span>
        </div>
        {/* Registry moment */}
        {
          loading ?
          <div className="loader">
            <Loader />
          </div> :
          <>
            <div className="last-record h-box">
              {
                vehicle.last_record ?
                  <Icon className={`icon ${vehicle.last_record.onGarage ? 'arrival' : 'departure'}`}
                    icon={`${vehicle.last_record.onGarage ? 'caret-right' : 'caret-left'}`}
                  />
                  : <small className="no-record">sem registro</small>
              }
              {
                vehicle.last_record ?
                  <span className="moment">
                    <small className="date">
                      {moment(vehicle.last_record.moment).format('DD/MM')}
                    </small>
                    <br/>
                    {moment(vehicle.last_record.moment).format('HH:mm')}
                  </span>
                : null
              }
            </div>
            <Button className="action" appearance="primary"
              onClick={async (e) => {
                vehicle.last_record?.onGarage ? await departure(vehicle) : await arrival(vehicle);
              }}
            >{vehicle.last_record?.onGarage ? 'Saída' : 'Entrada'}
            </Button>
          </>
        }
      </div>
    </>
  );
}

function mapStateToProps (state) {
  return {
    companies: state.companies
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(CompaniesActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Vehicle);