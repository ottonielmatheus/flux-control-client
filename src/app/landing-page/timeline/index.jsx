import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.scss';

import { Input, DateRangePicker, InputGroup, Button, Whisper, Popover, Icon, Loader } from 'rsuite';
import Chart from 'react-google-charts';

import flowRecordsAPI from '../../requests/endpoints/flow-records.endpoint';
import * as CompaniesActions from '../../../store/actions/companies.actions';


function Timeline({ companies, selectCompany }) {

  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState(null);

  function load () {
    setLoading(true);
    if (companies.selectedCompany) {
      const historyPromises = companies.selectedCompany.fleet.map((vehicle) => {
        return flowRecordsAPI.getHistoric(vehicle.id);
      });

      let chartData = [
        [
          { type: 'string', id:'Vehicle' },
          { type: 'date', id: 'Start' },
          { type: 'date', id: 'End' }
        ]
      ];

      Promise.all(historyPromises).then((histories) => {
        histories.forEach((history, index) => {
          history = history.reverse().slice(0, 6);
          for (let record of history) {
            chartData.push([
              companies.selectedCompany.fleet[index].license_plate,
              new Date(record.arrival.moment),
              (record.departure?.moment ? new Date(record.departure.moment) : new Date())
            ]);
          }
        });

        setChartData(chartData);
        setLoading(false);
      });
    }
  }

  useEffect(() => {
    setChartData(null);
    if (!companies.selectedCompany) {
      selectCompany(companies.source[0]);
    }
    load();
  }, [companies.selectedCompany]);

  return (
    <section id="timeline" className="h-box">
      <div className="companies">
        {companies.source.map(company => (
          company.fleet.length ?
          <div key={company.id}
            className={`${companies.selectedCompany?.id === company.id ? 'selected' : ''} company v-box`}
            onClick={() => selectCompany(company)}
          >
            <div className="company-info h-box">
              <div className="company-thumbnail"
                style={{
                  borderColor: company.color,
                  backgroundImage: `url('${company.thumbnail || '/images/no-image.jpg'}')`
                }}
              ></div>
              <h4 className="company-name">{company.name}</h4>
              <span className="company-fleet h-box">
                <Icon icon="car" />
                <b>{company.fleet.length}</b>
              </span>
            </div>
        </div> : null
        ))}
      </div>
      <div className="container">
        <div className="vehicle-search h-box">
          <DateRangePicker />
          <div className="search-box h-box">
            <Whisper trigger="click" placement="auto"
              speaker={
                <Popover className="toggle-on-garage">
                    FILTROS
                </Popover>
              }>
                <Button className="filter" appearance="default">
                  <Icon icon="filter" /> &nbsp;
                  Filtrar
              </Button>
            </Whisper>
            <InputGroup inside>
              <Input placeholder="Procurar" />
              <InputGroup.Button><Icon icon="search" /></InputGroup.Button>
            </InputGroup>
          </div>
        </div>
        <hr/>
        <div className="container-body">
          {chartData ?
            <Chart
            width="100%"
            height={300}
            chartType="Timeline"
            loader={<center><Loader /></center>}
            data={chartData}
            options={{
              showRowNumber: false
            }}
          /> : <center><Loader /></center>}
        </div>
      </div>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    companies: state.companies
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CompaniesActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);