import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.scss';

import { Input, InputGroup, Toggle, Button, Whisper, Popover, Icon, Loader } from 'rsuite';

import companiesAPI from "../../requests/endpoints/companies.endpoint";
import * as CompaniesActions from '../../../store/actions/companies.actions';
import CompanyList from '../../shared/company-list';


function Register ({ companies, setCompanies }) {

  const [loading, setLoading] = useState(false);
  const [founded, setFounded] = useState(0);

  async function load () {
    setLoading(true);
    const source = await companiesAPI.load();
    const fleetsPromises = source.map(company => companiesAPI.getFleet(company.id));

    Promise.all(fleetsPromises).then((fleets) => {
      for (let i in source) {
        source[i].fleet = fleets[i];
      }

      let founded = 0;
      for (let company of source) {
        founded += company.fleet.length;
      }
      setFounded(founded);

      setCompanies(source);
      setLoading(false);
    });
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <section id="register" className="h-box">
      <div className="container">
        <div className="vehicle-search h-box">
          <div className="pagination">
            <span className="results">
              <b>Encontrados:</b>
              <span>{founded}</span>
            </span>
          </div>
          <div className="search-box h-box">
            <Whisper trigger="click" placement="auto"
              speaker={
                <Popover className="toggle-on-garage">
                    <Toggle onChange={value => console.log(value)} />
                    <span>Apenas na garagem</span>
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
        {loading ?
          <center>
            <Loader />
          </center> :
          <CompanyList companies={companies.source}/>}
      </div>
    </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);